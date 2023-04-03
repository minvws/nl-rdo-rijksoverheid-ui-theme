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
	output: { file: `static/js/${module}.js`, format: "iife" },
}));
