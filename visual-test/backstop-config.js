/**
 * @param {{ port: number, files: Array<string> }} options
 */
export const createBackstopConfig = ({ port, files }) => ({
  id: "rijksoverheid-ui-theme",
  viewports: [
    {
      label: "mobile",
      width: 320,
      height: 480,
    },
    {
      label: "desktop",
      width: 1024,
      height: 768,
    },
  ],
  scenarios: files.map((file) => ({
    label: file,
    url: `http://localhost:${port}/${file}`,
  })),
  paths: {
    bitmaps_reference: "visual-test/bitmaps_reference",
    bitmaps_test: "visual-test/bitmaps_test",
    engine_scripts: "visual-test/engine_scripts",
    html_report: "visual-test/html_report",
    ci_report: "visual-test/ci_report",
  },
  report: ["browser", "CI"],
  engine: "puppeteer",
  engineOptions: {
    args: ["--no-sandbox"],
    protocol: "webDriverBiDi",
  },
  // avoid race conditions:
  asyncCaptureLimit: 1,
  // reduce this if memory usage is too high
  asyncCompareLimit: 50,
});
