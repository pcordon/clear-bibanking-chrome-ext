var running = false;
var origins = [
  "https://bibanking.bi.com.gt",
  "https://www.bibanking.bi.com.gt"
];

function clearBiBullshit(tab) {
  if (running) {
    alert("Still running.");
    return;
  }

  // if (!confirm("Clear Bi-B@nking data?")) return;

  running = true;
  chrome.tabs.create({ url: chrome.runtime.getURL("main.html") }, function(
    tab
  ) {
    chrome.browsingData.remove(
      { origins: origins },
      {
        cacheStorage: true,
        cookies: true,
        fileSystems: true,
        indexedDB: true,
        localStorage: true,
        pluginData: true,
        serviceWorkers: true,
        webSQL: true
      },
      function() {
        chrome.browsingData.removeCookies({ origins: origins }, function() {
          running = false;
          setTimeout(() => {
            chrome.tabs.update(tab.id, {
              url: "https://www.bibanking.bi.com.gt/"
            });
          }, 1000);
        });
      }
    );
  });
}

chrome.browserAction.onClicked.addListener(tab => clearBiBullshit(tab));
