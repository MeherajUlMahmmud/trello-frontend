import { ApiRoutes } from "@/utils/constants";
import { sendAuthRequest } from "./apiHandler";

export const authRepository = {
	login: async (data: any) => {
		const res = await sendAuthRequest(ApiRoutes.LOGIN_URL, data);
		return res;
	},
	signUp: async (data: any) => {
		const res = await sendAuthRequest(ApiRoutes.SIGNUP_URL, data);
		return res;
	},
};
