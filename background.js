//Runtime Messaging System: Firefox can't handle incognito extensions.
chrome.runtime.onMessage.addListener((msg, sender, resolve) => resolve({
  "result": window[msg.method](...msg.arguments)
}));
// Some helper functions for the RPR button.
fixingtabs = {};
chrome.webRequest.onBeforeRequest.addListener(detl => {
  var nurl;
  if (fixingtabs[detl.tabId] && ((nurl = new URL(detl.url)).origin.match(/pub\d/) && !nurl.pathname
      .match(/^\/content\//))) {
    return {
      redirectUrl: nurl.origin + "/content/" + fixingtabs[detl.tabId] + nurl.pathname.replace(
        /\/(\w\w)-(\w\w)/, "/$1_$2")
    };
  }
}, {
  urls: [],
  types: ['main_frame']
}, ['blocking'])

function toggleRPRtab(tabid, site) {
  if (fixingtabs[tabid] === site) delete fixingtabs[tabid];
  else fixingtabs[tabid] = site;
}
//Helper functions for the DLR button.
haltingtabs = {};
chrome.webRequest.onBeforeRequest.addListener(detl => {
  if (haltingtabs[detl.tabId]) {
    return {
      redirectUrl: 'javascript:void(0);'
    };
  }
}, {
  urls: [],
  types: ['main_frame']
}, ["blocking"]);
//Returns True if the tab was successfully added, returns False if it was deleted.
function toggleDLRTab(tabid) {
  if (haltingtabs[tabid]) {
    delete haltingtabs[tabid];
    return false;
  } else return haltingtabs[tabid] = true;
}

function log() {
  console.log(arguments);
}
