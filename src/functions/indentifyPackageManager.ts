import path from "node:path";
import process from "process";
import { PackageManagerProps } from "@/constants/steps";

export const identifyPackageManager = (): PackageManagerProps => {
	const execPath = process.env.npm_execpath as string;
	const pathSep = path.sep as string;
	const params = execPath.split(pathSep).pop() as string;
	const packageManager = params.replace(/(-cli)?\.(c)?js/, "");
	return packageManager as PackageManagerProps;
};
