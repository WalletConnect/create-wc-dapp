import _progress from "cli-progress";
import path from "path";
import os from "os";
import chalk from "chalk";
import fse from "fs-extra";
import { execSync } from "child_process";
import * as dotenv from "dotenv";
import yargs from "yargs";
import prompts from "prompts";
import {
	APP_NAME,
	APP_REPOSITORY_URL,
	DIR_VALIDATION_ERROR,
	PROJECT_NAME_QUESTION,
	READY_TEXT,
	STEPS,
	FINAL_PROMPT_TEXT,
	CREATING_TEXT,
	HELP_TEXT_GROUP,
	STEPS_TEXT,
	DELETING_TEXT,
	POST_CLEANUP_TEXT,
	PROGRESS_FORMAT,
	WELCOME_TEXT,
	TEMPLATES_GROUP,
	TEMPLATE_QUESTION,
} from "./constants.js";
import { identifyPackageManager, log, wcText } from "./utils.js";

const INTRO = () => {
	// Print the WalletConnect logo and welcome message
	log(
		chalk.blue(`

              /////////////////                     
          /////////////////////////                 
        /////////           /////////               
         .///                   ///                 
  */                  /                  /*         
//////.            ///////             //////       
 ////////        ///////////        ////////        
   ////////.  /////////////////   ////////          
      //////////////     //////////////             
        /////////,         ./////////               
           ////               ////                  
`)
	);

	log("\n");
	log(WELCOME_TEXT);
};

const cleanUpFiles = folder => {
	// Delete the temporary folder
	fse.rmSync(path.join(folder), {
		recursive: true,
		force: true,
	});

	log(chalk.yellow(POST_CLEANUP_TEXT));
};

export const main = async () => {
	dotenv.config();

	// Get the project path from the command line if provided, else default to null
	const cmdLineRes = yargs(process.argv.slice(2)).command(
		"$0 [folder-name]",
		HELP_TEXT_GROUP.title,
		yargs => {
			yargs.positional("folder-name", {
				describe: HELP_TEXT_GROUP.description,
				type: "string",
				default: null,
			});
		}
	).argv;

	// Get the template from the command line if provided with -t or --template, else default to null
	const selectedTemplate = yargs(process.argv.slice(2)).option("template", {
		alias: "t",
		describe: TEMPLATES_GROUP.description,
		choices: TEMPLATES_GROUP.options.map(option => option.title),
	}).argv;

	// Override the prompts with the command line arguments
	prompts.override(
		cmdLineRes.folderName
			? { ...cmdLineRes, ...selectedTemplate }
			: selectedTemplate
	);

	try {
		INTRO();

		// If the project path & is not provided, ask the user for it
		let projectPath = "";
		let selectedTemplate = "";
		let context = {};

		// Checks if project name is provided
		if (typeof projectPath === "string") {
			projectPath = projectPath.trim();
		}

		const response = await prompts([
			{
				type: cmdLineRes.folderName === null ? "text" : null,
				name: "folderName",
				message: `${PROJECT_NAME_QUESTION} \n`,
				initial: `my${APP_NAME.replace("create", "")}`,
				validate: value => value.trim().length > 0,
			},
			{
				type: "select",
				name: "template",
				message: `${TEMPLATE_QUESTION} \n`,
				choices: TEMPLATES_GROUP.options,
				initial: 0,
			},
		]);

		projectPath = response.folderName || cmdLineRes.folderName;
		selectedTemplate = response.template;

		context.selectedTemplate = selectedTemplate;

		//Reformat project's name
		projectPath = projectPath.trim().replace(/[\W_]+/g, "-");
		context.resolvedProjectPath = path.resolve(projectPath);
		let dirExists = fse.existsSync(context.resolvedProjectPath);

		let i = 1;

		// Check if project exists
		while (dirExists) {
			projectPath = await prompts({
				type: "text",
				name: "projectPath",
				message: `${DIR_VALIDATION_ERROR} \n`,
				initial: cmdLineRes.folderName
					? `${cmdLineRes.folderName}-${i}`
					: `${projectPath}-${i}`,
			}).then(data => data.projectPath.trim().replace(/[\W_]+/g, "-"));

			context.resolvedProjectPath = path.resolve(projectPath);

			dirExists = fse.existsSync(context.resolvedProjectPath);

			i += 1;
		}
		context.projectName = path.basename(context.resolvedProjectPath);

		if (cmdLineRes.folderName) {
			createDapp(
				context.resolvedProjectPath,
				context.projectName,
				context.selectedTemplate
			);
		} else {
			createDapp(
				context.projectName,
				context.projectName,
				context.selectedTemplate
			);
		}
	} catch (err) {
		process.env.ENVIRONMENT === "development" && console.error(err);
	}
};

const cloneAndCopy = (
	resolvedProjectPath,
	projectPath,
	progressBar,
	selectedTemplate,
	repo = APP_REPOSITORY_URL
) => {
	fse.mkdtemp(path.join(os.tmpdir(), "wc-"), (err, folder) => {
		if (err) throw err;
		execSync(`git clone --depth 1 ${repo} ${folder}`, {
			stdio: "pipe",
		});
		fse.copySync(
			path.join(folder, `core/${selectedTemplate}`),
			resolvedProjectPath
		);
		fse.writeFileSync(
			path.join(resolvedProjectPath, ".env"),
			"SKIP_PREFLIGHT_CHECK=true"
		);
		progressBar.stop();
		console.clear();
		log(chalk.bold(chalk.blue(`\n${READY_TEXT}\n\n`)) + STEPS_TEXT);
		log(STEPS(projectPath, identifyPackageManager()));
		log(chalk.gray(DELETING_TEXT));
		cleanUpFiles(folder);
	});
};

export const createDapp = (
	resolvedProjectPath,
	projectPath,
	selectedTemplate
) => {
	// Create the project folder and copy the template files
	log(chalk.bold(chalk.blue(`\n${CREATING_TEXT}\n`)));
	const progressBar = new _progress.SingleBar(
		{
			format: PROGRESS_FORMAT,
		},
		_progress.Presets.shades_classic
	);
	progressBar.start(100, 0);

	let value = 0;

	const timer = setInterval(function () {
		value++;
		progressBar.update(value);
		if (value >= progressBar.getTotal()) {
			clearInterval(timer);
			cloneAndCopy(
				resolvedProjectPath,
				projectPath,
				progressBar,
				selectedTemplate
			);
		}
	}, 10);
};
