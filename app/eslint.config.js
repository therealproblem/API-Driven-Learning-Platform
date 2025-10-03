import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import pluginImport from 'eslint-plugin-import';
import pluginN from 'eslint-plugin-n';
import pluginPrettier from 'eslint-plugin-prettier';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
	js.configs.recommended, // ESLint recommended rules

	...tseslint.configs.recommended, // TypeScript rules

	{
		ignores: ['dist', 'node_modules'] // ignore build output
	},

	{
		files: ['**/*.ts'],
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				project: './tsconfig.json'
			}
		},
		plugins: {
			import: pluginImport,
			n: pluginN,
			prettier: pluginPrettier
		},
		rules: {
			// General best practices
			'no-console': 'warn',
			'no-unused-vars': 'off', // handled by TS
			'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

			// Import order
			'import/order': [
				'warn',
				{
					groups: ['builtin', 'external', 'internal'],
					alphabetize: { order: 'asc', caseInsensitive: true }
				}
			],

			// Node best practices
			'n/no-missing-import': 'off', // handled by TS
			'n/no-unsupported-features/es-syntax': 'off',

			// Prettier integration
			'prettier/prettier': 'warn'
		}
	},

	prettier
];
