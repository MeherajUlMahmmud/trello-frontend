// Application Constants
export class AppConstants {
	static appName = "Trello";
	static appTitle = "Trello - Your Ultimate Project Management Tool";
	static appDescription =
		"Trello is a project management tool that allows you to organize your tasks and projects in a visual way. Create boards, lists, and cards to manage your work and collaborate with your team.";

	static genericErrorMessage =
		"Something went wrong. Please try again later.";
}

// API Routes
export class ApiRoutes {
	static BASE_URL = import.meta.env.VITE_API_BASE_URL;

	static AUTH_URL = "/api/auth/";
	static LOGIN_URL = "/api/auth/login/";
	static SIGNUP_URL = "/api/auth/register/";
	static PASSWORD_CHANGE_URL = "/api/auth/password-change/";
	static FORGOT_PASSWORD_URL = "/api/auth/reset-password/";

	static USER_URL = "/api/user/";
	static WORKSPACE_URL = "/api/workspace/";
	static PROJECT_URL = "/api/project/";
	static BOARD_URL = "/api/board/";
	static CARD_URL = "/api/card/";
}

// App URLs
export class AppUrls {
	static loginRoute = "/auth/login";
	static signUpRoute = "/auth/sign-up";
	static forgotPasswordRoute = "/auth/forgot-password";
	static recoverPasswordRoute = "/auth/recover-password";
	static logoutRoute = "/auth/logout";

	static homeRoute = "/";

	static dashboardRoute = "/dashboard";
	static initialWorkspaceDetailsRoute = "/workspace/:id/:projectId";

	static aboutRoute = "/about";
	static contactUsRoute = "/contact";
	static profileRoute = "/profile";

	static errorRoute = "/error";
}

// Assets
export class Assets {
	static userPlaceholder = "/assets/images/avatar.png";
	static toastCheck = "/assets/toast/check.svg";
	static toastError = "/assets/toast/error.svg";
	static toastWarning = "/assets/toast/warning.svg";
	static toastInfo = "/assets/toast/info.svg";
}
