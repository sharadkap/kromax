bg = chrome.extension.getBackgroundPage();
var open = bg.open,
  thistab = bg.thistab;

document.addEventListener("DOMContentLoaded", function() {
  thistab(function(tb) {
    var bts = document.querySelectorAll('.mybtn'),
      cur = tb.url.match(/tour-aus.aws.haylix.net/) ? "green" : "yellow";
    for (x of bts) {
      var fun = window[x.id]
      if (typeof(fun) === 'function') {
        x.style.border = "solid 1px " + cur;
        x.addEventListener('click', fun);
      } else {
        x.style.border = "solid 1px red";
      }
    }
  })
})

// Be sure that func returns a Promise.
function foreach(list, func) {
  var lis = [];
  for (var x of list) {
    lis.push(func(x));
  }
  return Promise.all(lis);
}

function SHOR(evf) {
  var e = prompt(
      "1: (a)lpha, (d)ev, (u)at, (s)taging, (p)rod\n2: (a)uthor, author-(l)b, publisher (1)/(2), dispatcher (o)ne/(t)wo, (e)lb, a(k)amai\n3: (a)us.com, a(s)p, (i)nv, (b)e, (c)orp"
    ),
    a = ".tour-aus.aws.haylix.net",
    s = "http://",
    t = true,
    c = false,
    newtab = evf.ctrlKey;
  if (e.slice(1, 2) === 'k') {
    var hre = (function(f) {
      switch (f) {
        case "sa":
          return "http://staging.australia.com/en";
        case "ss":
          return "https://unifiedstaging.aussiespecialist.com/en-gb";
        case "si":
          return "http://staging.tourisminvestment.tourism.australia.com/en";
        case "sb":
          return "http://staging.businessevents.australia.com/en";
        case "pa":
          return "http://www.australia.com/en";
        case "ps":
          return "https://www.aussiespecialist.com/en";
        case "pi":
          return "http://tourisminvestment.com.au/en";
        case "pb":
          return "http://businessevents.australia.com/en";
      }
    }(e.slice(0, 1) + e.slice(2, 3)));
    open(hre, newtab)
  } else {
    switch (e.slice(0, 1)) {
      case "a":
        s += "alpha-";
        break;
      case "d":
        s += "dev-";
        break;
      case "u":
        s += "uat-";
        break;
      case "s":
        s += "stage-";
        break;
      case "p":
        s += "prod-";
        break;
    }
    switch (e.slice(1, 2)) {
      case "a":
        s += "aut1", a += ":4502/siteadmin#/content/", c = !0;
        break;
      case "l":
        s += "author", a += "/siteadmin#/content/", c = !0;
        break;
      case "1":
        s += "pub1", a += ":4503/content/";
        break;
      case "2":
        s += "pub2", a += ":4503/content/";
        break;
      case "o":
        s += "pdis1-", a += "/en.html", t = !1;
        break;
      case "t":
        s += "pdis2-", a += "/en.html", t = !1;
        break;
      case "e":
        s += "pub-elb-", a += "/en.html", t = !1
    }
    if (t) {
      switch (e.slice(2, 3)) {
        case "a":
          a += "australia/en";
          break;
        case "s":
          a += "asp/en";
          break;
        case "i":
          a += "investment/en";
          break;
        case "b":
          a += "businessevents/en";
          break;
        case "c":
          a += "corporate/en"
      }
      c || (a += ".html")
    } else switch (e.slice(2, 3)) {
      case "a":
        s += "aus";
        break;
      case "s":
        s += "asp";
        break;
      case "i":
        s += "investment";
        break;
      case "b":
        s += "be";
        break;
      case "c":
        s += "corp"
    }
    open(s + a, newtab);
  }
  window.close();
}

