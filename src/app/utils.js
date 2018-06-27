import _ from 'lodash';

export default class Utils {

	//- ### ### ### ### ### ### ### ###
	//- ELEMENTS
	//- ### ### ### ### ### ### ###

	//- ### ### ### ADD CLASS
	static classAdd(el, cls) {
		let classParts = cls.split(' ');
		classParts.forEach((clsName) => {
			el && el
				.classList
				.add(clsName);
		});
	}

	//- ### ### ### REMOVE CLASS
	static classRem(el, cls) {
		let classParts = cls.split(' ');
		classParts.forEach((clsName) => {
			el && el
				.classList
				.remove(clsName);
		});
	}

	//- ### ### ### TOGGLE CLASS
	static classTog(el, cls) {
		let classParts = cls.split(' ');
		classParts.forEach((clsName) => {
			el && el
				.classList
				.toggle(clsName);
		});
	}

	//- ### ### ### CONTAINS CLASS
	static classCont(el, cls) {
		return el && el
			.classList
			.contains(cls);
	}

	//- ### ### ### SEARCH PARENTS
	static findParents(el, cls) {
		while (el.parentNode) {
			el = el.parentNode;
			if (el.classList && el.classList.contains(cls)) {
				return el;
			}
			else if (el.classList === undefined) {
				return null;
			}
		}
		return null;
	}

	//- ### ### ### RETURN ALL SIBLINGS
	static siblings(el) {
		let result = [],
			node = el.parentNode.firstChild;
		for (; node; node = node.nextSibling)
			if (node.nodeType == 1 && node != el)
				result
					.push(node);
		return result;
	}

	//- ### ### ### RETURN ALL PREVIOUS SIBLINGS
	static prevSiblings(el) {
		let result = [],
			node = el.previousElementSibling;
		for (; node; node = node.previousElementSibling)
			if (node.nodeType == 1)
				result
					.push(node);
		return result;
	}

	//- ### ### ### RETURN ALL NEXT SIBLINGS
	static nextSiblings(el) {
		let result = [],
			node = el.nextElementSibling;
		for (; node; node = node.nextElementSibling)
			if (node.nodeType == 1)
				result
					.push(node);
		return result;
	}

	//- ### ### ### SET HEIGHT FROM HIGHEST ELEMENT
	static calcHeight(elements, parent) {
		var heights = [];
		for (let i = 0; i < elements.length; i++) {
			var elHeight = elements[i].offsetHeight;
			heights
				.push(elHeight);
		}
		//- ### ### ### RETURN HIGHEST FROM ARRAY
		// Array.prototype.max = () => {
		//   return Math.max.apply(null, this);
		// };
		let max = Math.max.apply(null, heights);
		if (parent) {
			parent
				.style.height = max + 'px';
		}
	}

