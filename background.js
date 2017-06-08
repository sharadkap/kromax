//Port System: Firefox can't handle incognito extensions.
var port;
chrome.runtime.onConnect.addListener(p => {
  if (port) { //Juust in case you have two connections.        Delete the old one??
    port.onConnect.removeListener(handl);
    port = null;
  }
  port = p;

  function handl(m) {
    try {
      port.sendMessage({
        "result": window[m.method](...m.arguments)
      });
    }
  }

  port.onMessage.addListener(handl);
  port.onDisconnect.addListener(m => {
    port.onConnect.removeListener(handl);
    port = null;
  })
})


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

function toggleRPRtab(tabid, site) {
  if (fixingtabs[tabid] === site)
    delete fixingtabs[tabid];
  else
    fixingtabs[tabid] = site;
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

function

function addDLRTab(tabid) {
  haltingtabs[tabid] = true;
}

function remDLRTab(tabid) {
  delete haltingtabs[tabid];
}
