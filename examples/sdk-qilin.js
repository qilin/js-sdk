parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"eKDL":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.PAYMENT_FORM_CLOSED=exports.SHOW_PAYMENT_FORM=void 0;var _="SHOW_PAYMENT_FORM";exports.SHOW_PAYMENT_FORM=_;var e="PAYMENT_FORM_CLOSED";exports.PAYMENT_FORM_CLOSED=e;
},{}],"K0GV":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("./constants"),t=function(t){if("function"!=typeof t)throw new Error("PayFormCallback not provided!");var o=function(t,o){var r={type:e.PAYMENT_FORM_CLOSED,payload:{status:o}};t.postMessage(r,"*")};window.addEventListener("message",function(r){var n=r.source,a=r.data,i=void 0===a?{}:a,s=i.type,d=i.payload,u=void 0===d?{}:d;if(s===e.SHOW_PAYMENT_FORM){var c=u.qilinProductUUID,f=u.userId,p=u.itemId;t(c,f,p).then(function(e){return o(n,e)}).catch(function(e){console.error(e),o(n,!1)})}})};exports.default=t;
},{"./constants":"eKDL"}],"MPz2":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("./constants"),t=function(e,t,n,r){return new(n||(n=Promise))(function(o,i){function a(e){try{s(r.next(e))}catch(t){i(t)}}function u(e){try{s(r.throw(e))}catch(t){i(t)}}function s(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n(function(e){e(t)})).then(a,u)}s((r=r.apply(e,t||[])).next())})},n=function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=(o=a.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(u){i=[6,u],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}},r=function(r,o,i){if(!r)throw new Error("Game UID is required, but not provided");if(!o)throw new Error("Api URL is required, but not provided");var a=window.location.href,u={},s=!1,c=function(e,r){return t(void 0,void 0,void 0,function(){var t;return n(this,function(n){switch(n.label){case 0:return n.trys.push([0,3,,4]),[4,fetch(o+"/auth",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({meta:e,url:r})})];case 1:return[4,n.sent().json()];case 2:return[2,n.sent().meta];case 3:throw t=n.sent(),console.error(t),t;case 4:return[2]}})})};return window.addEventListener("message",function(t){if(s){var n,r,o,i=t.data,a=void 0===i?{}:i,c=a.type,l=a.payload;c===e.PAYMENT_FORM_CLOSED&&(n=e.PAYMENT_FORM_CLOSED,r=l,(o=u[n])&&o.forEach(function(e){return e(r)}))}}),{showPaymentForm:function(t,n){if(s){var o={type:e.SHOW_PAYMENT_FORM,payload:{qilinProductUUID:r,userId:n,itemId:t}};window.parent.postMessage(o,"*")}else alert("Game is not initialized!")},addCallback:function(e,t){var n=u[e]||[];n.push(t),u[e]=n},init:function(e){return t(void 0,void 0,void 0,function(){var t,r;return n(this,function(n){switch(n.label){case 0:return n.trys.push([0,2,,3]),[4,(i||c)(e,a)];case 1:return t=n.sent(),s=!0,[2,t];case 2:throw r=n.sent(),console.error(r),r;case 3:return[2]}})})}}};exports.default=r;
},{"./constants":"eKDL"}],"QCba":[function(require,module,exports) {
"use strict";var e=n(require("./qilinGameParent")),r=n(require("./qilinGameFrame")),i=require("./constants");function n(e){return e&&e.__esModule?e:{default:e}}if(!window)throw new Error("SDK only work on web browser");window.qilinGameParent=e.default,window.qilinGameFrame=r.default,window.PAYMENT_FORM_CLOSED=i.PAYMENT_FORM_CLOSED;
},{"./qilinGameParent":"K0GV","./qilinGameFrame":"MPz2","./constants":"eKDL"}]},{},["QCba"], null)
//# sourceMappingURL=/sdk-qilin.js.map