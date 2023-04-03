import { SingleBar } from "cli-progress";

type ContextProps = {
	template: string | null;
	folder: string | null;
	repository: string | null;
	projectPath: string | null;
	baseName: string | null;
};

type ProgressBarProps = {
	progress: SingleBar | null;
};

const context: ContextProps = {
	template: null,
	folder: null,
	repository: null,
	projectPath: null,
	baseName: null,
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

export const setValue = (
	key: keyof ContextProps,
	value: ContextProps[keyof ContextProps]
) => {
	context[key] = value;
};

export const getValue = (key: keyof ContextProps) => {
	return context[key];
};

export const getAllValues = () => {
	return context;
};
