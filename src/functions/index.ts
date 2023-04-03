import fse from "fs-extra";
import prompts from "prompts";
import path from "node:path";
import { DIR_VALIDATION_ERROR } from "@/constants/steps";
import { getValue, setValue } from "@/contexts";
import createDapp from "./createDapp";
import mapTemplateToRepository from "./mapTemplateToRepository";

const handleProjectCreation = async () => {
	const folder = getValue("folder") as string;
	const projectPath = folder.trim().replace(/[\W_]+/g, "-");

	setValue("projectPath", path.resolve(projectPath));
	let dirExists = fse.existsSync(folder);

	let i = 1;

	while (dirExists) {
		const tempPath = await prompts({
			type: "text",
			name: "folder",
			message: `${DIR_VALIDATION_ERROR} \n`,
			initial: folder ? `${folder}-${i}` : `${projectPath}-${i}`,
		}).then(data => data.folder.trim().replace(/[\W_]+/g, "-"));

		setValue("projectPath", path.resolve(tempPath));

		dirExists = fse.existsSync(getValue("projectPath") as string);

		i += 1;
	}
	setValue("baseName", path.basename(getValue("projectPath") as string));

	await mapTemplateToRepository();

	await createDapp();
};

export default handleProjectCreation;
