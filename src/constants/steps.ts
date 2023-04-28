import { blue, bold, green, magenta } from "picocolors";
import APP_CONSTANTS from "./app";
import { getValue } from "../contexts";
import { wcText } from "../functions/wcText";

export type PackageManagerProps = "yarn" | "npm" | "pnpm";

interface StepsProps {
	(projectPath: string, packageManagerSteps: string[]): string;
}

const STEPS_BUILDER: StepsProps = (
	projectPath: string,
	packageManagerSteps: string[]
) => {
	const installDependencies = getValue("installDependencies") as boolean;
	return `
	${bold(green("cd ") + magenta(projectPath))}${
		installDependencies ? `` : `\n\t${bold(green(packageManagerSteps[0]))}`
	}
	${bold(green(packageManagerSteps[1]))}
	`;
};

export const STEPS_FOR_PACKAGE_MANAGER = {
	yarn: ["yarn", "yarn dev"],
	npm: ["npm install", "npm run dev"],
	pnpm: ["pnpm install", "pnpm run dev"],
};

export const MAP_PACKAGE_MANAGER_LOCK = {
	yarn: "yarn.lock",
	npm: "package-lock.json",
	pnpm: "pnpm-lock.yaml",
};

export const STEPS = (projectPath: string, packageManager = "yarn") => {
	switch (packageManager) {
		case "yarn":
			return STEPS_BUILDER(projectPath, STEPS_FOR_PACKAGE_MANAGER.yarn);
		case "npm":
			return STEPS_BUILDER(projectPath, STEPS_FOR_PACKAGE_MANAGER.npm);
		case "npx":
			return STEPS_BUILDER(projectPath, STEPS_FOR_PACKAGE_MANAGER.npm);
		case "pnpm":
			return STEPS_BUILDER(projectPath, STEPS_FOR_PACKAGE_MANAGER.pnpm);
		default:
			return STEPS_BUILDER(projectPath, STEPS_FOR_PACKAGE_MANAGER.yarn);
	}
};

export const WELCOME_TEXT = `📲 Welcome to ${wcText(
	`${APP_CONSTANTS.name}`
)} wizard`;

export const CREATING_TEXT = "🚀 Creating your WalletConnect Project";

export const PROGRESS_FORMAT = `🛠️  Setting up ${blue(
	"{bar}"
)} {percentage}% • ETA: {eta_formatted}`;

export const READY_TEXT = "🎉 Your WalletConnect Project is ready";

export const STEPS_TEXT = "👉 To get started, follow these steps:";

export const POST_CLEANUP_TEXT = "✅ Project cleaned up successfully!";

export const DELETING_TEXT =
	"🗑️  Deleting temporary files. This may take a few seconds...";

export const DIR_VALIDATION_ERROR = `A directory with this name already exists, please use a different name`;
