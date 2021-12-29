module.exports = {
	setupFilesAfterEnv: ['./jest.setup.js'],
	moduleNameMapper: {
		'\\.(scss|sass|css)$': 'identity-obj-proxy',
	},
	watchPathIgnorePatterns: ['globalConfig'],
}
