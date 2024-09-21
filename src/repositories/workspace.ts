import { ApiRoutes } from "@/utils/constants";
import {
	sendGetRequest,
	sendPatchRequest,
	sendPostRequest,
} from "./apiHandler";

export const workspaceRepository = {
	getWorkspaces: async (filters: any, accessToken: string) => {
		const paramStr = new URLSearchParams(filters).toString();
		const res = await sendGetRequest(
			ApiRoutes.WORKSPACE_URL + "list/?" + paramStr,
			accessToken
		);
		return res;
	},
	getWorkspace: async (id: string | null, accessToken: string) => {
		if (!id) return null;
		const res = await sendGetRequest(
			ApiRoutes.WORKSPACE_URL + `${id}/`,
			accessToken
		);
		return res;
	},
	createWorkspace: async (data: any, accessToken: string) => {
		const res = await sendPostRequest(
			ApiRoutes.WORKSPACE_URL + "create/",
			data,
			accessToken,
			true
		);
		return res;
	},
	updateWorkspace: async (id: string, data: any, accessToken: string) => {
		const res = await sendPatchRequest(
			ApiRoutes.WORKSPACE_URL + `${id}/update/`,
			data,
			accessToken,
			true
		);
		return res;
	},
};
