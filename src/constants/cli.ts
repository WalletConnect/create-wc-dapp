type OptionProps = {
	title: string;
	value: string | boolean;
	description: string;
};

interface CommandProps {
	name: string;
	cmd?: string;
	alias?: string;
	description: string;
	options?: OptionProps[];
	url?: string;
}

export const INSTALL: CommandProps = {
	name: "install",
	cmd: "--install",
	alias: "-i",
	description: "Install dependencies after creating the project",
};

export const PROJECTID: CommandProps = {
	name: "projectId",
	cmd: "--project-id",
	alias: "-id",
	description: `Enter your project ID from https://cloud.walletconnect.com`,
	url: "https://cloud.walletconnect.com",
};

export const DEFAULT: CommandProps = {
	name: "use-default",
	cmd: "--use-default",
	alias: "-y",
	description: "Use default options for all prompts",
	options: [
		{
			title: "template",
			value: "nextjs",
			description: "Use Next.js as template",
		},
		{
			title: "packageManager",
			value: "yarn",
			description: "Use yarn as package manager",
		},
		{
			title: "installDependencies",
			value: true,
			description: "Install dependencies after creating the project",
		},
		{
			title: "folder",
			value: "my-wc-dapp",
			description: "Use 'my-wc-dapp' as the project folder",
		},
		{
			title: "envPrefix",
			value: "NEXT_PUBLIC",
			description: "Use 'NEXT_PUBLIC' as the environment variable prefix",
		},
	],
};

export const PACKAGE_MANAGER: CommandProps = {
	name: "packageManager",
	cmd: "--package-manager",
	alias: "-p",
	description: "Select a package manager to use for your WalletConnect dApp",
	options: [
		{
			title: "yarn",
			value: "yarn",
			description: "Use yarn as package manager",
		},
		{
			title: "npm",
			value: "npm",
			description: "Use npm as package manager",
		},
		{
			title: "pnpm",
			value: "pnpm",
			description: "Use pnpm as package manager",
		},
	],
};

export const TEMPLATE: CommandProps = {
	name: "template",
	cmd: "--template",
	alias: "-t",
	description: "Select a template to use for your WalletConnect dApp",
	options: [
		{
			title: "Next.js",
			value: "nextjs",
			description: "WalletConnect Next.js starter template",
		},
		{
			title: "React",
			value: "react",
			description: "WalletConnect React starter template",
		},
		{
			title: "Vanilla/Vite",
			value: "vanilla",
			description: "WalletConnect Vanilla starter template with Vite",
		},
	],
};

export const FOLDER: CommandProps = {
	name: "folder",
	description: "Select a folder to use for your WalletConnect dApp",
};
