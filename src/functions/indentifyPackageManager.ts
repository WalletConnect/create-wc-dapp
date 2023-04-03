import path from "node:path";
import process from "process";

export const identifyPackageManager = () => {
	const execPath = process.env.npm_execpath as string;
	const pathSep = path.sep as string;
	const params = execPath.split(pathSep).pop() as string;
	const packageManager = params.replace(/(-cli)?\.(c)?js/, "");
	return packageManager;
};
