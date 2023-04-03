import { SingleBar } from "cli-progress";
import fse from "fs-extra";
import { gray } from "picocolors";
import { execSync } from "node:child_process";
import os from "node:os";
import path from "node:path";
import {
	DELETING_TEXT,
	READY_TEXT,
	STEPS,
	STEPS_TEXT,
} from "@/constants/steps";
import { getProgressBar, getValue } from "@/contexts";
import cleanUp from "./cleanUp";
import { identifyPackageManager } from "./indentifyPackageManager";
import { log } from "./log";
import { wcText } from "./wcText";

const cloneAndCopy = () => {
	const progressBar = getProgressBar() as SingleBar;
	const baseFolderName = getValue("folder") as string;
	const repository = getValue("repository") as string;
	const template = getValue("template") as string;
	const projectPath = getValue("projectPath") as string;

	fse.mkdtemp(path.join(os.tmpdir(), "wc-"), (err, folder) => {
		if (err) throw err;
		execSync(`git clone --depth 1 ${repository} ${folder}`, {
			stdio: "pipe",
		});
		fse.copySync(path.join(folder, `core/${template}`), projectPath);
		fse.writeFileSync(
			path.join(projectPath, ".env"),
			'SKIP_PREFLIGHT_CHECK=true\nNEXT_PUBLIC_PROJECT_ID=""'
		);
		progressBar.stop();
		console.clear();
		log(wcText(`\n${READY_TEXT}\n\n`) + STEPS_TEXT);
		log(STEPS(baseFolderName, identifyPackageManager()));
		log(gray(DELETING_TEXT));
		cleanUp(folder);
	});
};

export default cloneAndCopy;
