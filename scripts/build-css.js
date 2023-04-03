#!/usr/bin/env node

const fs = require("fs").promises;
const path = require("path");
const sass = require("sass");

const includePaths = [path.resolve(__dirname, "../src/scss")];
const outDir = path.resolve(__dirname, "../static/css");

const colors = [
	"brown",
	"dark-blue",
	"dark-brown",
	"dark-green",
	"dark-yellow",
	"green",
	"light-blue",
	"mint-green",
	"moss-green",
	"orange",
	"pink",
	"purple",
	"red",
	"ruby-red",
	"sky-blue",
	"violet",
	"yellow",
];

const promises = [];

colors.forEach((color) => {
	const data = `
		$app-color: "${color}";
		@import "shared";
	`;
	const file = `manon-${color}.scss`;
	const outFile = `manon-${color}.css`;
	const result = sass.renderSync({
		data,
		file,
		outFile,
		includePaths,
		outputStyle: "compressed",
	});

	promises.push(fs.writeFile(path.resolve(outDir, outFile), result.css));
});

Promise.all(promises).catch((error) => {
	console.error(error);
	process.exit(1);
});
