// General helper functions.
function open(url, newtab, index) {
  if (index === undefined) { // I sure hope you know what you're doing.
    return thistab(tb => {
      return new Promise((resolve, reject) => {
        newtab ? chrome.tabs.create({
          'url': url,
          'index': tb.index + 1
        }, resolve) : chrome.tabs.update(tb.id, { // Terrible idea, surely.
          'url': url,
        }, resolve);
      });
    });
  } else {
    return new Promise((resolve, reject) => {
      newtab ? chrome.tabs.create({
        'url': url,
        'index': index
      }, resolve) : chrome.tabs.update(index, {
        'url': url
      }, resolve);
    });
  }
}

function eval(code, id, file) {
  var oj = file ? {
    file: code
  } : {
    code: code
  };
  if (id === undefined) {
    return thistab(tb => {
      return new Promise((resolve, reject) => {
        chrome.tabs.executeScript(tb.id, oj, resolve);
      });
    });
  } else {
    return new Promise((resolve, reject) => {
      chrome.tabs.executeScript(id, oj, resolve);
    });
  }
}
var esc = JSON.stringify;
var dlcss = ["\"position:fixed;left:25%;top:",
  ";width:50%;overflow:hidden;z-index:999999;padding:0.5em;" +
  "background:#adf;border:2px solid blue;border-radius:4px;\""
];
var scormwin =
  "function(){var n=$(\"iframe[src^=\\\"/content/\\\"]\")[0],o=$(\"#ScormContent\")[0];" +
  "return void 0!==o?o.contentWindow:void 0!==n?(o=n.contentWindow.$(\"#ScormContent\")" +
  "[0],void 0!==o?o.contentWindow:n.contentWindow): window}();";

function xss(name, code) {
  return "var scr=document.createElement(\"script\");scr.id=\"" + name + "scrtag\";" +
    "scr.innerText=" + esc("document.getElementById(\"" + name + "scrtag\").remove();" + code) +
    ";document.documentElement.appendChild(scr);"
}

function prompt(msg, pre) {
  var input = document.getElementById('input'),
    msgbox = document.getElementById('msg'),
    promptbox = document.getElementById('prompt');
  input.value = pre || "";
  input.select();
  msgbox.innerText = msg;
  promptbox.hidden = false;
  input.focus();
  return new Promise((resolve, reject) => {
    var chke = e => {
      if (e.key === "Enter") {
        input.removeEventListener('keydown', chke);
        promptbox.hidden = true;
        resolve(input.value);
      }
    };
    input.addEventListener('keydown', chke);
  });
}
// Be sure that func returns a Promise. Does the function to all selected tabs
function thistab(func) {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({
      highlighted: true,
      currentWindow: true
    }, resolve)
  }).then(list => {
    var lis = [];
    for (var x of list) {
      lis.push(func(x));
    }
    return Promise.all(lis);
  });
}

function msgback(msg) {
  return new Promise(resolve => chrome.runtime.sendMessage(msg, resolve));
}
document.addEventListener("DOMContentLoaded", function () {
  thistab(tb => {
    var bts = document.querySelectorAll('.mybtn'),
      cur = tb.url.match(/tour-aus.aws.haylix.net/) ? "green" : "yellow";
    for (x of bts) {
      var fun = window[x.id]
      if (typeof (fun) === 'function') {
        x.style.border = "solid 1px " + cur;
        x.addEventListener('click', fun);
      } else {
        x.style.border = "solid 1px red";
      }
    }
  });
});

