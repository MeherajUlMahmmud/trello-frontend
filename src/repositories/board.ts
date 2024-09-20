import { BOARD_URL } from "../utils/urls";
import {
	sendDeleteRequest,
	sendGetRequest,
	sendPatchRequest,
	sendPostRequest,
} from "./apiHandler";

export const boardRepository = {
	getBoards: async (filters: any, accessToken: string) => {
		const paramStr = new URLSearchParams(filters).toString();
		const res = await sendGetRequest(
			BOARD_URL + "list/?" + paramStr,
			accessToken
		);
		return res;
	},
	getBoard: async (id: string, accessToken: string) => {
		const res = await sendGetRequest(BOARD_URL + `${id}/`, accessToken);
		return res;
	},
	createBoard: async (data: any, accessToken: string) => {
		const res = await sendPostRequest(
			BOARD_URL + "create/",
			data,
			accessToken
		);
		return res;
	},
	updateBoard: async (id: string, data: any, accessToken: string) => {
		const res = await sendPatchRequest(
			BOARD_URL + `${id}/update/`,
			data,
			accessToken
		);
		return res;
	},
	deleteBoard: async (id: string, accessToken: string) => {
		const res = await sendDeleteRequest(BOARD_URL + `${id}/`, accessToken);
		return res;
	},
	updateCardOrder: async (
		boardId: string,
		data: any,
		accessToken: string
	) => {
		const res = await sendPatchRequest(
			BOARD_URL + `${boardId}/update-board-order/`,
			data,
			accessToken
		);
		return res;
	},
};
