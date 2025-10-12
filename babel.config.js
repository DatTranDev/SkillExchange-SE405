module.exports = function (api) {
	api.cache(true);
	return {
		presets: ["babel-preset-expo"],
		plugins: [
			["nativewind/babel"],
			[
				"module-resolver",
				{
					root: ["./"],
					alias: {
						"@": "./",
						"@constants": "./constants",
						"@assets": "./assets",
						"@components": "./components",
						"@utils": "./utils",
					},
				},
			],
		],
	};
};
