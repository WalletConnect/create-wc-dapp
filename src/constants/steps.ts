import { blue, bold, gray, green, magenta } from "picocolors";
import { wcText } from "@/functions/wcText";
import APP_CONSTANTS from "./app";

interface StepsProps {
	(projectPath: string, packageManagerSteps: string[]): string;
}

const STEPS_BUILDER: StepsProps = (
	projectPath: string,
	packageManagerSteps: string[]
) => `
	${bold(green("cd ") + magenta(projectPath))}
	${bold(green(packageManagerSteps[0]))}
	${gray(`Your .env file contains the following environment variables:
\t- NEXT_PUBLIC_PROJECT_ID (placeholder) - You can generate your own ProjectId at https://cloud.walletconnect.com
`)}
	${bold(green(packageManagerSteps[1]))}
`;

const YARN_STEPS = ["yarn", "yarn dev"];

const NPM_STEPS = ["npm install", "npm run dev"];

const PNPM_STEPS = ["pnpm install", "pnpm run dev"];

export const STEPS = (projectPath: string, packageManager = "yarn") => {
	switch (packageManager) {
		case "yarn":
			return STEPS_BUILDER(projectPath, YARN_STEPS);
		case "npm":
			return STEPS_BUILDER(projectPath, NPM_STEPS);
		case "npx":
			return STEPS_BUILDER(projectPath, NPM_STEPS);
		case "pnpm":
			return STEPS_BUILDER(projectPath, PNPM_STEPS);
		default:
			return STEPS_BUILDER(projectPath, YARN_STEPS);
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

export const STEPS_TEXT = "👉 To get started, follow these steps:\n";

export const POST_CLEANUP_TEXT = "✅ Project cleaned up successfully!";

export const DELETING_TEXT =
	"🗑️  Deleting temporary files. This may take a few seconds...";

export const DIR_VALIDATION_ERROR = `A directory with this name already exists, please use a different name`;
