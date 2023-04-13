#!/usr/bin/env node

const fs = require("fs").promises;
const path = require("path");
const sass = require("sass");

const includePaths = [
  path.resolve(__dirname, "../scss"),
  path.resolve(__dirname, "../node_modules"),
];
const outDir = path.resolve(__dirname, "../css");
const outFile = "main.css";

const promises = [];

const data = `
  $ro-font-path: "../fonts";
  $ro-img-path: "../img";

  @import "main";
`;
const result = sass.compileString(data, {
  style: "compressed",
  sourceMap: true,
  loadPaths: includePaths,
});

promises.push(fs.mkdir(outDir, { recursive: true }));
promises.push(fs.writeFile(path.resolve(outDir, outFile), result.css.toString()));

Promise.all(promises).catch((error) => {
  console.error(error);
  process.exit(1);
});
