!function(e,i,o){"undefined"!=typeof module&&module.exports?module.exports=o():"function"==typeof define&&define.amd?define("bowser",o):e.bowser=o()}(this,0,function(){function e(e){function i(i){var o=e.match(i);return o&&o.length>1&&o[1]||""}var o,s=i(/(ipod|iphone|ipad)/i).toLowerCase(),r=!/like android/i.test(e)&&/android/i.test(e),t=/nexus\s*[0-6]\s*/i.test(e),a=!t&&/nexus\s*[0-9]+/i.test(e),d=/CrOS/.test(e),m=/silk/i.test(e),v=/sailfish/i.test(e),p=/tizen/i.test(e),l=/(web|hpw)os/i.test(e),f=/windows phone/i.test(e),c=(/SamsungBrowser/i.test(e),!f&&/windows/i.test(e)),u=!s&&!m&&/macintosh/i.test(e),h=!r&&!v&&!p&&!l&&/linux/i.test(e),b=i(/edge\/(\d+(\.\d+)?)/i),w=i(/version\/(\d+(\.\d+)?)/i),g=/tablet/i.test(e),k=!g&&/[^-]mobi/i.test(e),y=/xbox/i.test(e);/opera/i.test(e)?o={name:"Opera",opera:n,version:w||i(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)}:/opr|opios/i.test(e)?o={name:"Opera",opera:n,version:i(/(?:opr|opios)[\s\/](\d+(\.\d+)?)/i)||w}:/SamsungBrowser/i.test(e)?o={name:"Samsung Internet for Android",samsungBrowser:n,version:w||i(/(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i)}:/coast/i.test(e)?o={name:"Opera Coast",coast:n,version:w||i(/(?:coast)[\s\/](\d+(\.\d+)?)/i)}:/yabrowser/i.test(e)?o={name:"Yandex Browser",yandexbrowser:n,version:w||i(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)}:/ucbrowser/i.test(e)?o={name:"UC Browser",ucbrowser:n,version:i(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i)}:/mxios/i.test(e)?o={name:"Maxthon",maxthon:n,version:i(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)}:/epiphany/i.test(e)?o={name:"Epiphany",epiphany:n,version:i(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i)}:/puffin/i.test(e)?o={name:"Puffin",puffin:n,version:i(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i)}:/sleipnir/i.test(e)?o={name:"Sleipnir",sleipnir:n,version:i(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i)}:/k-meleon/i.test(e)?o={name:"K-Meleon",kMeleon:n,version:i(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i)}:f?(o={name:"Windows Phone",windowsphone:n},b?(o.msedge=n,o.version=b):(o.msie=n,o.version=i(/iemobile\/(\d+(\.\d+)?)/i))):/msie|trident/i.test(e)?o={name:"Internet Explorer",msie:n,version:i(/(?:msie |rv:)(\d+(\.\d+)?)/i)}:d?o={name:"Chrome",chromeos:n,chromeBook:n,chrome:n,version:i(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)}:/chrome.+? edge/i.test(e)?o={name:"Microsoft Edge",msedge:n,version:b}:/vivaldi/i.test(e)?o={name:"Vivaldi",vivaldi:n,version:i(/vivaldi\/(\d+(\.\d+)?)/i)||w}:v?o={name:"Sailfish",sailfish:n,version:i(/sailfish\s?browser\/(\d+(\.\d+)?)/i)}:/seamonkey\//i.test(e)?o={name:"SeaMonkey",seamonkey:n,version:i(/seamonkey\/(\d+(\.\d+)?)/i)}:/firefox|iceweasel|fxios/i.test(e)?(o={name:"Firefox",firefox:n,version:i(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)},/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(e)&&(o.firefoxos=n)):m?o={name:"Amazon Silk",silk:n,version:i(/silk\/(\d+(\.\d+)?)/i)}:/phantom/i.test(e)?o={name:"PhantomJS",phantom:n,version:i(/phantomjs\/(\d+(\.\d+)?)/i)}:/slimerjs/i.test(e)?o={name:"SlimerJS",slimer:n,version:i(/slimerjs\/(\d+(\.\d+)?)/i)}:/blackberry|\bbb\d+/i.test(e)||/rim\stablet/i.test(e)?o={name:"BlackBerry",blackberry:n,version:w||i(/blackberry[\d]+\/(\d+(\.\d+)?)/i)}:l?(o={name:"WebOS",webos:n,version:w||i(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)},/touchpad\//i.test(e)&&(o.touchpad=n)):/bada/i.test(e)?o={name:"Bada",bada:n,version:i(/dolfin\/(\d+(\.\d+)?)/i)}:p?o={name:"Tizen",tizen:n,version:i(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i)||w}:/qupzilla/i.test(e)?o={name:"QupZilla",qupzilla:n,version:i(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i)||w}:/chromium/i.test(e)?o={name:"Chromium",chromium:n,version:i(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i)||w}:/chrome|crios|crmo/i.test(e)?o={name:"Chrome",chrome:n,version:i(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)}:r?o={name:"Android",version:w}:/safari|applewebkit/i.test(e)?(o={name:"Safari",safari:n},w&&(o.version=w)):s?(o={name:"iphone"==s?"iPhone":"ipad"==s?"iPad":"iPod"},w&&(o.version=w)):o=/googlebot/i.test(e)?{name:"Googlebot",googlebot:n,version:i(/googlebot\/(\d+(\.\d+))/i)||w}:{name:i(/^(.*)\/(.*) /),version:function(i){var o=e.match(i);return o&&o.length>1&&o[2]||""}(/^(.*)\/(.*) /)},!o.msedge&&/(apple)?webkit/i.test(e)?(/(apple)?webkit\/537\.36/i.test(e)?(o.name=o.name||"Blink",o.blink=n):(o.name=o.name||"Webkit",o.webkit=n),!o.version&&w&&(o.version=w)):!o.opera&&/gecko\//i.test(e)&&(o.name=o.name||"Gecko",o.gecko=n,o.version=o.version||i(/gecko\/(\d+(\.\d+)?)/i)),o.windowsphone||o.msedge||!r&&!o.silk?o.windowsphone||o.msedge||!s?u?o.mac=n:y?o.xbox=n:c?o.windows=n:h&&(o.linux=n):(o[s]=n,o.ios=n):o.android=n;var x="";o.windowsphone?x=i(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i):s?x=(x=i(/os (\d+([_\s]\d+)*) like mac os x/i)).replace(/[_\s]/g,"."):r?x=i(/android[ \/-](\d+(\.\d+)*)/i):o.webos?x=i(/(?:web|hpw)os\/(\d+(\.\d+)*)/i):o.blackberry?x=i(/rim\stablet\sos\s(\d+(\.\d+)*)/i):o.bada?x=i(/bada\/(\d+(\.\d+)*)/i):o.tizen&&(x=i(/tizen[\/\s](\d+(\.\d+)*)/i)),x&&(o.osversion=x);var S=x.split(".")[0];return g||a||"ipad"==s||r&&(3==S||S>=4&&!k)||o.silk?o.tablet=n:(k||"iphone"==s||"ipod"==s||r||t||o.blackberry||o.webos||o.bada)&&(o.mobile=n),o.msedge||o.msie&&o.version>=10||o.yandexbrowser&&o.version>=15||o.vivaldi&&o.version>=1||o.chrome&&o.version>=20||o.samsungBrowser&&o.version>=4||o.firefox&&o.version>=20||o.safari&&o.version>=6||o.opera&&o.version>=10||o.ios&&o.osversion&&o.osversion.split(".")[0]>=6||o.blackberry&&o.version>=10.1||o.chromium&&o.version>=20?o.a=n:o.msie&&o.version<10||o.chrome&&o.version<20||o.firefox&&o.version<20||o.safari&&o.version<6||o.opera&&o.version<10||o.ios&&o.osversion&&o.osversion.split(".")[0]<6||o.chromium&&o.version<20?o.c=n:o.x=n,o}function i(e){return e.split(".").length}function o(e,i){var o,s=[];if(Array.prototype.map)return Array.prototype.map.call(e,i);for(o=0;o<e.length;o++)s.push(i(e[o]));return s}function s(e){for(var s=Math.max(i(e[0]),i(e[1])),r=o(e,function(e){var r=s-i(e);return e+=new Array(r+1).join(".0"),o(e.split("."),function(e){return new Array(20-e.length).join("0")+e}).reverse()});--s>=0;){if(r[0][s]>r[1][s])return 1;if(r[0][s]!==r[1][s])return-1;if(0===s)return 0}}function r(i,o,r){var n=t;"string"==typeof o&&(r=o,o=void 0),void 0===o&&(o=!1),r&&(n=e(r));var a=""+n.version;for(var d in i)if(i.hasOwnProperty(d)&&n[d]){if("string"!=typeof i[d])throw new Error("Browser version in the minVersion map should be a string: "+d+": "+String(i));return s([a,i[d]])<0}return o}var n=!0,t=e("undefined"!=typeof navigator?navigator.userAgent||"":"");return t.test=function(e){for(var i=0;i<e.length;++i){var o=e[i];if("string"==typeof o&&o in t)return!0}return!1},t.isUnsupportedBrowser=r,t.compareVersions=s,t.check=function(e,i,o){return!r(e,i,o)},t._detect=e,t});
//# sourceMappingURL=maps/bowser.js.map