import APP_CONSTANTS from "../constants/app";
import { getValue, setValue } from "../contexts";

interface TemplateMapProps {
	[key: string]: string;
}

const mapTemplateToRepository = async () => {
	const template = getValue("template") as string;

	const templateMap: TemplateMapProps = {
		nextjs: "next-starter-template",
		react: "react-starter-template",
		vanilla: "vanilla-starter-template",
	};

	setValue("template", templateMap[template]);
	setValue("repository", APP_CONSTANTS.baseURL);
};

export default mapTemplateToRepository;
