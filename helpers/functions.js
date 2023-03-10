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
	CREATING_TEXT
} from "./constants.js";
import { INTRO, wcText } from "./utils.js";


const cleanUpFiles = folder => {
	// Delete the temporary folder
	fse.rmSync(path.join(folder), {
		recursive: true,
		force: true,
	});

	console.log(chalk.yellow("Project cleaned up ✅ "));
};

export const main = async () => {
	dotenv.config();

	// Get the project path from the command line if provided, else default to null
	const cmdLineRes = yargs(process.argv.slice(2)).command(
		"$0 [folder-name]",
		`create a new WalletConnect dApp project`,
		yargs => {
			yargs.positional("folder-name", {
				describe: `Folder to create your WalletConnect dApp in`,
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
			const finalPrompt = await prompts({
				type: "confirm",
				name: "value",
				message: `${FINAL_PROMPT_TEXT(projectPath)} \n`,
				initial: true,
			}).then(data => data.value);

			if (finalPrompt) {
				createDapp(context.projectName, context.projectName);
			} else {
				process.exit(0);
			}
		}
	} catch (err) {
		process.env.ENVIRONMENT === "development" && console.error(err);
	}
};

export const createDapp = (resolvedProjectPath, projectPath) => {
	// Create the project folder and copy the template files
	console.log(
		chalk.bold(
			chalk.blue(
				`\n${CREATING_TEXT}\n`
			)
		)
	);
	const progressBar = new _progress.Bar({}, _progress.Presets.shades_classic);
	progressBar.start(100, 0);
	let value = 0;

	const timer = setInterval(function () {
		value++;
		progressBar.update(value);
		if (value >= progressBar.getTotal()) {
			clearInterval(timer);
			fse.mkdtemp(path.join(os.tmpdir(), "wc-"), (err, folder) => {
				if (err) throw err;
				execSync(
					`git clone --depth 1 ${APP_REPOSITORY_URL} ${folder}`,
					{ stdio: "pipe" }
				);
				fse.copySync(path.join(folder, "dapps/react-dapp-v2"), resolvedProjectPath);
				fse.writeFileSync(
					path.join(resolvedProjectPath, ".env"),
					"SKIP_PREFLIGHT_CHECK=true"
				);
				progressBar.stop();
				console.log(
					chalk.bold(chalk.blue(`\n${READY_TEXT}\n\n`)),
					"To start your dapp, run the following commands:\n",
				);
				console.log(STEPS(projectPath));
				console.log(chalk.gray("Deleting temporary files 🧹"));
				cleanUpFiles(folder);
			});
		}
	}, 10);
};
