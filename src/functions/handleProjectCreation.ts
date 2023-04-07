import fse from "fs-extra";
import prompts from "prompts";
import path from "node:path";
import createDapp from "./createDapp";
import mapTemplateToRepository from "./mapTemplateToRepository";
import { DIR_VALIDATION_ERROR } from "../constants/steps";
import { getValue, setValue } from "../contexts";

const handleProjectCreation = async () => {
	const folder = getValue("folder") as string;
	const projectPath = folder.trim().replace(/[\W_]+/g, "-");

	setValue("projectPath", path.resolve(projectPath));
	let dirExists = fse.existsSync(folder);

	let i = 1;

	while (dirExists) {
		const response = await prompts({
			type: "text",
			name: "folder",
			message: `${DIR_VALIDATION_ERROR} \n`,
			initial: folder ? `${folder}-${i}` : `${projectPath}-${i}`,
			validate: value => value?.trim().length > 0,
		});

		setValue("folder", response.folder);

		const tempPath = response.folder.trim().replace(/[\W_]+/g, "-");

		setValue("projectPath", path.resolve(tempPath));

		dirExists = fse.existsSync(getValue("projectPath") as string);

		i += 1;
	}
	setValue("baseName", path.basename(getValue("projectPath") as string));

	const response = await prompts({
		type: "confirm",
		name: "installDependencies",
		message: `Would you like to install the dependencies?`,
		initial: true,
	});

	setValue("installDependencies", response.installDependencies);

	await mapTemplateToRepository();

	await createDapp();
};

export default handleProjectCreation;
