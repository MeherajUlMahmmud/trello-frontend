import { WORKSPACE_URL } from "../utils/urls";
import { sendGetRequest } from "./apiHandler";

export const workspaceRepository = {
	getWorkspaces: async (filters: any, accessToken: string) => {
		const paramStr = new URLSearchParams(filters).toString();
		const res = await sendGetRequest(
			WORKSPACE_URL + "list/?" + paramStr,
			accessToken
		);
		return res;
	},
	getWorkspace: async (id: string, accessToken: string) => {
		const res = await sendGetRequest(WORKSPACE_URL + `${id}/`, accessToken);
		return res;
	},
};
