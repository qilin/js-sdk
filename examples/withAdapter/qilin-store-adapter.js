parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"Brjv":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.PAYMENT_FORM_CLOSED=exports.SHOW_PAYMENT_FORM=void 0;var _="SHOW_PAYMENT_FORM";exports.SHOW_PAYMENT_FORM=_;var e="PAYMENT_FORM_CLOSED";exports.PAYMENT_FORM_CLOSED=e;
},{}],"MddR":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=function(e,t,n,r){return new(n||(n=Promise))(function(o,a){function u(e){try{c(r.next(e))}catch(t){a(t)}}function i(e){try{c(r.throw(e))}catch(t){a(t)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n(function(e){e(t)})).then(u,i)}c((r=r.apply(e,t||[])).next())})},t=function(e,t){var n,r,o,a,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function i(a){return function(i){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;u;)try{if(n=1,r&&(o=2&a[0]?r.return:a[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,a[1])).done)return o;switch(r=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return u.label++,{value:a[1],done:!1};case 5:u.label++,r=a[1],a=[0];continue;case 7:a=u.ops.pop(),u.trys.pop();continue;default:if(!(o=(o=u.trys).length>0&&o[o.length-1])&&(6===a[0]||2===a[0])){u=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){u.label=a[1];break}if(6===a[0]&&u.label<o[1]){u.label=o[1],o=a;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(a);break}o[2]&&u.ops.pop(),u.trys.pop();continue}a=t.call(e,u)}catch(i){a=[6,i],r=0}finally{n=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,i])}}},n=function(n){return function(r,o,a){return e(void 0,void 0,void 0,function(){var e,u;return t(this,function(t){switch(t.label){case 0:e={meta:r,url:o},a&&(e.qilinProductUUID=a),t.label=1;case 1:return t.trys.push([1,4,,5]),[4,fetch(n+"/auth",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})];case 2:return[4,t.sent().json()];case 3:return[2,t.sent().meta];case 4:throw u=t.sent(),console.error(u),u;case 5:return[2]}})})}};exports.default=n;
},{}],"nxQv":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("./constants"),t=n(require("./getAuthFunction"));function n(e){return e&&e.__esModule?e:{default:e}}var r=function(e,t,n,r){return new(n||(n=Promise))(function(o,i){function a(e){try{c(r.next(e))}catch(t){i(t)}}function u(e){try{c(r.throw(e))}catch(t){i(t)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n(function(e){e(t)})).then(a,u)}c((r=r.apply(e,t||[])).next())})},o=function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=(o=a.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(u){i=[6,u],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}},i=function(n,i,a){if(!n)throw new Error("Game UID is required, but not provided");if(!i)throw new Error("Api URL is required, but not provided");var u=window.location.href,c={},l=!1,s=(0,t.default)(i);return window.addEventListener("message",function(t){if(l){var n,r,o,i=t.data,a=void 0===i?{}:i,u=a.type,s=a.payload;u===e.PAYMENT_FORM_CLOSED&&(n=e.PAYMENT_FORM_CLOSED,r=s,(o=c[n])&&o.forEach(function(e){return e(r)}))}}),{showPaymentForm:function(t,r,o){if(l){var i={type:e.SHOW_PAYMENT_FORM,payload:{qilinProductUUID:o||n,userId:r,itemId:t}};window.parent.postMessage(i,"*")}else alert("Game is not initialized!")},addCallback:function(e,t){var n=c[e]||[];n.push(t),c[e]=n},init:function(e){return r(void 0,void 0,void 0,function(){var t,n;return o(this,function(r){switch(r.label){case 0:return r.trys.push([0,2,,3]),[4,(a||s)(e,u)];case 1:return t=r.sent(),l=!0,[2,t];case 2:throw n=r.sent(),console.error(n),n;case 3:return[2]}})})}}};exports.default=i;
},{"./constants":"Brjv","./getAuthFunction":"MddR"}],"eKDL":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.PROXY=void 0;var e="PROXY";exports.PROXY=e;
},{}],"OGyb":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=function(e){var t=document.createElement("iframe");return t.src=e,t.style.width="100%",t.style.height="100%",t.width="100%",t.height="100%",document.body.prepend(t),t};exports.default=e;
},{}],"iWQp":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=o(require("../src/qilinGameFrame")),t=require("./constants"),r=o(require("./openIframe")),n=require("../src/constants");function o(e){return e&&e.__esModule?e:{default:e}}var a=function(e,t,r,n){return new(r||(r=Promise))(function(o,a){function i(e){try{c(n.next(e))}catch(t){a(t)}}function u(e){try{c(n.throw(e))}catch(t){a(t)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r(function(e){e(t)})).then(i,u)}c((n=n.apply(e,t||[])).next())})},i=function(e,t){var r,n,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function u(a){return function(u){return function(a){if(r)throw new TypeError("Generator is already executing.");for(;i;)try{if(r=1,n&&(o=2&a[0]?n.return:a[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,a[1])).done)return o;switch(n=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return i.label++,{value:a[1],done:!1};case 5:i.label++,n=a[1],a=[0];continue;case 7:a=i.ops.pop(),i.trys.pop();continue;default:if(!(o=(o=i.trys).length>0&&o[o.length-1])&&(6===a[0]||2===a[0])){i=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){i.label=a[1];break}if(6===a[0]&&i.label<o[1]){i.label=o[1],o=a;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(a);break}o[2]&&i.ops.pop(),i.trys.pop();continue}a=t.call(e,i)}catch(u){a=[6,u],n=0}finally{r=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,u])}}},u=function(o){if(!o)throw new Error("Api URL is required, but not provided");var u,c=(0,e.default)(t.PROXY,o),l=!1,s=function(e){if(u){var t={type:n.PAYMENT_FORM_CLOSED,payload:e};u.postMessage(t,"*")}};return{init:function(e){return a(void 0,void 0,void 0,function(){var t,o,a;return i(this,function(i){switch(i.label){case 0:return i.trys.push([0,2,,3]),[4,c.init(e)];case 1:return t=i.sent(),o=t.url,l=!0,(0,r.default)(o),window.addEventListener("message",function(e){if(l){var t=e.data,r=void 0===t?{}:t,o=r.type,a=r.payload;if(o===n.SHOW_PAYMENT_FORM){u=e.source;var i=a.qilinProductUUID,s=a.userId,f=a.itemId;c.showPaymentForm(f,s,i)}}}),c.addCallback(n.PAYMENT_FORM_CLOSED,s),[3,3];case 2:throw a=i.sent(),console.error(a),a;case 3:return[2]}})})}}};exports.default=u;
},{"../src/qilinGameFrame":"nxQv","./constants":"eKDL","./openIframe":"OGyb","../src/constants":"Brjv"}],"QCba":[function(require,module,exports) {
"use strict";var r=e(require("./qilinGameProxy"));function e(r){return r&&r.__esModule?r:{default:r}}if(!window)throw new Error("SDK only work on web browser");window.qilinGameProxy=r.default;
},{"./qilinGameProxy":"iWQp"}]},{},["QCba"], null)
//# sourceMappingURL=/qilin-store-adapter.js.map