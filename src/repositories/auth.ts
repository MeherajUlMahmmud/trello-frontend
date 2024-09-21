import { ApiRoutes } from "@/utils/constants";
import { sendAuthRequest, sendPostRequest } from "./apiHandler";

export const authRepository = {
	login: async (data: any) => {
		const res = await sendAuthRequest(ApiRoutes.LOGIN_URL, data);
		return res;
	},
	signUp: async (data: any) => {
		const res = await sendAuthRequest(ApiRoutes.SIGNUP_URL, data);
		return res;
	},
	updatePassword: async (data: any, accessToken: string) => {
		const res = await sendPostRequest(
			ApiRoutes.PASSWORD_CHANGE_URL,
			data,
			accessToken
		);
		return res;
	},
};
