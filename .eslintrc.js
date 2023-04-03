module.exports = {
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	extends: [
		"prettier",
		"plugin:@typescript-eslint/recommended",
		"plugin:import/recommended",
		"plugin:import/typescript",
	],
	env: {
		node: true,
		"jest/globals": true,
	},
	rules: {
		"prefer-template": "error",
		"no-console": "off",
		"no-undef": "error",
		"@typescript-eslint/no-unused-vars": "error",
		"@typescript-eslint/no-explicit-any": "error",
		"sort-imports": [
			"error",
			{
				ignoreCase: true,
				ignoreDeclarationSort: true,
			},
		],
		"import/order": [
			1,
			{
				groups: [
					"external",
					"builtin",
					"internal",
					"sibling",
					"parent",
					"index",
				],
				pathGroups: [
					{
						pattern: "components",
						group: "internal",
					},
					{
						pattern: "common",
						group: "internal",
					},
					{
						pattern: "routes/ **",
						group: "internal",
					},
					{
						pattern: "assets/**",
						group: "internal",
						position: "after",
					},
				],
				pathGroupsExcludedImportTypes: ["internal"],
				alphabetize: {
					order: "asc",
					caseInsensitive: true,
				},
			},
		],
	},
	plugins: ["jest", "import"],
	settings: {
		"import/resolver": {
			node: true,
			typescript: true,
		},
	},
};
