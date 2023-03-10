export const APP_NAME = "create-wc-dapp";
export const APP_REPOSITORY_URL = `https://github.com/walletconnect/${APP_NAME}`;
export const PROJECT_NAME_QUESTION = `What is your project name?`;
export const DIR_VALIDATION_ERROR = `A directory with this name already exists, please use a different name`;
export const READY_TEXT = "🎉 Your WalletConnect Dapp is ready 🎉";
export const STEPS = () => (
	"To start your dapp, run the following commands:\n\n",
	chalk.bold("\tcd " + projectPath),
	chalk.bold("\n\tyarn"),
	chalk.bold("\n\tyarn start\n")
);
