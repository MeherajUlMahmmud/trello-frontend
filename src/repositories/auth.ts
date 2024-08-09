import { LOGIN_URL, SIGNUP_URL } from "../utils/urls";
import { sendAuthRequest } from "./apiHandler";

export const authRepository = {
	login: async (email: string, password: string) => {
		const res = sendAuthRequest(LOGIN_URL, {
			email,
			password,
		});
		return res;
	},
	register: async (email: string, password: string) => {
		const res = sendAuthRequest(SIGNUP_URL, {
			email,
			password,
		});
		return res;
	},
};
