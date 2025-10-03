module.exports = async (page, scenario, vp) => {
  console.log('SCENARIO > ' + scenario.label);

  // Remove visited link styling by injecting CSS
  await page.evaluate(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      a:visited {
        color: inherit !important;
      }
    `;
    document.head.appendChild(style);
  });

  // Wait for styles to apply
  await new Promise(resolve => setTimeout(resolve, 100));
};