function SWCH(evf) {
  var newtab = evf.ctrlKey,
    a = prompt(
      "(a)uthor, author(l)b, publisher(1), publisher(2), dispatcher(o)ne, dispatcher(t)wo (e)lb");

  function e(e) {
    switch (e) {
      case "aus":
        return "australia";
      case "be":
        return "businessevents";
      case "corp":
        return "corporate";
      default:
        return e
    }
  }

  function t(e) {
    switch (e) {
      case "australia":
        return "aus";
      case "businessevents":
        return "be";
      case "corporate":
        return "corp";
      default:
        return e
    }
  }

  if (a) {
    thistab(function(actvtb) {
      var cref = new URL(actvtb.url);

      var c, o, r, n, s, i = ".tour-aus.aws.haylix.net";
      if (c = "http://" + cref.host.match(/^(\w+?-)/)[1], o = cref.href.match(
          /\/(\w\w([-_]\w\w)?)(\/|$|\?|\.html)/)[1].replace("-", "_"), cref.host.match(
          /pub-elb|pdis\d/)) r = cref.host.match(/(\pub-elb-|pdis\d-)(\w+?)\./)[2], r = e(r),
        n = cref.pathname.match(/\/(.+?)(\.html|$|\?)/)[1].split("/").slice(1).join("/") +
        ".html";
      else {
        var l = cref.href.match(/\/content\/(.+?)(\.html|$|\?)/)[1].split("/");
        r = l[0], n = l.slice(2).join("/") + ".html"
      }
      switch (a.toLowerCase().trim()) {
        case "a":
          s = c + "aut1" + i + ":4502/cf#/content/" + [r, o, n].join("/");
          break;
        case "l":
          s = c + "author" + i + "/cf#/content/" + [r, o, n].join("/");
          break;
        case "1":
          s = c + "pub1" + i + ":4503/content/" + [r, o, n].join("/");
          break;
        case "2":
          s = c + "pub2" + i + ":4503/content/" + [r, o, n].join("/");
          break;
        case "o":
          s = c + "pdis1-" + t(r) + i + ["", o.replace("_", "-"), n].join("/");
          break;
        case "t":
          s = c + "pdis2-" + t(r) + i + ["", o.replace("_", "-"), n].join("/");
          break;
        case "e":
          s = c + "pub-elb-" + t(r) + i + ["", o.replace("_", "-"), n].join("/")
      }
      open(s, newtab);
    });
  }
  window.close();
}

function RPR(evf) {
  var e = prompt("(a)ustralia, aussie(s)pecialist, (i)nvestment, (b)usinessevents, (c)orporate");
  if (e) {
    switch (e) {
      case "a":
        e = "australia";
        break;
      case "s":
        e = "asp";
        break;
      case "i":
        e = "investment";
        break;
      case "b":
        e = "businessevents";
        break;
      case "c":
        e = "corporate"
    }
    thistab(function(tablis) {
      bg.addRPRtab(tablis.id, e);
    })
  } else {
    thistab(function(tablis) {
      bg.remRPRtab(tablis.id);
    })
  }
  window.close();
}

function REG() {
  chrome.tabs.executeScript({
    file: "md5.js"
  }, function() {
    chrome.tabs.executeScript({
      code: "var scr=document.createElement(\"script\");scr.id=\"REGscrtag\";scr.innerText='" +
        "document.getElementById(\"REGscrtag\").remove();document.getElementById(" +
        "\"register-submit\").click();';document.documentElement.appendChild(scr);"
    });
    window.close();
  });
}

function REG1() {
  chrome.tabs.executeScript({
    file: "md5.js"
  });
  window.close();
}

function LOG() {
  var x = prompt("Enter a Username (Comma/space separated password optional)").split(/[, ]/);
  x[1] = x[1] ? x[1] : "Welcome1";
  chrome.tabs.executeScript({
    code: "document.getElementById('j_username').value='" + x[0] +
      "'; document.getElementsByName('j_password')[0].value = '" + x[1] +
      "'; document.getElementById('usersignin').click();"
  });
  window.close();
}

function MOS() {
  thistab(function(t) {
    var n = t.index;
    chrome.tabs.executeScript({
      code: "var z=[];for(x of document.querySelectorAll(" +
        "'.mosaic .line-through-container-biline > a.type-anchor-title:not([href=\"#\"])" +
        ",.sitemap a:not([href=\"#\"])')){z.push(x.href);}z;"
    }, function(resura) {
      for (x of resura[0]) {
        n = Math.round(n + 1);
        open(x, true, n);
      }
      window.close();
    });
  });
}

function DUP() {
  thistab(function(t) {
    var n = t.index,
      ur = t.url;
    locs = ["en", "en-gb", "en-us", "en-ca", "en-in", "en-my", "en-sg", "id-id", "en-hk",
      "en-nz", "en-ie", "zh-hk", "ja-jp", "ko-kr", "pt-br", "de-de", "fr-fr", "it-it",
      "es-cl", "zh-cn"
    ];
    for (c of locs) {
      n = Math.round(n + 1);
      ur.match("/content/") && (c = c.replace("-", "_"));
      open(ur.replace(/\/\w\w([-_]\w\w)?(\/|.html|$)/, "/" + c + "$2"), true, n);
    };
  });
  window.close();
}

