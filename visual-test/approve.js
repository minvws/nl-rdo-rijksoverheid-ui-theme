import backstop from "backstopjs";
import { runTestServer } from "./server.js";
import { createBackstopConfig } from "./backstop-config.js";

const bold = "\x1b[1m%s\x1b[0m";

runTestServer(async ({ port, files }) => {
  const config = createBackstopConfig({ port, files });
  try {
    await backstop("approve", { config });
    console.log(bold, "\n✅ Reference files updated successfully.");
    console.log("Run 'npm run visual:test' if you want a fresh report.");
  } catch (_) {
    console.log(bold, "\n❌ Failed to update reference files.");
  }
});
