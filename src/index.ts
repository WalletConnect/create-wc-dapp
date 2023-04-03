import { Command, Option } from "commander";
import prompts from "prompts";
import APP_CONSTANTS from "@/constants/app";
import {
	FOLDER as FOLDER_CONSTANTS,
	TEMPLATE as TEMPLATE_CONSTANTS,
} from "@/constants/cli";
import { getAllValues, setValue } from "@/contexts";
import introduction from "@/functions/introduction";
import handleProjectCreation from "./functions/handleProjectCreation";

export const argParse = () => {
	// Initialize the command system
	const program = new Command();

	// Add the program name, description, and version
	program
		.name(APP_CONSTANTS.name)
		.description(APP_CONSTANTS.description)
		.version(APP_CONSTANTS.version);

	// Add the template option
	program.addOption(
		new Option(
			`${TEMPLATE_CONSTANTS.alias}, ${TEMPLATE_CONSTANTS.cmd} <${TEMPLATE_CONSTANTS.name}>`,
			TEMPLATE_CONSTANTS.description
		).choices(["nextjs", "react", "vite"])
	);

	// Parse the arguments with implicit use of process.argv and node
	program.parse();

	// Store the parsed options and arguments
	setValue("template", program.opts().template);
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
	await handleProjectCreation();
};

// Run the CLI if this is the main module
if (require.main === module) {
	introduction();
	argParse();
	cliPrompt();
}
