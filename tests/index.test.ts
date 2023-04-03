import { describe, expect, test } from "@jest/globals";
import { TEMPLATE as TEMPLATE_CONSTANTS } from "../src/constants/cli";
import { getAllValues } from "../src/contexts";
import { argParse } from "../src/index";

describe("Command Line Checks", () => {
	test("Folder only", () => {
		const contexts = getAllValues();
		const folder = "hello-world";
		process.argv.push(folder);
		argParse();
		expect(contexts.folder).toBe(folder);
		expect(contexts.template).toBeFalsy();
	});

	test("Template only", () => {
		const contexts = getAllValues();

		const template =
			TEMPLATE_CONSTANTS.options && TEMPLATE_CONSTANTS.options[0].value;

		process.argv.push("-t", template as string);
		argParse();
		expect(contexts.template).toBe(template as string);
	});

	test("Folder and Template", () => {
		const contexts = getAllValues();

		const folder = "hello-world";
		const template =
			TEMPLATE_CONSTANTS.options && TEMPLATE_CONSTANTS.options[0].value;

		process.argv.push(folder, "-t", template as string);
		argParse();
		expect(contexts.folder).toBe(folder);
		expect(contexts.template).toBe(template as string);
	});
});
