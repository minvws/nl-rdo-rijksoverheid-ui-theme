/**                                                                                     
 * This script is an `onReady` hook for BackstopJS.                                     
 *                                                                                      
 * Its primary purpose is to normalize the appearance of visited links across test runs.
 * Browsers maintain a history of visited links, which can cause `a:visited` styles     
 * to be applied inconsistently between visual regression tests. This inconsistency     
 * can lead to "flaky" tests and false positives.                                       
 *                                                                                      
 * By injecting CSS that forces `a:visited` links to inherit their color, this script   
 * ensures that link appearance is deterministic, regardless of browser history,        
 * thereby improving the reliability of visual regression tests.                        
 */                                                                                     
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
