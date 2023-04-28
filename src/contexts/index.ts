import { SingleBar } from "cli-progress";

type ContextProps = Record<
	| "template"
	| "folder"
	| "repository"
	| "projectPath"
	| "baseName"
	| "packageManager"
	| "projectID"
	| "envPrefix",
	string | null
>;

type InstallDependenciesProps = Record<"installDependencies", boolean | null>;

type ProgressBarProps = {
	progress: SingleBar | null;
};
type CombinedProps = ContextProps & InstallDependenciesProps;

const context: CombinedProps = {
	template: null,
	folder: null,
	repository: null,
	projectPath: null,
	baseName: null,
	packageManager: null,
	envPrefix: null,
	projectID: null,
	installDependencies: false,
};

const progressContext: ProgressBarProps = {
	progress: null,
};

export const setProgressBar = (progress: SingleBar) => {
	progressContext.progress = progress;
	return progressContext.progress;
};

export const getProgressBar = () => {
	return progressContext.progress;
};

export const setValue = <K extends keyof CombinedProps>(
	key: K,
	value: CombinedProps[K]
) => {
	context[key] = value;
	return context[key];
};

export const getValue = (key: keyof CombinedProps) => {
	return context[key];
};

export const getAllValues = () => {
	return context;
};