function SHOR(evf) {
  var newtab = evf.ctrlKey;
  prompt("1: (a)lpha, (d)ev, (u)at, (s)taging, (p)rod\n" +
    "2: (a)uthor, author-(l)b, publisher (1)/(2), dispatcher (o)ne/(t)wo, (e)lb, a(k)amai\n" +
    "3: (a)us.com, a(s)p, (i)nv, (b)e, (c)orp").then(letts => {
    var pieceone = "http://",
      piecetwo = ".tour-aus.aws.haylix.net",
      longform = true,
      authmode = false;
    if (letts.slice(1, 2) === 'k') {
      var hre = {
        "sa": "http://staging.australia.com/en",
        "ss": "https://unifiedstaging.aussiespecialist.com/en-gb",
        "si": "http://staging.tourisminvestment.tourism.australia.com/en",
        "sb": "http://staging.businessevents.australia.com/en",
        "pa": "http://www.australia.com/en",
        "ps": "https://www.aussiespecialist.com/en",
        "pi": "http://tourisminvestment.com.au/en",
        "pb": "http://businessevents.australia.com/en",
        "pc": "http://prod.tourism.australia.com/en"
      }[letts.slice(0, 1) + letts.slice(2, 3)];
      return open(hre, newtab);
    } else {
      pieceone += {
        "a": "alpha-",
        "d": "dev-",
        "u": "uat-",
        "s": "stage-",
        "p": "prod-",
      }[letts.slice(0, 1)];
      var sact = {
        "a": ["aut1", ":4502/siteadmin#/content/", true, longform],
        "l": ["author", "/siteadmin#/content/", true, longform],
        "1": ["pub1", ":4503/content/", authmode, longform],
        "2": ["pub2", ":4503/content/", authmode, longform],
        "o": ["pdis1-", "/en.html", authmode, false],
        "t": ["pdis2-", "/en.html", authmode, false],
        "e": ["pub-elb-", "/en.html", authmode, false]
      }[letts.slice(1, 2)];
      pieceone += sact[0], piecetwo += sact[1], [authmode, longform] = sact.slice(2, 4);
      if (longform) {
        piecetwo += {
          "a": "australia/en",
          "s": "asp/en",
          "i": "investment/en",
          "b": "businessevents/en",
          "c": "corporate/en"
        }[letts.slice(2, 3)];
        authmode || (piecetwo += ".html"); // If not in authmode, add the .html
      } else pieceone += {
        "a": "aus",
        "s": "asp",
        "i": "investment",
        "b": "be",
        "c": "corp"
      }[letts.slice(2, 3)];
      return open(pieceone + piecetwo, newtab);
    }
  }).then(window.close);
}

function SWCH(evf) {
  var newtab = evf.ctrlKey;
  prompt("(a)uthor, author(l)b, publisher(1), publisher(2), " +
    "dispatcher(o)ne, dispatcher(t)wo (e)lb").then(lett => {
    var exten = {
        "aus": "australia",
        "be": "businessevents",
        "corp": "corporate"
      },
      retra = {
        "australia": "aus",
        "businessevents": "be",
        "corporate": "corp"
      };
    if (lett) {
      return thistab(actvtb => {
        var cref = new URL(actvtb.url),
          loc, site, page, nurl, base = ".tour-aus.aws.haylix.net";
        nurl = "http://" + cref.host.match(/^(\w+?-)/)[1];
        loc = cref.href.match(/\/(\w\w([-_]\w\w)?)(\/|$|\?|\.html)/)[1].replace("-", "_");
        if (cref.host.match(/pub-elb|pdis\d/)) {
          site = cref.host.match(/(\pub-elb-|pdis\d-)(\w+?)\./)[2];
          site = exten[site] || site;
          page = cref.pathname.match(/\/(.+?)(\.html|$|\?)/)[1].split("/").slice(1).join(
            "/") + ".html";
        } else {
          var l = cref.href.match(/\/content\/(.+?)(\.html|$|\?)/)[1].split("/");
          site = l[0];
          page = l.slice(2).join("/") + ".html";
        }
        switch (lett.toLowerCase().trim()) {
        case "a":
          nurl += "aut1" + base + ":4502/cf#/content/" + [site, loc, page].join("/");
          break;
        case "l":
          nurl += "author" + base + "/cf#/content/" + [site, loc, page].join("/");
          break;
        case "1":
          nurl += "pub1" + base + ":4503/content/" + [site, loc, page].join("/");
          break;
        case "2":
          nurl += "pub2" + base + ":4503/content/" + [site, loc, page].join("/");
          break;
        case "o":
          nurl += "pdis1-" + (retra[site] || site) + base + ["", loc.replace("_", "-"),
            page
          ].join("/");
          break;
        case "t":
          nurl += "pdis2-" + (retra[site] || site) + base + ["", loc.replace("_", "-"),
            page
          ].join("/");
          break;
        case "e":
          nurl += "pub-elb-" + (retra[site] || site) + base + ["", loc.replace("_", "-"),
            page
          ].join("/");
        }
        return open(nurl, newtab, actvtb.id);
      });
    }
  }).then(window.close);
}

