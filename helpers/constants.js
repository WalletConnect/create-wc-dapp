import chalk from "chalk";
import {wcText} from "./utils.js";

export const APP_NAME = "create-wc-dapp";
export const APP_REPOSITORY_URL = `https://github.com/WalletConnect/web-examples/`;
export const PROJECT_NAME_QUESTION = `What is your project name?`;
export const DIR_VALIDATION_ERROR = `A directory with this name already exists, please use a different name`;
export const READY_TEXT = "🎉 Your WalletConnect Dapp is ready";
export const CREATING_TEXT = "🚀 Creating your WalletConnect Dapp";
export const STEPS = (projectPath) => `
	${chalk.bold(chalk.green("cd ") + chalk.magenta(projectPath))}
	${chalk.bold.green("yarn")}
	${chalk.bold(`${chalk.green("cp")} ${chalk.magenta(".env.local.example")} ${chalk.cyan(".env.local")}\n`)}
	${chalk.gray(`Your .env.local now contains the following environment variables:
\t- NEXT_PUBLIC_PROJECT_ID (placeholder) - You can generate your own ProjectId at https://cloud.walletconnect.com
\t- NEXT_PUBLIC_RELAY_URL (already set)
`)}
	${chalk.bold.green("yarn dev")}
`;
export const FINAL_PROMPT_TEXT = (projectPath) => `Are you sure you want to create your ${wcText(`WalletConnect`)} dApp in ${chalk.blue(projectPath)} folder?`;
