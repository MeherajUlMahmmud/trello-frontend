import { loadLocalStorage } from "../utils/persistLocalStorage";
import { WORKSPACE_URL } from "../utils/urls";
import { sendGetRequest } from "./apiHandler";

const tokens = loadLocalStorage("tokens");

export const workspaceRepository = {
	getWorkspaces: async (filters: any) => {
		const paramStr = new URLSearchParams(filters).toString();
		const res = await sendGetRequest(
			WORKSPACE_URL + "list/?" + paramStr,
			tokens.access
		);
		return res;
	},
	getWorkspace: async (id: string) => {
		const res = await sendGetRequest(
			WORKSPACE_URL + `${id}/`,
			tokens.access
		);
		return res;
	},
};
