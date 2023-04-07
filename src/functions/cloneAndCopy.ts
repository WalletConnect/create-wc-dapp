import { SingleBar } from "cli-progress";
import fse from "fs-extra";
import { gray } from "picocolors";
import { execSync, spawn } from "node:child_process";
import os from "node:os";
import path from "node:path";
import process from "process";
import cleanUp from "./cleanUp";
import { log } from "./log";
import { wcText } from "./wcText";
import {
	DELETING_TEXT,
	MAP_PACKAGE_MANAGER_LOCK,
	PackageManagerProps,
	READY_TEXT,
	STEPS,
	STEPS_FOR_PACKAGE_MANAGER,
	STEPS_TEXT,
} from "../constants/steps";
import { getProgressBar, getValue } from "../contexts";

const postInstall = (folder: string) => {
	const packageManager = getValue("packageManager") as PackageManagerProps;
	const baseFolderName = getValue("folder") as string;
	console.clear();
	log(wcText(`\n${READY_TEXT}\n\n`) + STEPS_TEXT);
	log(STEPS(baseFolderName, packageManager));
	log(gray(DELETING_TEXT));
	cleanUp(folder);
};

const cloneAndCopy = () => {
	const progressBar = getProgressBar() as SingleBar;

	const repository = getValue("repository") as string;
	const template = getValue("template") as string;
	const projectPath = getValue("projectPath") as string;
	const installDependencies = getValue("installDependencies") as boolean;

	fse.mkdtemp(path.join(os.tmpdir(), "wc-"), async (err, folder) => {
		if (err) throw err;

		const envPrefix = getValue("envPrefix") as string;

		execSync(`git clone --depth 1 ${repository} ${folder}`, {
			stdio: "pipe",
		});

		fse.copySync(path.join(folder, `core/${template}`), projectPath);
		fse.writeFileSync(
			path.join(projectPath, ".env"),
			`SKIP_PREFLIGHT_CHECK=true\n#Generate your WalletConnect Project ID from https://cloud.walletconnect.com\n${envPrefix}_PROJECT_ID=""`
		);
		progressBar.stop();

		const packageManager: PackageManagerProps = getValue(
			"packageManager"
		) as PackageManagerProps;

		// Remove other lock files except the one for the package manager selected if they exist
		const lockFiles = Object.values(MAP_PACKAGE_MANAGER_LOCK).map(
			lockFile => path.join(projectPath, lockFile)
		);

		const lockFileToKeep = path.join(
			projectPath,
			MAP_PACKAGE_MANAGER_LOCK[packageManager]
		);

		lockFiles.forEach(lockFile => {
			if (lockFile !== lockFileToKeep && fse.existsSync(lockFile)) {
				fse.removeSync(lockFile);
			}
		});

		if (installDependencies) {
			console.clear();
			const child = spawn(
				`cd '${projectPath}' && ${STEPS_FOR_PACKAGE_MANAGER[packageManager][0]}`,
				{
					stdio: "inherit",
					shell: true,
				}
			);

			child.on("exit", () => {
				postInstall(folder);
				process.exit();
			});
		} else {
			postInstall(folder);
		}
	});
};

export default cloneAndCopy;
