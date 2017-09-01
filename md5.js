function a(a, e) {
  var i = a[0],
    c = a[1],
    l = a[2],
    m = a[3];
  i = n(i, c, l, m, e[0], 7, -680876936), m = n(m, i, c, l, e[1], 12, -389564586), l = n(l, m, i, c,
      e[2], 17, 606105819), c = n(c, l, m, i, e[3], 22, -1044525330), i = n(i, c, l, m, e[4], 7, -
      176418897), m = n(m, i, c, l, e[5], 12, 1200080426), l = n(l, m, i, c, e[6], 17, -1473231341),
    c = n(c, l, m, i, e[7], 22, -45705983), i = n(i, c, l, m, e[8], 7, 1770035416), m = n(m, i, c,
      l, e[9], 12, -1958414417), l = n(l, m, i, c, e[10], 17, -42063), c = n(c, l, m, i, e[11], 22, -
      1990404162), i = n(i, c, l, m, e[12], 7, 1804603682), m = n(m, i, c, l, e[13], 12, -40341101),
    l = n(l, m, i, c, e[14], 17, -1502002290), c = n(c, l, m, i, e[15], 22, 1236535329), i = t(i, c,
      l, m, e[1], 5, -165796510), m = t(m, i, c, l, e[6], 9, -1069501632), l = t(l, m, i, c, e[11],
      14, 643717713), c = t(c, l, m, i, e[0], 20, -373897302), i = t(i, c, l, m, e[5], 5, -
      701558691), m = t(m, i, c, l, e[10], 9, 38016083), l = t(l, m, i, c, e[15], 14, -660478335),
    c = t(c, l, m, i, e[4], 20, -405537848), i = t(i, c, l, m, e[9], 5, 568446438), m = t(m, i, c,
      l, e[14], 9, -1019803690), l = t(l, m, i, c, e[3], 14, -187363961), c = t(c, l, m, i, e[8],
      20, 1163531501), i = t(i, c, l, m, e[13], 5, -1444681467), m = t(m, i, c, l, e[2], 9, -
      51403784), l = t(l, m, i, c, e[7], 14, 1735328473), c = t(c, l, m, i, e[12], 20, -1926607734),
    i = r(i, c, l, m, e[5], 4, -378558), m = r(m, i, c, l, e[8], 11, -2022574463), l = r(l, m, i, c,
      e[11], 16, 1839030562), c = r(c, l, m, i, e[14], 23, -35309556), i = r(i, c, l, m, e[1], 4, -
      1530992060), m = r(m, i, c, l, e[4], 11, 1272893353), l = r(l, m, i, c, e[7], 16, -155497632),
    c = r(c, l, m, i, e[10], 23, -1094730640), i = r(i, c, l, m, e[13], 4, 681279174), m = r(m, i,
      c, l, e[0], 11, -358537222), l = r(l, m, i, c, e[3], 16, -722521979), c = r(c, l, m, i, e[6],
      23, 76029189), i = r(i, c, l, m, e[9], 4, -640364487), m = r(m, i, c, l, e[12], 11, -
      421815835), l = r(l, m, i, c, e[15], 16, 530742520), c = r(c, l, m, i, e[2], 23, -995338651),
    i = o(i, c, l, m, e[0], 6, -198630844), m = o(m, i, c, l, e[7], 10, 1126891415), l = o(l, m, i,
      c, e[14], 15, -1416354905), c = o(c, l, m, i, e[5], 21, -57434055), i = o(i, c, l, m, e[12],
      6, 1700485571), m = o(m, i, c, l, e[3], 10, -1894986606), l = o(l, m, i, c, e[10], 15, -
      1051523), c = o(c, l, m, i, e[1], 21, -2054922799), i = o(i, c, l, m, e[8], 6, 1873313359), m =
    o(m, i, c, l, e[15], 10, -30611744), l = o(l, m, i, c, e[6], 15, -1560198380), c = o(c, l, m, i,
      e[13], 21, 1309151649), i = o(i, c, l, m, e[4], 6, -145523070), m = o(m, i, c, l, e[11], 10, -
      1120210379), l = o(l, m, i, c, e[2], 15, 718787259), c = o(c, l, m, i, e[9], 21, -343485551),
    a[0] = v(i, a[0]), a[1] = v(c, a[1]), a[2] = v(l, a[2]), a[3] = v(m, a[3])
}

function e(a, e, n, t, r, o) {
  return e = v(v(e, a), v(t, o)), v(e << r | e >>> 32 - r, n)
}

function n(a, n, t, r, o, i, c) {
  return e(n & t | ~n & r, a, n, o, i, c)
}

