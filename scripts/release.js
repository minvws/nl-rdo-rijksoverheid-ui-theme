const fs = require("fs").promises;
const path = require("path");
const readline = require("readline");
const conventionalChangelog = require("conventional-changelog");
const zip = require("zip-dir");

let changelog = "";

conventionalChangelog({ preset: "angular" })
	.on("data", (chunk) => (changelog += chunk))
	.on("error", (error) => {
		console.error("Failed to generate changelog:", error);
		process.exit(1);
	})
	.on("end", async () => {
		// trim useless header and trailing newlines
		changelog = changelog.replace(/^(\s|#\s+\[\]\(.*?\)\s+\(.*?\))+|\s+$/g, "");
		console.log("\n\033[1mChangelog:\033[22m\n");
		console.log(changelog, "\n");
		const version = await promptVersion();
		console.log("");
		await Promise.all([writeChangelog(version, changelog), writeZip(version)]);
		process.exit(0);
	});

const promptVersion = () =>
	new Promise((resolve) => {
		const rl = readline
			.createInterface({
				input: process.stdin,
				output: process.stdout,
				prompt: "\033[1mNext version:\033[22m v",
			})
			.on("line", (line) => resolve("v" + line.trim()))
			.prompt();
	});

const writeChangelog = async (version, changelog) => {
	try {
		const filename = path.resolve(__dirname, `../manon-${version}.md`);
		await fs.writeFile(filename, changelog);
		console.log("\033[1mChangelog written to:\033[22m", filename, "\n");
	} catch (error) {
		console.error("\033[1mFailed to write changelog:\033[22m", error);
		process.exit(1);
	}
};

const writeZip = async (version) => {
	try {
		const buildDir = path.resolve(__dirname, "../static/");
		const filename = path.resolve(__dirname, `../manon-${version}.zip`);
		await zip(buildDir, { saveTo: filename });
		console.log("\033[1mZip written to:\033[22m", filename, "\n");
	} catch (error) {
		console.error("\033[1mFailed to write zip:\033[22m", error);
		process.exit(1);
	}
};
