/**
 * @param {{ port: number, files: Array<string> }} options
 */
export const createBackstopConfig = ({ port, files }) => {
  // Run these tests first
  const priorityFiles = [
    "test/links.html"
  ];

  const regularFiles = files.filter(file => !priorityFiles.includes(file));
  const orderedFiles = [...priorityFiles.filter(file => files.includes(file)), ...regularFiles];

  return {
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
    onReadyScript: "puppet/onReady.cjs",
    scenarios: orderedFiles.map((file) => ({
      label: file,
      url: `http://localhost:${port}/${file}`,
      misMatchThreshold: 0.15,
      requireSameDimensions: true,
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
    // reduce this if memory usage is too high
    asyncCompareLimit: 50,
  };
};