function DEC() {
  thistab(function(ta) {
    open(ta.url + "?" + Math.random(), false);
  });
  window.close();
}

function IDEC() {
  chrome.tabs.executeScript({
    code: "for(i of document.getElementsByTagName('img')){i.src += '?' + Math.random();}" +
      "for(i of document.querySelectorAll(\"[style*='url']\")){i.style.cssText=" +
      "i.style.cssText.replace(/url\\(\"(.*?)\"\\)/,'url(\"$1?'+Math.random()+'\")')}"
  });
  window.close();
}

function DL(evf) {
  var low = evf.ctrlKey ? "500px" : "0px";
  chrome.tabs.executeScript({
    code: "var scr = document.createElement('script');scr.id=\"DLscrtag\";scr.innerText='" +
      "document.getElementById(\"DLscrtag\").remove();var thetext;if(window." +
      "dataLayer_Event==undefined){thetext=\"No dataLayer_Event defined.\"}else{thetext=" +
      "JSON.stringify(dataLayer_Event,0,1)};var div=document.createElement(\"pre\");div." +
      "innerText=thetext;div.style.cssText=\"position:fixed;left:25%;top:" + low +
      ";width:50%;overflow:hidden;\"+\"z-index:999999;padding:0.5em;background:#adf;border:2px solid blue;" +
      "border-radius:4px;\";document.documentElement.appendChild(div);div.onclick=function(e)" +
      "{e.stopPropagation()};document.addEventListener(\"click\",function(){div.remove();}" +
      ",{once:true});';document.documentElement.appendChild(scr);"
  });
  window.close();
}

function DLR(evf) {
  var myid,
    low = evf.ctrlKey ? "500px" : "0px";
  thistab(function(tb) {
    myid = tb.id
    if (!bg.haltingtabs[myid]) {
      bg.addDLRTab(myid);
      chrome.tabs.executeScript({
        code: "var scr=document.createElement(\"script\");scr.id=\"DLRscrtag\",scr.innerText='" +
          "document.getElementById(\"DLRscrtag\").remove();function" +
          " oncl(){void 0==window.dataLayer_Event?div.innerText=\"No dataLayer_Event defined.\":" +
          "div.innerText=JSON.stringify(dataLayer_Event,0,1)}var div=document.createElement(\"pre\");" +
          "oncl(),div.id=\"DLRtag\",div.style.cssText=\"position:fixed;left:25%;top:" + low +
          ";width:50%;overflow:hidden;z-index:999999;padding:0.5em;background:#adf;border:2px solid blue;" +
          "border-radius:4px;\",document.documentElement.appendChild(div),div.onclick=function(e)" +
          "{e.stopPropagation()};document.addEventListener(\"click\",oncl)'," +
          "document.documentElement.appendChild(scr);"
      });
    } else {
      bg.remDLRTab(myid);
      chrome.tabs.executeScript({
        code: "var scr=document.createElement(\"script\");scr.id=\"DLRscrtag\",scr.innerText='" +
          "document.removeEventListener(\"click\",oncl);document.getElementById(\"DLRscrtag\")" +
          ".remove();';document.documentElement.appendChild(scr);document.getElementById(\"DLRtag\").remove();"
      })
    }
    window.close();
  })
}

