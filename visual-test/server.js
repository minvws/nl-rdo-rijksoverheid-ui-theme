import { stat } from "node:fs/promises";
import net from "net";
import http from "http";
import glob from "fast-glob";
import serveStatic from "serve-static";

const base_path = process.env.VISUAL_TEST_BASE_PATH || "html";
const file_pattern = process.env.VISUAL_TEST_FILE_PATTERN || "test/**/*.html";

/**
 * @param {(options: { port: number, files: Array<string> })} runner
 * @return {Promise<{ files: Array<string>, run: (() => Promise<void>) => Promise<void> }>}
 */
export const runTestServer = async (runner) => {
  const isDirectory = typeof base_path === "string" && (await stat(base_path)).isDirectory();
  if (!isDirectory) throw new Error(`Invalid base path: ${base_path}`);
  if (typeof file_pattern !== "string") throw new Error("Invalid file pattern");
  const files = await glob(file_pattern, { cwd: base_path });
  const port = await getRandomOpenPort();
  const server = createStaticFileServer(base_path);
  await new Promise((resolve, reject) => {
    server.on("error", reject);
    server.listen({ port }, () => {
      runner({ port, files }).finally(() => server.close(resolve));
    });
  });
};

/**
 * @return {Promise<number>}
 */
function getRandomOpenPort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.on("error", reject);
    server.listen({ port: 0 }, () => {
      const { port } = server.address();
      server.close(() => void resolve(port));
    });
  });
}

/**
 * @param {string} base_path
 * @return {require("http").Server}
 */
function createStaticFileServer(base_path) {
  const serve = serveStatic(base_path);
  return http.createServer((req, res) => {
    serve(req, res, (_) => {
      res.statusCode = 404;
      res.end(req.method === "HEAD" ? undefined : "Not Found");
    });
  });
}