function RPR(evf) {
  thistab(tab => msgback({
    'method': 'toggleRPRtab',
    'arguments': [tab.id, new URL(tab.url).pathname.match(/^\/content\/(\w+?)\//)[1]]
  })).then(window.close);
}

function REG() {
  eval("md5.js", undefined, true).then(() => eval(xss("REG",
    "document.getElementById(\"register-submit\").click();"))).then(window.close);
}

function REG1() {
  eval("md5.js", undefined, true).then(window.close);
}

function LOG() {
  prompt("Enter a Username (Comma/space separated password optional)").then(usn => {
    usn = usn.split(/[, ]/);
    usn[1] = usn[1] || "Welcome1";
    return eval("document.getElementById('j_username').value=" + esc(usn[0]) +
      "; document.getElementsByName('j_password')[0].value=" + esc(usn[1]) +
      "; document.getElementById('usersignin').click();");
  }).then(window.close);
}

function MOS() {
  thistab(tab => eval("var z=[];for(x of document.querySelectorAll(" +
    "\".mosaic .line-through-container-biline > a.type-anchor-title:not([href=\\\"#\\\"])" +
    ",.sitemap a:not([href=\\\"#\\\"])\")){z.push(x.href);}z;", tab.id).then(resura => {
    var lis = [];
    for (var x of resura[0]) {
      var ind = Math.round(tab.index + 1);
      lis.push(open(x, true, ind));
    }
    return Promise.all(lis);
  })).then(window.close);
}

function DUP() {
  var locs = ["en", "en-gb", "en-us", "en-ca", "en-in", "en-my", "en-sg", "id-id", "en-hk", "en-nz",
    "en-ie", "zh-hk", "ja-jp", "ko-kr", "pt-br", "de-de", "fr-fr", "it-it", "es-cl", "zh-cn"
  ];
  thistab(tab => {
    var ind = tab.index,
      ur = tab.url,
      lis = [];
    for (c of locs) {
      ind = Math.round(ind + 1);
      ur.match("/content/") && (c = c.replace("-", "_"));
      lis.push(open(ur.replace(/\/\w\w([-_]\w\w)?(\/|.html|$)/, "/" + c + "$2"), true, ind));
    };
    return Promise.all(lis);
  }).then(window.close);
}

function DEC() {
  thistab(ta => open(ta.url + "?" + Math.random(), false, ta.id)).then(window.close);
}

function IDEC() {
  thistab(tab => eval(
    "for(i of document.querySelectorAll(\"[src]\")){i.src += \"?\" + Math.random();}" +
    "for(i of document.querySelectorAll(\"[style*='url']\")){" +
    "  i.style.cssText=i.style.cssText.replace(/url\\(\"(.*?)\"\\)/,\"url(\\\"$1?\"+Math.random()+\"\\\")\")}"
  )).then(window.close);
}

function DL(evf) {
  var low = evf.ctrlKey ? "500px" : "0px";
  eval(xss('DL',
    'var thetext;if(window.dataLayer_Event==undefined){thetext="No dataLayer_Event defined."}' +
    'else{thetext=JSON.stringify(dataLayer_Event,0,1)};var div=document.createElement("pre");' +
    'div.innerText=thetext;div.style.cssText=' + dlcss.join(low) +
    ';document.documentElement.appendChild(div);div.onclick=function(e)' +
    '  {e.stopPropagation()};document.addEventListener("click",function(){div.remove();},{once:true});'
  )).then(window.close);
}

function DLR(evf) {
  var low = evf.ctrlKey ? "500px" : "0px";
  thistab(tb => msgback({
    'method': 'toggleDLRTab',
    'arguments': [tb.id]
  }).then(isdlr => {
    console.log(isdlr);
    if (isdlr.result) {
      return eval(xss('DLR',
        'function oncl(){void 0==window.dataLayer_Event?div.innerText="No dataLayer_Event defined.":' +
        'div.innerText=JSON.stringify(dataLayer_Event,0,1)}var div=document.createElement("pre");' +
        'oncl(),div.id="DLRtag",div.style.cssText=' + dlcss.join(low) +
        ',document.documentElement.appendChild(div),div.onclick=function(e){e.stopPropagation()};' +
        'document.addEventListener("click",oncl)'), tb.id);
    } else {
      return eval(xss('DLR', "document.removeEventListener(\"click\", oncl);" +
        "document.getElementById(\"DLRtag\").remove();"), tb.id);
    }
  })).then(window.close);
}

function GTO() {
  thistab(tab => eval(xss("GTO",
    "var gtotag=document.createElement(\"input\");document.documentElement.appendChild(gtotag);" +
    "gtotag.type=\"hidden\";gtotag.id=\"GTOtag\";GTOwin=" + scormwin +
    "gtotag.value=GTOwin.cpInfoSlideCount+\", \"+GTOwin.cpInfoCurrentSlide;"), tab.id).then(() =>
    eval("document.getElementById(\"GTOtag\").value"), tab.id)).then(res => {
    var msg = res.length != 1 ? " (and Multiple Others)" : "";
    res = res[0][0][0].split(',');
    return prompt(res[0] + msg, res[1]).then(num => thistab(tab => eval(xss("GTO",
      "document.getElementById(\"GTOtag\").remove();GTOwin.cpCmndGotoSlide=" + (Number(
        num) - 1)), tab.id)));
  }).then(window.close);
}

function TRK() {
  thistab(tab => eval(xss('TRK', 'var trktag=document.createElement("span");' +
    'trktag.id="TRKtag";trktag.style.cssText="position:fixed;top:300px;left:2em;z-index:1000;";' +
    'document.documentElement.appendChild(trktag);TRKwin=' + scormwin +
    '!function TRKloop(){trktag.innerText=TRKwin.cpInfoCurrentSlide + \" of \" + TRKwin.' +
    'cpInfoSlideCount;window.setTimeout(TRKloop,1e3)}();'), tab.id)).then(window.close);
}

function MOD() {
  thistab(tab => eval(xss("MOD", "function modgo(n){MODwin.cpCmndGotoSlide=n-1}var MODwin=" +
    scormwin + "switch(MODwin.location.href.match(/(\\w\\w_){2}\\w+?_\\w+?" +
    "(?=_|\\/|\\.)/)[0].split(\"_\")[3]){case \"mod3\":modgo(MODwin.cpInfoSlideCount - 6);" +
    "break;default:modgo(MODwin.cpInfoSlideCount - 4)};"), tab.id)).then(window.close);
}

function MUDA() {
  thistab(tab => eval(xss("MUDA", "var o=[\"_core_mod1\",\"_core_mod2\",\"_core_mod3\"," +
    "\"_sto_vic\",\"_sto_nsw\"],f=location.href.match(/\\/(\\w\\w([-_]\\w\\w)?)" +
    "(\\/|(\\.html)|$)/)[1],e=f.split(/[-_]/);e=((e[0]==\"es\"&&e[1]==\"cl\")||" +
    "(e[0]==\"pt\"&&e[1]==\"br\"))?e:e.reverse();e=e.join(\"_\")" +
    ".replace(\"gb\",\"uk\");for(m in o)if(o.hasOwnProperty(m))" +
    "$.ajax({url:\"/bin/asp/trainingModule\",type:\"POST\",cache:!1,dataType:\"json\"," +
    "data:{isComplete:true,moduleId:e+o[m],locale:f}});"), tab.id)).then(window.close);
}
