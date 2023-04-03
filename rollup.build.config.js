import { terser } from "rollup-plugin-terser";

const modules = [
	"accordion",
	"expando-rows",
	"filters",
	"form-help",
	"navigation",
	"sidemenu",
];

export default modules.map((module) => ({
	input: `src/js/${module}.js`,
	output: [
		{ file: `static/js/${module}.js`, format: "iife" },
		{
			file: `static/js/${module}.min.js`,
			format: "iife",
			plugins: [terser({ mangle: false })],
			sourcemap: true,
		},
	],
}));
