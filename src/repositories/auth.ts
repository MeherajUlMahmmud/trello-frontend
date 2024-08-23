import { LOGIN_URL, SIGNUP_URL } from "../utils/urls";
import { sendAuthRequest } from "./apiHandler";

export const authRepository = {
	login: async (data: any) => {
		const res = await sendAuthRequest(LOGIN_URL, data);
		return res;
	},
	signUp: async (data: any) => {
		const res = await sendAuthRequest(SIGNUP_URL, data);
		return res;
	},
};
