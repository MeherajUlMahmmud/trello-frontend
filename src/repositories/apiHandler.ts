import { ApiRoutes } from "@/utils/constants";
import axios from "axios";

export const sendAuthRequest = (url: string, data: any) => {
	return axios({
		method: "POST",
		url: ApiRoutes.BASE_URL + url,
		data: data,
		headers: {
			"Content-Type": "application/json",
		},
	});
};

export const sendUnauthenticatedGetRequest = (url: string) => {
	return axios({
		method: "GET",
		url: ApiRoutes.BASE_URL + url,
		headers: {
			"Content-Type": "application/json",
		},
	});
};

export const sendUnauthenticatedPostRequest = (url: string, data: any) => {
	return axios({
		method: "POST",
		url: ApiRoutes.BASE_URL + url,
		data: data,
		headers: {
			"Content-Type": "application/json",
		},
	});
};

export const sendGetRequest = (url: string, accessToken: string) => {
	return axios({
		method: "GET",
		url: ApiRoutes.BASE_URL + url,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
};

export const sendPostRequest = (
	url: string,
	data: any,
	accessToken: string,
	hasFile = false
) => {
	return axios({
		method: "POST",
		url: ApiRoutes.BASE_URL + url,
		data: data,
		headers: {
			"Content-Type": hasFile
				? "multipart/form-data"
				: "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
};

export const sendPatchRequest = (
	url: string,
	data: any,
	accessToken: string,
	hasFile = false
) => {
	return axios({
		method: "PATCH",
		url: ApiRoutes.BASE_URL + url,
		data: data,
		headers: {
			"Content-Type": hasFile
				? "multipart/form-data"
				: "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
};

export const sendDeleteRequest = (url: string, accessToken: string) => {
	return axios({
		method: "DELETE",
		url: ApiRoutes.BASE_URL + url,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
};
