import { WORKSPACE_URL } from "../utils/urls";
import {
	sendGetRequest,
	sendPatchRequest,
	sendPostRequest,
} from "./apiHandler";

export const workspaceRepository = {
	getWorkspaces: async (filters: any, accessToken: string) => {
		const paramStr = new URLSearchParams(filters).toString();
		const res = await sendGetRequest(
			WORKSPACE_URL + "list/?" + paramStr,
			accessToken
		);
		return res;
	},
	getWorkspace: async (id: string | null, accessToken: string) => {
		if (!id) return null;
		const res = await sendGetRequest(WORKSPACE_URL + `${id}/`, accessToken);
		return res;
	},
	createWorkspace: async (data: any, accessToken: string) => {
		const res = await sendPostRequest(
			WORKSPACE_URL + "create/",
			data,
			accessToken
		);
		return res;
	},
	updateWorkspace: async (id: string, data: any, accessToken: string) => {
		const res = await sendPatchRequest(
			WORKSPACE_URL + `${id}/update/`,
			data,
			accessToken
		);
		return res;
	},
};
