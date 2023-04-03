import fse from "fs-extra";
import { yellow } from "picocolors";
import path from "node:path";
import { log } from "./log";
import { POST_CLEANUP_TEXT } from "../constants/steps";

const cleanUp = (folder: string) => {
	// Delete the temporary folder
	fse.rmSync(path.join(folder), {
		recursive: true,
		force: true,
	});

	log(yellow(POST_CLEANUP_TEXT));
};

export default cleanUp;
