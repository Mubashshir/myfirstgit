if ("undefined" != typeof _izooto) throw Error("Duplicate iZooto Script Found !!");
var _izooto = {
    client: 2545,
    sourceOrigin: "https://anotherurl.izooto.com",
    webPushId: "web.com.izooto.user1375",
    webServiceUrl: "https://safari.izooto.com/services/2366/safari/2545",
    mobileAllowed: 1,
    desktopAllowed: 1,
    domainRoot: ".",
    setEnr: 1,
    izootoStatus: 1
};
_izooto.isSubDomain = checkSubDomain();
_izooto.debug = 0;
_izooto.locationProtocol = document.location.protocol;
_izooto.setEnrUrl = _izooto.locationProtocol + "//izooto.m-bazaar.in/index.php";
_izooto.sendEnrUrl = _izooto.locationProtocol + "//izooto.m-bazaar.in/api.php";
_izooto.bkey = 0;
_izooto.bkeySent = 0;
_izooto.flag = 0;
_izooto.pluginStatus = 0;

_izooto.isLocalStorage = "localStorage" in window && null !== window.localStorage;
_izooto.serviceWorker = _izooto.domainRoot + "/service-worker.js";
_izooto.manifest = _izooto.domainRoot + "/manifest.json";

_izooto.dialogDesign = '<style>.iz_container{text-align: center; display:table-cell; vertical-align:middle;}.iz_overlay{position:fixed;top:0px;left:0px;width:100%;height:100%;background:rgba(0, 0, 0, 0.32); z-index: 9999999;}.iz_content{position:absolute;top:50%;left:50%;width:25%;transform:translate(-50%,-50%);background:#fff;border-radius:10px 10px 0px 0px;border-radius:10px;text-align: center; display:inline-block;}.iz_btn{margin-top: 3%; background: #6FCBCF; color: #fff; margin-bottom: 4%; padding: 10px; border-radius: 4px; width: 140px; border: none; font-size: 13px; letter-spacing: 1px; box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12); transition: all .3s ease-out; cursor: pointer;}.iz_btn:hover{box-shadow:0 5px 11px 0 rgba(0,0,0,0.18),0 4px 15px 0 rgba(0,0,0,0.15);cursor:pointer;}.iz_head_txt{font-size: 21px;}.iz_top{padding-bottom: 10px;border-radius:10px 10px 0px 0px;background: #5D5D5D; color: #fff; padding: 30px;}.iz_txt{margin-top: 15px; font-size: 14px; color: #FF9595;}@media only screen and (max-width: 600px) and (min-height: 300px){.iz_content{background: #fff none repeat scroll 0 0; border-radius: 10px; display: inline-block; left: 50%; position: absolute; text-align: center; top: 50%; transform: translate(-50%, -50%); width: 90%!important;}.iz_head_txt{font-size: 120%;}.iz_txt{color: #ff9595; font-size: 100%; margin-top: 15px;}}@media only screen and (max-width: 800px){.iz_content{background: #fff none repeat scroll 0 0; border-radius: 10px; display: inline-block; left: 50%; position: absolute; text-align: center; top: 50%; transform: translate(-EUNITNO50%, -50%); width: 85%;}.iz_head_txt{font-size: 120%;}.iz_txt{color: #ff9595; font-size: 100%; margin-top: 15px;}}</style><div class="iz_overlay"> <div class="iz_container"> <div class="iz_content"> <center> <div class="iz_top"> <div class="iz_head_txt">Thank you for subscribing to push notifications!</div><div style="text-align: right !important;position: absolute !important;    right: 0px !important;margin-top: 5px !important;"><a href="https://www.izooto.com" target="_blank" style="text-decoration: none !important;cursor: pointer !important;color:#A5A0A0 !important;font-size: 11px !important;"> Powered by <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAYCAYAAACmwZ5SAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTE1MDUwMjgyMzA2MTFFNkI0ODNCNDlGQjZFNUU4OTAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTE1MDUwMjkyMzA2MTFFNkI0ODNCNDlGQjZFNUU4OTAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxMTUwNTAyNjIzMDYxMUU2QjQ4M0I0OUZCNkU1RTg5MCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxMTUwNTAyNzIzMDYxMUU2QjQ4M0I0OUZCNkU1RTg5MCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqVgsJUAAAL5SURBVHja7JdNSFRRFMfv5GTfSJSVmWOKZWlBlraoRRS5KcLAFkaL6BMJImsREUWLwEWFChIaEbiswEgwiFZSC1GJpBb5gURlSlpGKePMODOv/4X/k9PtPYfaCM47+OPOPfecM553z33njs+yLJVMMk8lmXgJJ1vCV8CZuZywz3hp2ZNLoDYZdvgDxxrQAYrm+g6PgHTD5iKomyHGQnAfjPNIbAQBEDcebBi8pN3siU5YUAw+WX9LHygwbG0Cwm6vNbNUusT4V06D2v/x9TlcPPygCRxzeD6V4J6D/jqrQ6/tAflgCoyCarAVDIPN4Cd9skAeiIAujlJywHpWxmuOdkV9A0vAYdBi+GgmGTOaaIclpS67VGLYpYBWssxYKwJh+gWEvtqIOcHqcFv/BXZzbchYu0Z9vaH/DnaYebklewK0OSQ7AjIM27VifafQF4Ip6o8K/WXqgqAK3BT+q8BBMT8Pbot5JjgEBjmvAbm00/KVMWs5jyVKeA146rKzzVZ8UsVDA8qKh90SLhZ6eyceGN/xg/oKoXtEXR14xs+lYr2Bulucd3BuV5Qt+4RPJ3V/5Gi2pVegzNB9VrGxA5GP5SfD/cWp4f7tKtxfoqypYbN3K3E+m0EGaAOnHN4RWt4JXQ/HAM+t4hvdlnaOmRwXcUxxaatmfNczPGjsamM8MqRCPflpwW5lhd7nWqHewuzgG7wNRutsn3XCPhXs4uco2A9WghzaafsX0xVjWStAtugMZaLEH4PlIA8MUHeEMdo5P855F+cNjFkg3h0zlnSMRs9BltZFvlxQSLAi1FeEZLdotk2+TUHC9bZPukj4bIK2VA78YMxh7Qnj6XM87rDeIv7Pq0K/mA866uDTZCbsNzb8HEgF9dOa6Ijy+Zc+RA2vZjvoxn0Ff9PVpFvPDZZzK7gD5rPUF4jYMTDAVlHA79rEFtIJ7orLj24tVbzEBHnraxCxqhk/je1Kx97A3wF6nKBPY6Kblvfz0EvYS9hL2EvYS3gW5bcAAwBYly8ZviBp+QAAAABJRU5ErkJggg==" style="max-width: 100% !important; height: 21px !important;vertical-align: middle !important; padding-right: 3px !important;"></a></div></div><div class="iz_btn" onclick="izOpenPopup();">CLOSE</div> </center> </div></div></div>';
_izooto.unid = izSetSession();
try {
    1 == is_wp && (_izooto.pluginStatus = 1, _izooto.serviceWorker = _izooto.domainRoot + "/?izooto=sw")
} catch (a) {}
"https:" != _izooto.locationProtocol || 1 != _izooto.isChrome && 1 != _izooto.isFirefox || 1 != _izooto.isSubDomain ? 1 == _izooto.setEnr && (izSetEnr(), _log("izooto:: enr called")) : _log("izooto:: No Enr");

