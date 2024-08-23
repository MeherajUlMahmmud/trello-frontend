import { loadLocalStorage } from "../utils/persistLocalStorage";
import { PROJECT_URL } from "../utils/urls";
import { sendGetRequest, sendPatchRequest } from "./apiHandler";

const tokens = loadLocalStorage("tokens");

export const projectRepository = {
	getProjects: async (filters: any) => {
		const paramStr = new URLSearchParams(filters).toString();
		const res = await sendGetRequest(
			PROJECT_URL + "list/?" + paramStr,
			tokens.access
		);
		return res;
	},
	getProject: async (id: string) => {
		const res = await sendGetRequest(PROJECT_URL + `${id}/`, tokens.access);
		return res;
	},
	updateProject: async (id: string, data: any) => {
		const res = await sendPatchRequest(
			PROJECT_URL + `${id}/update/`,
			data,
			tokens.access
		);
		return res;
	},
};
