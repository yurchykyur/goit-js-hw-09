!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},o=e.parcelRequired7c6;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in n){var o=n[e];delete n[e];var r={id:e,exports:{}};return t[e]=r,o.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){n[e]=t},e.parcelRequired7c6=o);var r=o("h6c0i"),i={form:document.querySelector(".form"),formInputs:document.querySelectorAll(".form input"),buttonCreatePromises:document.querySelector('button[type="submit"]')};i.form.addEventListener("submit",(function(e){e.preventDefault(),function(e){var t=!0,n=!1,o=void 0;try{for(var i,u=e[Symbol.iterator]();!(t=(i=u.next()).done);t=!0){i.value.then((function(e){var t=e.position,n=e.delay;return r.Notify.success("position: ".concat(t,", delay: ").concat(n))})).catch((function(e){var t=e.position,n=e.delay;return r.Notify.failure("position: ".concat(t,", delay: ").concat(n))}))}}catch(e){n=!0,o=e}finally{try{t||null==u.return||u.return()}finally{if(n)throw o}}}((t=function(e){for(var t=[],n=1;n<=e.amount;n+=1){var o=n,r=Number(e.delay)+Number(e.step*(n-1));t.push({position:o,delay:r})}return t}((n=i.formInputs,o={},n.forEach((function(e){o[e.getAttribute("name")]=e.value})),o)),t.map((function(e){return function(e,t){var n=Math.random()>.3;return new Promise((function(o,r){setTimeout((function(){n?o({position:e,delay:t}):r({position:e,delay:t})}),t)}))}(e.position,e.delay)}))));var t,n,o}))}();
//# sourceMappingURL=03-promises.1e75ed0f.js.map
