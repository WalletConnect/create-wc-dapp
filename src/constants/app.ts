import pkg from "../../package.json";

type AppConstantProps = {
	name: string;
	description: string;
	version: string;
	baseURL: string;
};

const APP_CONSTANTS: AppConstantProps = {
	name: pkg.name,
	description: pkg.description,
	version: pkg.version,
	baseURL: "https://github.com/walletconnect/create-wc-dapp/",
};

export default APP_CONSTANTS;