function t(a, n, t, r, o, i, c) {
  return e(n & r | t & ~r, a, n, o, i, c)
}

function r(a, n, t, r, o, i, c) {
  return e(n ^ t ^ r, a, n, o, i, c)
}

function o(a, n, t, r, o, i, c) {
  return e(t ^ (n | ~r), a, n, o, i, c)
}

function i(e) {
  txt = "";
  var n, t = e.length,
    r = [1732584193, -271733879, -1732584194, 271733878];
  for (n = 64; n <= e.length; n += 64) a(r, c(e.substring(n - 64, n)));
  e = e.substring(n - 64);
  var o = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (n = 0; n < e.length; n++) o[n >> 2] |= e.charCodeAt(n) << (n % 4 << 3);
  if (o[n >> 2] |= 128 << (n % 4 << 3), n > 55)
    for (a(r, o), n = 0; 16 > n; n++) o[n] = 0;
  return o[14] = 8 * t, a(r, o), r
}

function c(a) {
  var e, n = [];
  for (e = 0; 64 > e; e += 4) n[e >> 2] = a.charCodeAt(e) + (a.charCodeAt(e + 1) << 8) + (a.charCodeAt(
    e + 2) << 16) + (a.charCodeAt(e + 3) << 24);
  return n
}

function l(a) {
  for (var e = "", n = 0; 4 > n; n++) e += h[a >> 8 * n + 4 & 15] + h[a >> 8 * n & 15];
  return e
}

function m(a) {
  for (var e = 0; e < a.length; e++) a[e] = l(a[e]);
  return a.join("")
}

function u(a) {
  return m(i(a))
}

function v(a, e) {
  return a + e & 4294967295
}

function v(a, e) {
  var n = (65535 & a) + (65535 & e),
    t = (a >> 16) + (e >> 16) + (n >> 16);
  return t << 16 | 65535 & n
}

function f() {
  return String.fromCharCode(26 * Math.random() + 97)
}
var h = "0123456789abcdef".split("");
"5d41402abc4b2a76b9719d911017c592" != u("hello");
var dgn = document.getElementsByName.bind(document),
  dq = document.querySelectorAll.bind(document);
var d = f() + f() + f() + f(),
  p = window.location.href.match(/\/\w\w([-_]\w\w)?\//)[0].slice(1, -1).split(/[-_]/);
p[1] = p[1] || p[0];
var s = window.location.href.replace(/https?\:\/\//, "").slice(0, 3),
  g = {
    gb: "A12BC",
    us: "12345",
    ca: "12345",
    my: "12345",
    id: "12345",
    it: "12345",
    fr: "12345",
    de: "12345",
    nz: "1234"
  }[p[1]] || "123456";
p[1] = p[1] || p[0];
for (x of dq("#registration-form [type='text']")) {
  x.value = "TEST";
}
dgn("fname")[0].value = "TEST " + p[1] + s;
dgn("birthdayday")[0].click();
dgn("birthdayday")[0].value = "12";
dgn("birthdaymonth")[0].value = "12";
dgn("birthdayyear")[0].value = "1212";
dgn("busprofile")[0].value = "1";
dgn("zip")[0].value = g;
dgn("country")[0].value = p[1] == 'en' ? 'XX' : p[1].toUpperCase();
try { //China has no langselect
  dgn("language")[0].add(new Option("Lang", "zh" == p[0] ? "8" : "1", true, true));
} catch (e) {}
dgn("state")[0].add(new Option("Buenos Aires", "8", true, true));
dgn("state")[0].value = "cn" == p[1] ? "1360" : "8";
dgn("web")[0].value = "www.TEST.com";
dgn("email")[0].value = ("testeratta+" + d + "@gmail.com");
try { //China has no verify email field.
  dgn("verifyemail")[0].value = ("testeratta+" + d + "@gmail.com");
} catch (e) {}
dgn("howmany")[0].value = "1";
dgn("howmanytimes")[0].value = "1";
dgn("numberofbookings")[0].value = "1";
for (x of dgn("travelstandard")) {
  x.checked = true;
}
for (x of dgn("custexp")) {
  x.checked = true;
}
dgn("username")[0].value = p[1] + s + d;
dgn("pwd")[0].value = "Welcome1";
dgn("pwd1")[0].value = "Welcome1";
dgn("agreement")[0].checked = true;
dq("fieldset:nth-child(7) a")[0].click();
dgn("captcha")[0].value = u(document.getElementById("cq_captchakey").value + Math.floor((new Date).getTime() /
  6e4)).substr(1, 5);
