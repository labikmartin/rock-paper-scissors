export default class Utils {

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
}