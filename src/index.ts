import fs from 'fs';

import * as chromeLauncher from 'chrome-launcher';
import lighthouse from 'lighthouse';


// 自定义报表配置
function launchChromeAndRunLighthouse(url: string, opts: any) {
  // 先使用chrome launcher打开一个chrome窗口
  return chromeLauncher.launch({ chromeFlags: opts.chromeFlags }).then(chrome => {
    // eslint-disable-next-line functional/immutable-data
    opts.port = chrome.port;
    // 然后再相同的端口运行lighthouse
    return lighthouse(url, opts).then((results: any) =>
      chrome.kill().then(() => results));
  });
}

const opts = {
  output: 'html',
  chromeFlags: ['--headless'],
  onlyCategories: ['performance'],
  logLevel: 'info',
};

// Usage:
launchChromeAndRunLighthouse('https://www.baidu.com', opts).then(results => {
  // 获取测试结果，可以自定义报表的展现
  const reportHtml = results.report;
  fs.writeFileSync('lhreport.html', reportHtml);
  fs.writeFileSync('report.json', JSON.stringify(results.lhr));

  // `.lhr` is the Lighthouse Result as a JS object
  console.log('Report is done for', results.lhr.finalUrl);
  console.log('Performance score was', results.lhr.categories.performance.score * 100);
});