function GTO() {
  var num;
  chrome.tabs.executeScript({
    code: "var scr=document.createElement(\"script\");scr.id=\"GTOscrtag\";scr.innerText='" +
      "var gtotag=document.createElement(\"input\");document.documentElement.appendChild(gtotag);" +
      "gtotag.type=\"hidden\";gtotag.id=\"GTOtag\";GTOwin=function(){var n = $(\\'iframe[src^=\"/content/\"]\\')" +
      "[0],o = $(\"#ScormContent\")[0];return void 0 !== o ? o.contentWindow : void 0 !== n ?" +
      " (o = n.contentWindow.$(\"#ScormContent\")[0], void 0 !== o ? o.contentWindow : " +
      "n.contentWindow) : window}();document.getElementById(\"GTOscrtag\").remove();" +
      "gtotag.value=GTOwin.cpInfoSlideCount+\",\"+GTOwin.cpInfoCurrentSlide;';document.documentElement.appendChild(scr);"
  }, function() {
    chrome.tabs.executeScript({
      code: "document.getElementById(\"GTOtag\").value"
    }, function(res) {
      res = res[0].split(',');
      num = Number(prompt(res[0], res[1])) - 1;
      chrome.tabs.executeScript({
        code: "document.getElementById(\"GTOtag\").remove();" +
          "var scr=document.createElement(\"script\");scr.id=\"GTOscrtag\",scr.innerText='" +
          "document.getElementById(\"GTOscrtag\").remove();GTOwin.cpCmndGotoSlide = " +
          num + ";';document.documentElement.appendChild(scr);"
      });
      window.close();
    });
  });
}

function TRK() {
  chrome.tabs.executeScript({
    code: "var scr=document.createElement(\"script\");scr.id=\"TRKscrtag\";scr.innerText='" +
      "document.getElementById(\"TRKscrtag\").remove();var trktag=document.createElement(\"span\");" +
      "trktag.id=\"TRKtag\";trktag.style.cssText=\"position:fixed;top:300px;left:2em;z-index:1000;\";" +
      "document.documentElement.appendChild(trktag);" +
      "TRKwin=function(){var n=$(\\'iframe[src^=\"/content/\"]\\')[0],o=$(\"#ScormContent\")[0]" +
      ";return void 0!==o?o.contentWindow:void 0!==n?(o=n.contentWindow.$(\"#ScormContent\")" +
      "[0],void 0!==o?o.contentWindow:n.contentWindow): window}();" +
      "!function TRKloop(){trktag.innerText=TRKwin.cpInfoCurrentSlide" +
      " + \" of \" + TRKwin.cpInfoSlideCount;window.setTimeout(TRKloop,1e3)}();" +
      "';document.documentElement.appendChild(scr);"
  });
  window.close();
}

function MOD() {
  chrome.tabs.executeScript({
    code: "var scr = document.createElement(\"script\");scr.id=\"MODscrtag\";scr.innerText='" +
      "document.getElementById(\"MODscrtag\").remove();function modgo(n){MODwin.cpCmndGotoSlide=n-1}" +
      "var MODwin=function(){var n=$(\\'iframe[src^=\"/content/\"]\\')[0],o=$(\"#ScormContent\")[0]" +
      ";return void 0!==o?o.contentWindow:void 0!==n?(o=n.contentWindow.$(\"#ScormContent\")" +
      "[0],void 0!==o?o.contentWindow:n.contentWindow): window}();" + //Quadruple backslashes.
      "switch(MODwin.location.href.match(/(\\\\w\\\\w_){2}\\\\w+?_\\\\w+?(?=_|\\\\/|\\\\.)/)[0].split(\"_\")[3])" +
      "{case \"mod3\":modgo(MODwin.cpInfoSlideCount - 6);break;default:modgo(MODwin.cpInfoSlideCount - 4)}';" +
      "document.documentElement.appendChild(scr);"
  });
  window.close();
}

function MUDA() {
  chrome.tabs.executeScript({
    code: "var scr = document.createElement(\"script\");scr.id=\"MUDAscrtag\";scr.innerText='" +
      "document.getElementById(\"MUDAscrtag\").remove();" +
      "var o=[\"_core_mod1\",\"_core_mod2\",\"_core_mod3\",\"_sto_vic\",\"_sto_nsw\"]," +
      "f=location.href.match(/\\\\/(\\\\w\\\\w([-_]\\\\w\\\\w)?)(\\\\/|(\\\\.html)|$)/)[1],e=f.split(/[-_]/);" +
      "e=((e[0]==\"es\"&&e[1]==\"cl\")||(e[0]==\"pt\"&&e[1]==\"br\"))?e:e.reverse();e=e.join(\"_\")" +
      ".replace(\"gb\",\"uk\");for(m in o)if(o.hasOwnProperty(m))" +
      "$.ajax({url:\"/bin/asp/trainingModule\",type:\"POST\",cache:!1,dataType:\"json\"," +
      "data:{isComplete:true,moduleId:e+o[m],locale:f}});';document.documentElement.appendChild(scr);"
  });
  window.close();
}
