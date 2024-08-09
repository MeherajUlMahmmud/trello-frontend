export const loadLocalStorage = (value: string) => {
	try {
		const serializedState = window.localStorage.getItem(value);

		if (
			!serializedState ||
			serializedState === null ||
			serializedState === undefined
		) {
			return undefined;
		}
		return JSON.parse(serializedState);
	} catch (err) {
		return undefined;
	}
};

export const saveLocalStorage = (name: string, value: string) => {
	try {
		const serializedState = JSON.stringify(value);
		window.localStorage.setItem(name, serializedState);
	} catch (err) {
		// console.log(err);
	}
};

export const deleteLocalStorage = (value: string) => {
	try {
		window.localStorage.removeItem(value);
	} catch (err) {
		// console.log(err);
	}
};