function izGetSessionId() {
    return "iz-" + Math.random().toString(36).substr(2, 16) + (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
}

function izSetSession() {
    var a = "";
    return a = izGetSessionId()
}



function _log(a) {
    1 == _izooto.debug && console.log(a)
}

function izSetEnr() {
    try {
        iframe = document.createElement("IFRAME"), iframe.setAttribute("src", _izooto.setEnrUrl + "?s=1&pid=" + _izooto.client + "&izid=" + _izooto.unid + "&btype=" + _izooto.browser + "&dtype=" + _izooto.deviceType), iframe.style.width = "0px", iframe.style.height = "0px", iframe.style.border = "0px", iframe.setAttribute("visibility", "hidden"), iframe.style.display = "none", null != document.body ? document.body.appendChild(iframe) : document.head.appendChild(iframe)
    } catch (a) {
        _log("izooto:: unable to set ENR " + a)
    }
}

function sendEnrHit(a, b, c) {
    console.log("Enrhit  , "+izGetStorage("iztoken"));
    var d = _izooto.unid;
    try {
        var f = document.createElement("img");
        f.style.width = "0px";
        f.style.height = "0px";
        "https:" == _izooto.locationProtocol ? ht = 1 : ht = 0;
        f.src = void 0 === c ? _izooto.sendEnrUrl + "?s=0&pid=" + _izooto.client + "&" + a + "=" + b + "&ht=" + ht + "&izid=" + d + "&btype=" + _izooto.browser + "&dtype=" + _izooto.deviceType : _izooto.sendEnrUrl + "?s=0&pid=" + _izooto.client + "&" + a + "=" + b + "&ht=" + ht + "&izid=" + d + "&btype=" + _izooto.browser + "&bKey=" + c + "&dtype=" + _izooto.deviceType;
        _log(f.src)
    } catch (e) {
        _log("izooto:: " +
            e)
    }
}

function checkSubDomain() {
    var a = window.location.href,
        b = 0,
        b = a.substr(a.lastIndexOf("?") + 1);
    return "action=prompt" == b ? 1 : 0
}



function izSetCookie(a, b) {
    var c = new Date;
    c.setTime(c.getTime() + 432E8);
    c = "expires=" + c.toUTCString();
    document.cookie = a + "=" + b + "; " + c
}

function izDelCookie(a, b) {
    document.cookie = a + "=" + b + "; expires=Thu, 2 Aug 1991 20:47:11 UTC;"
}

function izDelStorage(a) {
    localStorage.removeItem(a)
}

function izGetCookie(a) {
    a += "=";
    var b = document.cookie.split(";"),
        c, d, f = b.length;
    for (c = 0; c < f; c += 1) {
        for (d = b[c];
            " " === d.charAt(0);) d = d.substring(1);
        if (-1 !== d.indexOf(a)) return d.substring(a.length, d.length)
    }
    return ""
}

function izSetStorage(a, b) {
    _izooto.isLocalStorage && localStorage.setItem(a, b);
    izSetCookie(a, b)
}

function izGetStorage(a) {
    return localStorage.getItem(a) || izGetCookie(a) ? localStorage.getItem(a) || izGetCookie(a) : ""
}



function izClosePopWindow() {
    if (self == top) try {
        setTimeout(function() {
            window.opener.postMessage(JSON.stringify({
                k: "popclose",
                v: 1
            }), "*");
            window.close()
        }, 200)
    } catch (a) {
        log("iZooto::unable to close popup")
    }
}

function izOpenDialog() {
    var a = document.getElementsByTagName("body")[0],
        b = document.createElement("div");
    b.setAttribute("id", "middle-box");
    b.innerHTML = _izooto.dialogDesign;
    a.appendChild(b);
    izSetStorage("izState", 2)
}



function izSubFrame() {
    console.log("IZsubframe  , "+izGetStorage("iztoken"));
    try {
        izFrame = document.createElement("IFRAME"), 
        izFrame.setAttribute("src", "http://localhost:8080/#/Login"), 
        izFrame.setAttribute("id", "izSubFrame"), 
        izFrame.style.width = "0px", 
        izFrame.style.height = "0px", 
        izFrame.style.border = "0px", 
        izFrame.setAttribute("visibility", "hidden"), 
        izFrame.style.display = "none", 
        null != document.body ? document.body.appendChild(izFrame) : document.head.appendChild(izFrame), 
        _log("izSubFrame set")
    } catch (a) {
        _log("izooto:: unable to subFrame" + a)
    }
}

function izCloseDialog() {
    try {
        document.getElementById("middle-box").remove(), sendEnrHit("msgclose", 1)
    } catch (a) {
        _log("Error-Removing-Div" + a)
    }
}

function izOpenPopup() {
    izCloseDialog();
    window.open(_izooto.sourceOrigin + "?action=prompt", "iZooto Subscription", "scrollbars=yes, width=200, height=200, top=" + ((window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height) / 2 - 100 + (void 0 != window.screenTop ? window.screenTop : screen.top)) + ", left=" + ((window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width) / 2 - 100 + (void 0 !=
        window.screenLeft ? window.screenLeft : screen.left)))
}




function izootoSubscriber(a) {
    console.log("htt  , "+_izooto.locationProtocol)
    if ("http:" === _izooto.locationProtocol) {
        console.log("IN htt  , "+_izooto.locationProtocol)
        if ("" != izGetStorage("iztoken")) {
            console.log("aaa  , "+izGetStorage("iztoken"));
            sendEnrHit("already_granted", 1, izGetStorage("iztoken"));
            return
        }
        // window.onmessage = function(a) {
        //     console.log("bbb  , "+izGetStorage("iztoken")+" , a: "+JSON.stringify(a));
        //     -1 < _izooto.sourceOrigin.indexOf(a.origin) && a.data && (a = JSON.parse(a.data), "allowed" == a.k ? (izOpenDialog(), izSetStorage("izState", 1), izSetStorage("izid", _izooto.unid), sendEnrHit(a.k, a.v)) : void 0 != a.bkey ? (izSetStorage("iztoken", a.bkey), sendEnrHit(a.k, a.v, a.bkey)) : "popclose" == a.k ? izSetStorage("izState", 3) : ("bKey" ==
        //         a.k && izSetStorage("iztoken", a.v), sendEnrHit(a.k, a.v)))
        // };
        izGetStorage("izState");
        izGetStorage("izid");
        izGetStorage("iztoken");

        izSubFrame()
    }
    
}

function initIzooto() {
   izootoSubscriber("chrome")
}

initIzooto();