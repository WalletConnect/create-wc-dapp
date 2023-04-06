import { TEMPLATE } from "../constants/cli";

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

export type TemplateProps = (typeof templates)[number];

const getEnvPrefix = (template: TemplateProps): string => {
	return EnvFilePrefix[template];
};

export default getEnvPrefix;
