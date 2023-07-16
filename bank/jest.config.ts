/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
	clearMocks: true,

	collectCoverage: true,

	coverageDirectory: "coverage",

	moduleDirectories: ["node_modules"],

	testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test|steps).[tj]s?(x)"],
	preset: "ts-jest",
	transform: {
		"^.+\\.tsx?$": "ts-jest",
	},
};
