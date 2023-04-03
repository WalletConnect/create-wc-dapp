import _progress from "cli-progress";
import { CREATING_TEXT, PROGRESS_FORMAT } from "@/constants/steps";
import { setProgressBar } from "@/contexts";
import cloneAndCopy from "./cloneAndCopy";
import { log } from "./log";
import { wcText } from "./wcText";

const createDapp = async () => {
	// Create the project folder and copy the template files
	log(wcText(`\n${CREATING_TEXT}\n`));
	const progressBar = setProgressBar(
		new _progress.SingleBar(
			{
				format: PROGRESS_FORMAT,
			},
			_progress.Presets.shades_classic
		)
	);
	progressBar.start(100, 0);

	let value = 0;

	// Simulate the progress bar with a timer (10ms)
	const timer = setInterval(function () {
		value++;
		progressBar.update(value);
		if (value >= progressBar.getTotal()) {
			clearInterval(timer);
			cloneAndCopy();
		}
	}, 10);
};

export default createDapp;
