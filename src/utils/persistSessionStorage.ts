export const loadSessionStorage = (value: string) => {
	try {
		const serializedState = window.sessionStorage.getItem(value);

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

export const saveSessionStorage = (name: string, value: any) => {
	try {
		const serializedState = JSON.stringify(value);
		window.sessionStorage.setItem(name, serializedState);
	} catch (err) {
		// console.log(err);
	}
};

export const deleteSessionStorage = (value: string) => {
	try {
		window.sessionStorage.removeItem(value);
	} catch (err) {
		// console.log(err);
	}
};
