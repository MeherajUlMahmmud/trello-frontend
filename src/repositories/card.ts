import { ApiRoutes } from "@/utils/constants";
import { loadLocalStorage } from "../utils/persistLocalStorage";
import {
	sendDeleteRequest,
	sendGetRequest,
	sendPatchRequest,
	sendPostRequest,
} from "./apiHandler";

const tokens = loadLocalStorage("tokens");

export const cardRepository = {
	getCards: async (filters: any) => {
		const paramStr = new URLSearchParams(filters).toString();
		const res = await sendGetRequest(
			ApiRoutes.CARD_URL + "list/?" + paramStr,
			tokens.access
		);
		return res;
	},
	getCard: async (id: string) => {
		const res = await sendGetRequest(
			ApiRoutes.CARD_URL + `${id}/`,
			tokens.access
		);
		return res;
	},
	createCard: async (data: any, accessToken: string) => {
		const res = await sendPostRequest(
			ApiRoutes.CARD_URL + "create/",
			data,
			accessToken
		);
		return res;
	},
	updateCard: async (id: string, data: any) => {
		const res = await sendPatchRequest(
			ApiRoutes.CARD_URL + `${id}/update/`,
			data,
			tokens.access
		);
		return res;
	},
	deleteCard: async (id: string, accessToken: string) => {
		const res = await sendDeleteRequest(
			ApiRoutes.CARD_URL + `${id}/`,
			accessToken
		);
		return res;
	},
	moveCard: async (
		id: string,
		destinationId: string,
		sourceIndex: number,
		accessToken: string
	) => {
		const res = await sendPatchRequest(
			ApiRoutes.CARD_URL + `${id}/move/`,
			{
				destinationId,
				sourceIndex,
			},
			accessToken
		);
		return res;
	},
};
