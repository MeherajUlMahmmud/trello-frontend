import { loadLocalStorage } from "../utils/persistLocalStorage";
import { CARD_URL } from "../utils/urls";
import { sendGetRequest } from "./apiHandler";

const tokens = loadLocalStorage("tokens");

export const cardRepository = {
	getCards: async (filters: any) => {
		const paramStr = new URLSearchParams(filters).toString();
		const res = await sendGetRequest(
			CARD_URL + "list/?" + paramStr,
			tokens.access
		);
		return res;
	},
	getCard: async (id: string) => {
		const res = await sendGetRequest(CARD_URL + `${id}/`, tokens.access);
		return res;
	},
};
