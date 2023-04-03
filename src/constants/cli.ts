type OptionProps = {
	title: string;
	value: string;
	description: string;
};

interface CommandProps {
	name: string;
	cmd?: string;
	alias?: string;
	description: string;
	options?: OptionProps[];
}

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
