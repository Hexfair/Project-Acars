// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://acars.adsbexchange.com/
// @match        https://acars.adsbexchange.com/#!/13
// @icon         https://www.google.com/s2/favicons?sz=64&domain=adsbexchange.com
// @grant        none
// ==/UserScript==

(function () {
	'use strict';

	setInterval(async () => {
		let elems = document.getElementsByClassName('tabulator-row');

		let str = '';
		for (let i = 0; i < elems.length; i++) {
			str = str + elems[i].outerHTML;
		};

		await fetch('http://localhost:5001/api', {
			method: "POST",
			mode: "no-cors",
			body: str
		});

		setTimeout(() => {
			location.replace('https://acars.adsbexchange.com/#!/13');
			location.reload();
		}, 900000);

	}, 180000);
})();
