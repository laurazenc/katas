/* eslint-disable camelcase */
module.exports = {
	default: [
		"--require-module ts-node/register",
		"--require __tests__/features/**/*.ts",
		"--publish-quiet",
	].join(" "),
};
