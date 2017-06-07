// General helper functions.
function open(url, newtab, index) {
  if (index == undefined) {
    thistab(function(tb) {
      newtab ? chrome.tabs.create({
        'url': url,
        'index': tb.index + 1
      }) : chrome.tabs.update({
        'url': url
      })
    })
  } else {
    newtab ? chrome.tabs.create({
      'url': url,
      'index': index
    }) : chrome.tabs.update({
      'url': url
    })
  }
}

function thistab(func) {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabr) {
    func(tabr[0])
  });
}

// Some helper functions for the RPR button.
fixingtabs = {};
chrome.tabs.onUpdated.addListener(function(id, s, inf) {
  var tenta;
  if (fixingtabs[id] && s.status == 'loading' && ((tenta = new URL(inf.url)).origin.match(
      /pub\d/) && !tenta.pathname.match(/^\/content\//))) {
    chrome.tabs.update(id, {
      url: tenta.origin + "/content/" + fixingtabs[id] + tenta.pathname.replace(
        /\/(\w\w)-(\w\w)/, "/$1_$2")
    })
  }
});

function addRPRtab(tabid, site) {
  fixingtabs[tabid] = site;
}

function remRPRtab(tabid) {
  delete fixingtabs[tabid];
}

//Helper functions for the DLR button.
haltingtabs = {};
chrome.webRequest.onBeforeRequest.addListener(function(detl) {
  if (haltingtabs[detl.tabId]) {
    return {
      redirectUrl: 'javascript:void(0);'
    };
  }
}, {
  urls: []
}, ["blocking"]);

function addDLRTab(tabid) {
  haltingtabs[tabid] = true;
}

function remDLRTab(tabid) {
  delete haltingtabs[tabid];
}
