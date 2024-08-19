import backstop from "backstopjs";
import { runTestServer } from "./server.js";
import { createBackstopConfig } from "./backstop-config.js";

const bold = "\x1b[1m%s\x1b[0m";

runTestServer(async ({ port, files }) => {
  const config = createBackstopConfig({ port, files });
  try {
    await backstop("reference", { config });
    console.log(bold, "\n✅ Reference files successfully reset.");
  } catch (_) {
    process.exitCode = 1;
    console.log(bold, "\n❌ Failed to reset reference files.");
  }
});
