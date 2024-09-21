import { ApiRoutes } from "@/utils/constants";
import { sendGetRequest, sendPatchRequest } from "./apiHandler";

export const userRepository = {
	getUserProfile: async (accessToken: string) => {
		const res = await sendGetRequest(
			ApiRoutes.USER_URL + "profile",
			accessToken
		);
		return res;
	},
	updateUser: async (id: string, data: any, accessToken: string) => {
		const res = await sendPatchRequest(
			ApiRoutes.USER_URL + id + "/update/",
			data,
			accessToken
		);
		return res;
	},
	deleteAccount: async (id: string) => {
		const res = await fetch(`http://localhost:8000/api/users/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
			},
		});
		return res.json();
	},
};
