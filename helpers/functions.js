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
} from "./constants.js";
import { INTRO, wcText } from "./utils.js";

const cleanUpFiles = folder => {
	// Delete the temporary folder
	fse.rmSync(path.join(folder), {
		recursive: true,
		force: true,
	});

	console.log(chalk.yellow(POST_CLEANUP_TEXT));
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
	try {
		INTRO();

		// If the project path is not provided, ask the user for it
		let projectPath = "";
		let context = {};

		projectPath = cmdLineRes.folderName || "";

		// Checks if project name is provided
		if (typeof projectPath === "string") {
			projectPath = projectPath.trim();
		}

		while (!projectPath) {
			console.log("\n");
			projectPath = await prompts({
				type: "text",
				name: "projectPath",
				message: `${PROJECT_NAME_QUESTION} \n`,
				initial: `my${APP_NAME.replace("create", "")}`,
			}).then(data => data.projectPath);
		}

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
			createDapp(context.resolvedProjectPath, context.projectName);
		} else {
			createDapp(context.projectName, context.projectName);
		}
	} catch (err) {
		process.env.ENVIRONMENT === "development" && console.error(err);
	}
};

const cloneAndCopy = (
	resolvedProjectPath,
	projectPath,
	progressBar,
	repo = APP_REPOSITORY_URL
) => {
	fse.mkdtemp(path.join(os.tmpdir(), "wc-"), (err, folder) => {
		if (err) throw err;
		execSync(`git clone --depth 1 ${repo} ${folder}`, {
			stdio: "pipe",
		});
		fse.copySync(
			path.join(folder, "dapps/react-dapp-v2"),
			resolvedProjectPath
		);
		fse.writeFileSync(
			path.join(resolvedProjectPath, ".env"),
			"SKIP_PREFLIGHT_CHECK=true"
		);
		progressBar.stop();
		console.clear();
		console.log(chalk.bold(chalk.blue(`\n${READY_TEXT}\n\n`)) + STEPS_TEXT);
		console.log(STEPS(projectPath));
		console.log(chalk.gray(DELETING_TEXT));
		cleanUpFiles(folder);
	});
};

export const createDapp = (resolvedProjectPath, projectPath) => {
	// Create the project folder and copy the template files
	console.log(chalk.bold(chalk.blue(`\n${CREATING_TEXT}\n`)));
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
			cloneAndCopy(resolvedProjectPath, projectPath, progressBar);
		}
	}, 10);
};
