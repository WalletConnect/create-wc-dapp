#!/usr/bin/env node

import { Command, Option } from "commander";
import fse from "fs-extra";
import { red } from "picocolors";
import prompts from "prompts";
import path from "node:path";
import APP_CONSTANTS from "./constants/app";
import {
	FOLDER as FOLDER_CONSTANTS,
	INSTALL as INSTALL_CONSTANTS,
	TEMPLATE as TEMPLATE_CONSTANTS,
} from "./constants/cli";
import { DIR_VALIDATION_ERROR } from "./constants/steps";
import { getAllValues, setValue } from "./contexts";
import getEnvPrefix from "./functions/getEnvPrefix";
import handleProjectCreation from "./functions/handleProjectCreation";
import introduction from "./functions/introduction";

export const argParse = () => {
	// Initialize the command system
	const program = new Command();

	// Add the program name, description, and version
	program
		.name(APP_CONSTANTS.name)
		.description(APP_CONSTANTS.description)
		.version(APP_CONSTANTS.version);

	// Add option to install dependencies
	program.addOption(
		new Option(
			`${INSTALL_CONSTANTS.alias}, ${INSTALL_CONSTANTS.cmd}`,
			INSTALL_CONSTANTS.description
		)
	);

	// Add the template option
	program.addOption(
		new Option(
			`${TEMPLATE_CONSTANTS.alias}, ${TEMPLATE_CONSTANTS.cmd} <${TEMPLATE_CONSTANTS.name}>`,
			TEMPLATE_CONSTANTS.description
		).choices(["nextjs", "react", "vite"])
	);

	// Parse the arguments with implicit use of process.argv and node
	program.parse();

	if (program.args.length !== 0) {
		const projectPath = program.args[0].trim().replace(/[\W_]+/g, "-");
		if (fse.existsSync(path.resolve(projectPath))) {
			const error =
				DIR_VALIDATION_ERROR.slice(2).charAt(0).toUpperCase() +
				DIR_VALIDATION_ERROR.slice(2).slice(1);
			throw new Error(
				`${red("✖")} ${error.replace(
					"with this name",
					`'${projectPath}'`
				)}`
			);
		}
	}

	// Store the parsed options and arguments
	setValue("template", program.opts().template);
	setValue("envPrefix", getEnvPrefix(program.opts().template));
	setValue("installDependencies", program.opts().install);
	setValue("folder", program.args[0] || null);
};

export const cliPrompt = async () => {
	const contexts = getAllValues();

	// Override the default prompt
	prompts.override(contexts);

	// Prompt the user for the folder and template if not provided
	const response = await prompts([
		{
			type: "select",
			name: "template",
			message: `${TEMPLATE_CONSTANTS.description} \n`,
			choices: TEMPLATE_CONSTANTS.options,
			initial: 0,
		},
		{
			type: "text",
			name: "folder",
			message: `${FOLDER_CONSTANTS.description} \n`,
			initial: `my${APP_CONSTANTS.name.replace("create", "")}`,
			validate: value => value?.trim().length > 0,
		},
	]);

	setValue("template", response.template);
	setValue("folder", response.folder);
	setValue("envPrefix", getEnvPrefix(response.template));
	await handleProjectCreation();
};

// Run the CLI if this is the main module
if (require.main === module) {
	try {
		argParse();
		introduction();
		cliPrompt();
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error(error.message);
			process.exit(1);
		}
	}
}
