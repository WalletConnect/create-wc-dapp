import APP_CONSTANTS from "../constants/app";
import { getValue, setValue } from "../contexts";

interface TemplateMapProps {
	[key: string]: string;
}

const mapTemplateToRepository = async () => {
	const template = getValue("template") as string;

	const templateMap: TemplateMapProps = {
		nextjs: `next-starter-template-${getValue("library")}`,
		react: `react-starter-template-${getValue("library")}`,
		vanilla: `vanilla-starter-template-${getValue("library")}`,
	};

	setValue("template", templateMap[template]);
	setValue("repository", APP_CONSTANTS.baseURL);
};

export default mapTemplateToRepository;