	//- ### ### ### GET FILENAME
	static getFileName(fileInput) {
		let fn;
		if (fileInput) {
			let input = fileInput,
				fullPath = input.value;
			if (fullPath) {
				let startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
				let filename = fullPath.substring(startIndex);
				if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
					fn = filename.substring(1);
				}
			}
		}
		return fn;
	}

	//- ### ### ### SLIDE TOGGLE
	static slideToggle(selector, speed) {
		let ths = typeof selector !== 'object' ? document.querySelector(selector) : selector.firstElementChild,
			childs = ths.children,
			childsHeights = [];
		for (let i = 0; i < childs.length; i++) {
			let child = childs[i];
			childsHeights.push(child.offsetHeight);
		}
		let totalHeight = childsHeights.reduce((total, num) => total + num);
		if (this.classCont(ths, 'toggled')) {
			ths.style.maxHeight = '0';
			this.classRem(ths, 'toggled');
		}
		else {
			ths.style.transition = `max-height ${speed}s linear`;
			ths.style.maxHeight = totalHeight;
			this.classAdd(ths, 'toggled');
		}
	}


	//- ### ### ### ### ### ### ### ###
	//- STRING
	//- ### ### ### ### ### ### ###

	//- ### ### ### SUBSTRING / UNSUBSTRING
	static substringTxt(ths, len) {
		var string = ths.innerText,
			substr = string.substring(0, len);
		if (string.length > len) {
			ths
				.innerText = substr + '... ';
		}
	}


	//- ### ### ### ### ### ### ### ###
	//- NUMBERS
	//- ### ### ### ### ### ### ###

	/**
	 * Formats number string with separated thousands
	 * @param {string} value
	 * @param {string} separator - separate thousand by, default ","
	 */
	static formatNumber(value, separator = ',') {
		const originalVal = value;
		const valAsNumber = parseFloat(originalVal);
		if (isNaN(valAsNumber)) {
			return;
		}
		let roundedNumber = Math.round(valAsNumber);
		let formattedNumber = roundedNumber.toString().replace(/./g, function(digit, index, number) {
			return (index && digit !== ".") && ((number.length - index) % 3 === 0) ? `${separator}${digit}` : digit;
		});
		return formattedNumber;
	}

	/**
	 * Format number to price with currency
	 * @param {number} number
	 * @param {string} currency - currency symbol
	 * @param {boolean} currencyBefore - currency will be placed before price
	 */
	static formatPriceNumber(number, currency = 'Kč', currencyBefore = false) {
		const originalVal = number;
		const valAsNumber = parseFloat(originalVal);
		if (isNaN(valAsNumber)) {
			return;
		}
		let roundedNumber = Math.round(valAsNumber);
		let formattedNumber = roundedNumber.toString().replace(/./g, function(digit, index, number) {
			return (index && digit !== ".") && ((number.length - index) % 3 === 0) ? ` ${digit}` : digit;
		});
		return currencyBefore ? `${currency}${formattedNumber}` : `${formattedNumber} ${currency}`;
	}


	//- ### ### ### ### ### ### ### ###
	//- URLS
	//- ### ### ### ### ### ### ###

	//- ### ### ### GET PARAM FROM URL
	/**
	 * This will return object with key-value pairs from query params
	 * @param {string} qs - location.search string
	 */
	static getQueryParams(qs) {
		qs = qs.split('+').join(' ');
		var params,
			tokens,
			re = /[?&]?([^=]+)=([^&]*)/g;
		while (tokens == re.exec(qs)) {
			if (params) {
				params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
			}
		}
		return params;
	}


	//- ### ### ### ### ### ### ### ###
	//- ARRAYS
	//- ### ### ### ### ### ### ###

	// ### ### ### REMOVE ITEM FROM ARRAY
	static removeItemByKey(array, item, key) {
		_.remove(array, n => {
			return n[key] === item[key];
		});
	}

	// ### ### ### MOVE ITEM IN ARRAY
	static arrayMove(arr, oldIndex, newIndex) {
		if (newIndex >= arr.length) {
			let k = newIndex - arr.length + 1;
			while (k--) {
				arr.push(undefined);
			}
		}
		arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
		return arr;
	}

	static searchInQuery(query, items) {
		let filtered = [];
		for (let i = 0; i < items.length; i++) {
			let item = items[i];
			if (item.toLowerCase().indexOf(query.toLowerCase()) == 0) {
				filtered.push(item);
			}
		}
		return filtered;
	}


	//- ### ### ### ### ### ### ### ###
	//- DATES
	//- ### ### ### ### ### ### ###
	/**
	 * This will transfrom dates in string format to JS Date object
	 * Currently supported formats: dd.mm.yyyy | yyyymmdd | yyyy-mm-dd
	 * @param {string} date
	 */
	static dateFromModel(date) {
		if (typeof date === 'string') {
			let pattern         = /^(\d{2})\s?\.\s?(\d{2})\s?\.\s?(\d{4})$/;
			let yyyymmdd        = /\d{8}/;
			let isDateFormatted = pattern.test(date);
			let isyyyymmdd 		= yyyymmdd.test(date);
			let dateParts       = date.split('.');
			let year       = parseInt(dateParts[2]);
			let month      = parseInt(dateParts[1]);
			let day        = parseInt(dateParts[0]);
			if (isDateFormatted) {
				date = new Date(year, month, day);
			}
			else if (isyyyymmdd) {
				year        = date.substring(0, 4);
				month       = date.substring(4, 6);
				day         = date.substring(6, 8);
				date        = new Date(year, month-1, day);
			}
			else {
				date = new Date(date);
			}
		}
		return date ? date : null;
	}

	/**
	 * Transforms JS Date to a model
	 * Currently can output models: dd.mm.yyyy | yyyy.mm.dd | yyyymmdd
	 * @param {Date} date
	 */
	static dateToModel(date, toModel = 'dd.mm.yyyy') {
		let model = null;
		if (Object.prototype.toString.call(date) === "[object Date]") {
			let tmp = date.getMonth() + 1;
			let y = date.getFullYear().toString();
			let m = tmp <= 9 ? "0" + tmp.toString() : tmp.toString();
			let d = date.getDate() <= 9 ? "0" + date.getDate().toString() : date.getDate().toString();
			switch (toModel) {
				case 'dd.mm.yyyy':
					model = `${d}.${m}.${y}`;
					break;
				case 'yyyy.mm.dd':
					model = `${y}.${m}.${d}`;
					break;
				case 'yyyymmdd':
					model = `${y}${m}${d}`;
					break;
				default:
					break;
			}
		}
		return model;
	}

	/**
	 * Retrieves age from passed date
	 * @param date
	 * @param ageIndex - If set true, function will return object {age: age, ageIndex: ageFlag}. ageIndex defines if person is senior, kid, etc.
	 */
	static getAge(date, ageIndex) {
		date = new Date(date);
		let ageDifMs = Date.now() - date.getTime();
		// miliseconds from epoch
		let ageDate  = new Date(ageDifMs);
		let age = Math.abs(ageDate.getUTCFullYear() - 1970);
		if (ageIndex) {
			let ageFlag;
			switch (true) {
				// kid
				case age < 18:
					ageFlag = 'K';
					break;
				// adult
				case age >= 18 && age < 71:
					ageFlag = 'A';
					break;
				// senior
				case age >= 71:
					ageFlag = 'S';
					break;
			}
			return {age, ageIndex: ageFlag};
		} else {
			return age;
		}
	}


	//- ### ### ### ### ### ### ### ###
	//- COOKIES
	//- ### ### ### ### ### ### ###

	//- ### ### ### GET COOKIE
	static getCookie(cname) {
		let name = cname + "=";
		let ca = document.cookie.split(';');
		for(let i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}

	//- ### ### ### SET COOKIE
	static setCookie(cname, cvalue, exdays, path) {
		let d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		let expires = "expires="+d.toUTCString();
		let forPath = path ? path : "/";
		document.cookie = cname + "=" + cvalue + "; " + expires + ";path=" + forPath + ";";
	}

	//- ### ### ### ### ### ### ### ###
	//- OTHER
	//- ### ### ### ### ### ### ###

	//- ### ### ###  DEBOUNCER (call something with interval)
	static debouncer(func, tOut) {
		var timeoutID, timeout = tOut || 200;
		return function () {
			let scope = window,
				args = arguments;
			clearTimeout(timeoutID);
			timeoutID = setTimeout(() => {
				func
					.apply(scope, Array.prototype.slice.call(args));
			}, timeout);
		};
	}
}