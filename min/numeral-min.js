// numeral.js
// version : 1.3.3
// author : Adam Draper
// license : MIT
// http://adamwdraper.github.com/Numeral-js/
(function(){function s(e){this._n=e}function o(e,t,n){var r=Math.pow(10,t),i;i=(Math.round(e*r)/r).toFixed(t);if(n){var s=new RegExp("0{1,"+n+"}$");i=i.replace(s,"")}return i}function u(e,t){var n;t.indexOf("$")>-1?n=f(e,t):t.indexOf("%")>-1?n=l(e,t):t.indexOf(":")>-1?n=c(e,t):n=p(e,t);return n}function a(e,t){if(t.indexOf(":")>-1)e._n=h(t);else{var i=t;n[r].delimiters.decimal!=="."&&(t=t.replace(/\./g,"").replace(n[r].delimiters.decimal,"."));var s=new RegExp(n[r].abbreviations.thousand+"(?:\\)|(\\"+n[r].currency.symbol+")?(?:\\))?)?$"),o=new RegExp(n[r].abbreviations.million+"(?:\\)|(\\"+n[r].currency.symbol+")?(?:\\))?)?$"),u=["KB","MB","GB","TB","PB","EB","ZB","YB"],a=!1;for(var f=0;f<=u.length;f++){a=t.indexOf(u[f])>-1?Math.pow(1024,f+1):!1;if(a)break}e._n=(a?a:1)*(i.match(s)?1e3:1)*(i.match(o)?1e6:1)*(t.indexOf("%")>-1?.01:1)*Number((t.indexOf("(")>-1?"-":"")+t.replace(/[^0-9\.'-]+/g,""));e._n=a?Math.ceil(e._n):e._n}return e._n}function f(e,t){var i=t.indexOf("$")<=1?!0:!1,s="";if(t.indexOf(" $")>-1){s=" ";t=t.replace(" $","")}else if(t.indexOf("$ ")>-1){s=" ";t=t.replace("$ ","")}else t=t.replace("$","");var o=u(e,t);if(i)if(o.indexOf("(")>-1||o.indexOf("-")>-1){o=o.split("");o.splice(1,0,n[r].currency.symbol+s);o=o.join("")}else o=n[r].currency.symbol+s+o;else if(o.indexOf(")")>-1){o=o.split("");o.splice(-1,0,s+n[r].currency.symbol);o=o.join("")}else o=o+s+n[r].currency.symbol;return o}function l(e,t){var n="";if(t.indexOf(" %")>-1){n=" ";t=t.replace(" %","")}else t=t.replace("%","");e._n=e._n*100;var r=u(e,t);if(r.indexOf(")")>-1){r=r.split("");r.splice(-1,0,n+"%");r=r.join("")}else r=r+n+"%";return r}function c(e,t){var n=Math.floor(e._n/60/60),r=Math.floor((e._n-n*60*60)/60),i=Math.round(e._n-n*60*60-r*60);return n+":"+(r<10?"0"+r:r)+":"+(i<10?"0"+i:i)}function h(e){var t=e.split(":"),n=0;if(t.length===3){n+=Number(t[0])*60*60;n+=Number(t[1])*60;n+=Number(t[2])}else if(t.lenght===2){n+=Number(t[0])*60;n+=Number(t[1])}return Number(n)}function p(e,t){var i=!1,s="",u="",a="";if(t.indexOf("(")>-1){i=!0;t=t.slice(1,-1)}if(t.indexOf("a")>-1){if(t.indexOf(" a")>-1){s=" ";t=t.replace(" a","")}else t=t.replace("a","");if(e._n>1e6){s+=n[r].abbreviations.million;e._n=e._n/1e6}else{s+=n[r].abbreviations.thousand;e._n=e._n/1e3}}if(t.indexOf("b")>-1){if(t.indexOf(" b")>-1){u=" ";t=t.replace(" b","")}else t=t.replace("b","");var f=["B","KB","MB","GB","TB","PB","EB","ZB","YB"],l,c;for(var h=0;h<=f.length;h++){l=Math.pow(1024,h);c=Math.pow(1024,h+1);if(e._n>l&&e._n<c){u+=f[h];l>0&&(e._n=e._n/l);break}}}if(t.indexOf("o")>-1){if(t.indexOf(" o")>-1){a=" ";t=t.replace(" o","")}else t=t.replace("o","");a+=n[r].ordinal(e._n)}var p=e._n.toString().split(".")[0],d=t.split(".")[1],v=t.indexOf(","),m="",g=!1;if(d){if(d.indexOf("[")>-1){d=d.replace("]","");d=d.split("[");m=o(e._n,d[0].length+d[1].length,d[1].length)}else m=o(e._n,d.length);p=m.split(".")[0];m.split(".")[1].length?m=n[r].delimiters.decimal+m.split(".")[1]:m=""}else p=o(e._n,null);if(p.indexOf("-")>-1){p=p.slice(1);g=!0}v>-1&&(p=p.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1"+n[r].delimiters.thousands));t.indexOf(".")===0&&(p="");return(i&&g?"(":"")+(!i&&g?"-":"")+p+m+(a?a:"")+(s?s:"")+(u?u:"")+(i&&g?")":"")}function d(e,t){n[e]=t}var e,t="1.3.3",n={},r="en",i=typeof module!="undefined"&&module.exports;e=function(t){e.isNumeral(t)?t=t.value():Number(t)||(t=0);return new s(Number(t))};e.isNumeral=function(e){return e instanceof s};e.version=t;e.isNumeral=function(e){return e instanceof s};e.language=function(e,t){if(!e)return r;e&&!t&&(r=e);(t||!n[e])&&d(e,t);return n};e.language("en",{delimiters:{thousands:",",decimal:"."},abbreviations:{thousand:"k",million:"m"},ordinal:function(e){var t=e%10;return~~(e%100/10)===1?"th":t===1?"st":t===2?"nd":t===3?"rd":"th"},currency:{symbol:"$"}});e.fn=s.prototype={clone:function(){return e(this)},format:function(t){return u(this,t?t:e.defaultFormat)},unformat:function(t){return a(this,t?t:e.defaultFormat)},value:function(){return this._n},set:function(e){this._n=Number(e);return this},add:function(e){this._n=this._n+Number(e);return this},subtract:function(e){this._n=this._n-Number(e);return this},multiply:function(e){this._n=this._n*Number(e);return this},divide:function(e){this._n=this._n/Number(e);return this},difference:function(e){var t=this._n-Number(e);t<0&&(t=-t);return t}};i&&(module.exports=e);typeof ender=="undefined"&&(this.numeral=e);typeof define=="function"&&define.amd&&define("numeral",[],function(){return e})}).call(this);