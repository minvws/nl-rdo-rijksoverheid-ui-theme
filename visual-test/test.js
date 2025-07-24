import backstop from "backstopjs";
import { runTestServer } from "./server.js";
import { createBackstopConfig } from "./backstop-config.js";

const bold = "\x1b[1m%s\x1b[0m";

runTestServer(async ({ port, files }) => {
  const config = createBackstopConfig({ port, files });
  try {
    await backstop("test", { config });
    console.log(bold, "\n✅ No visual differences found.");
    console.log("Run 'npm run visual:report' for details.");
  } catch (_) {
    process.exitCode = 1;
    console.log(bold, "\n❌ Visual differences found.");
    console.log("Run 'npm run visual:report' for details.");
    console.log("Run 'npm run visual:approve' to mark visual differences as expected.");
  }
});
