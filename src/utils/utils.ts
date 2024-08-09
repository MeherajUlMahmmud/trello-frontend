import { loginRoute } from "./app_routes";
import { deleteLocalStorage } from "./persistLocalStorage";

export const capitalize = (str: string) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getRandomColor = () => {
	const letters = "0123456789ABCDEF";
	let color = "#";
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
};

export const commaSeparated = (str: string) => str.toLocaleString();

export const detailedDate = (dateTime: string) => {
	// format as Today, 8:00 PM, Yesterday, 8:00 PM, Tomorrow, 8:00 PM or July 16, 2023, 8:00 PM
	const date = new Date(dateTime);
	const today = new Date();
	const yesterday = new Date();
	const tomorrow = new Date();

	yesterday.setDate(yesterday.getDate() - 1);
	tomorrow.setDate(tomorrow.getDate() + 1);

	const options = {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	};

	if (date.toDateString() === today.toDateString()) {
		return `Today, ${date.toLocaleString("en-US", {
			hour: "numeric",
			minute: "numeric",
			hour12: true,
		})}`;
	} else if (date.toDateString() === yesterday.toDateString()) {
		return `Yesterday, ${date.toLocaleString("en-US", {
			hour: "numeric",
			minute: "numeric",
			hour12: true,
		})}`;
	} else if (date.toDateString() === tomorrow.toDateString()) {
		return `Tomorrow, ${date.toLocaleString("en-US", {
			hour: "numeric",
			minute: "numeric",
			hour12: true,
		})}`;
	} else {
		return date.toLocaleString("en-US", options as any);
	}
};

export const formatDateTime = (dateTime: string) => {
	// July 16, 2023 at 12:00 PM
	const date = new Date(dateTime);
	const options = {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	};
	return date.toLocaleString("en-US", options as any);
};

export const formatDateTimeShort = (dateTime: string) => {
	// May 6, 8:00 PM
	const date = new Date(dateTime);
	const options = {
		month: "long",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	};
	return date.toLocaleString("en-US", options as any);
};

export const formatDateShort = (dateTime: string) => {
	// May 6, 8:00 PM
	const date = new Date(dateTime);
	const options = {
		month: "short",
		day: "numeric",
		hour12: true,
	};
	return date.toLocaleString("en-US", options as any);
};

export const formatTime = (dateTime: string) => {
	const date = new Date(dateTime);
	const options = {
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	};
	return date.toLocaleString("en-US", options as any);
};

export const closeModal = (
	e: any,
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
	e.stopPropagation();
	if (e.target.classList.contains("modal__wrapper")) {
		setIsModalOpen(false);
	}
};

export const isAuthenticated = (user: any, tokens: any) => {
	if (user && tokens) {
		return true;
	}
	return false;
};

export const isAuthorized = (error: any) => {
	if (error.response.status === 401) {
		return false;
	}
	return true;
};

export const notFound = (error: any) => {
	if (error.response.status === 404) {
		return true;
	}
	return false;
};

export const logout = (navigate: any) => {
	deleteLocalStorage("user");
	deleteLocalStorage("tokens");
	navigate(loginRoute);
};
