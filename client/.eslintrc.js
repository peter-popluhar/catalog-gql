module.exports = {
	// Specifies the ESLint parser
	parser: '@typescript-eslint/parser',
	extends: [
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier/@typescript-eslint',
		'plugin:prettier/recommended',
		'prettier',
		'plugin:testing-library/recommended',
		'plugin:testing-library/react',
		'plugin:jest-dom/recommended',
	],
	settings: {
		react: {
			version: 'detect',
		},
	},
	env: {
		browser: true,
		node: true,
		es6: true,
		jest: true,
	},
	plugins: [
		'@typescript-eslint',
		'react',
		'prettier',
		'testing-library',
		'jest-dom',
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		// Allows for the parsing of modern ECMAScript features
		ecmaVersion: 2018,
		// Allows for the use of imports
		sourceType: 'module',
	},
	rules: {
		// disable the rule for all files
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		// Disable prop-types as we use TypeScript for type checking
		'react/prop-types': 'off',
		'@typescript-eslint/explicit-function-return-type': [
			'off',
			{allowTypedFunctionExpressions: true},
		],
		'prettier/prettier': 'error',
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/ban-ts-ignore': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		// needed for NextJS's jsx without react import
		'react/react-in-jsx-scope': 'off',
	},
	globals: {React: 'writable'},
}
