module.exports = {
	setupFilesAfterEnv: ['./jest.setup.js'],
	moduleNameMapper: {
		'\\.(scss|sass|css)$': 'identity-obj-proxy',
	},
	preset: '@shelf/jest-mongodb',
	watchPathIgnorePatterns: ['globalConfig'],
}
