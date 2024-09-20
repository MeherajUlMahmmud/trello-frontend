import { PROJECT_URL } from "../utils/urls";
import {
	sendGetRequest,
	sendPatchRequest,
	sendPostRequest,
} from "./apiHandler";

export const projectRepository = {
	getProjects: async (filters: any, accessToken: string) => {
		const paramStr = new URLSearchParams(filters).toString();
		const res = await sendGetRequest(
			PROJECT_URL + "list/?" + paramStr,
			accessToken
		);
		return res;
	},
	getProject: async (id: string, accessToken: string) => {
		const res = await sendGetRequest(PROJECT_URL + `${id}/`, accessToken);
		return res;
	},
	createProject: async (data: any, accessToken: string) => {
		const res = await sendPostRequest(
			PROJECT_URL + "create/",
			data,
			accessToken
		);
		return res;
	},
	updateProject: async (id: string, data: any, accessToken: string) => {
		const res = await sendPatchRequest(
			PROJECT_URL + `${id}/update/`,
			data,
			accessToken
		);
		return res;
	},
	updateBoardOrder: async (
		projectId: string,
		data: any,
		accessToken: string
	) => {
		const res = await sendPatchRequest(
			PROJECT_URL + `${projectId}/update-board-order/`,
			data,
			accessToken
		);
		return res;
	},
};
