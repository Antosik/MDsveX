import node from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import sucrase from '@rollup/plugin-sucrase';
import dts from 'rollup-plugin-dts';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import polyfillNode from 'rollup-plugin-polyfill-node';

const pkg = JSON.parse(readFileSync(resolve('package.json'), 'utf-8'));

export default [
	{
		plugins: [
			polyfillNode({
				include: ['process'],
			}),
			node({ preferBuiltins: true }),
			commonjs(),
			json(),
			sucrase({ transforms: ['typescript'] }),
		],
		input: 'src/main.ts',
		external: ['svelte/compiler'],
		output: {
			dir: './dist',
			format: 'es',
			sourcemap: true,
		},
	},
	{
		plugins: [dts()],
		input: 'src/main.ts',

		output: {
			dir: './dist',
			format: 'es',
			sourcemap: true,
		},
	},
];
