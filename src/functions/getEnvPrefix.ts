import { TEMPLATE } from "../constants/cli";
import { getValue } from "../contexts";

const templates = TEMPLATE?.options?.map(item => item.value) as [
	"nextjs",
	"react",
	"vanilla"
];
const EnvFilePrefix = {
	nextjs: "NEXT_PUBLIC",
	react: "VITE",
	vanilla: "VITE",
};

type TemplateProps = (typeof templates)[number];

const getEnvPrefix = (): string => {
	const template: TemplateProps = getValue("template") as TemplateProps;
	return EnvFilePrefix[template];
};

export default getEnvPrefix;
