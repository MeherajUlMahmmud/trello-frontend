import { logout } from "../utils/utils";
import { errorRoute } from "../utils/app_routes";

export const handleAPIError = (error: any, navigate: any) => {
	console.error(error);
	console.error(error?.response?.status);
	if (error?.response?.status === 404) {
		navigate(errorRoute);
	}
	if (error?.response?.status === 401) {
		logout(navigate);
	}
};
