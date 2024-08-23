import { loadLocalStorage } from "../utils/persistLocalStorage";
import { BOARD_URL } from "../utils/urls";
import { sendGetRequest, sendPatchRequest } from "./apiHandler";

const tokens = loadLocalStorage("tokens");

export const boardRepository = {
	getBoards: async (filters: any) => {
		const paramStr = new URLSearchParams(filters).toString();
		const res = await sendGetRequest(
			BOARD_URL + "list/?" + paramStr,
			tokens.access
		);
		return res;
	},
	getBoard: async (id: string) => {
		const res = await sendGetRequest(BOARD_URL + `${id}/`, tokens.access);
		return res;
	},
	updateBoard: async (id: string, data: any) => {
		const res = await sendPatchRequest(
			BOARD_URL + `${id}/update/`,
			data,
			tokens.access
		);
		return res;
	},
};
