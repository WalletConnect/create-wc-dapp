import chalk from "chalk";
import path from "path";

export const wcText = chalk.blue.bold;

export const identifyPackageManager = () => {
	const packageManager = process.env.npm_execpath
		.split(path.sep)
		.pop()
		.replace(/(-cli)?\.(c)?js/, "");
	return packageManager;
};

export const log = console.log;
