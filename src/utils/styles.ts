export class CommonStyles {}

export class DashboardSidebarStyles {
	static sidebar = "p-5 w-72 h-fit hidden md:block";
	static sidebarWrapper = "flex flex-col items-center gap-2 w-full";
	static sidebarHeaderWrapper =
		"flex justify-between items-center gap-2 text-lg w-full";
	static sidebarHeaderTitle = "text-sm font-medium text-white";
	static sidebarHeaderAddButton = "m-0 px-4 py-2 text-sm font-medium";

	static workspaceDropdownWrapper =
		"flex flex-col items-center gap-2 w-full rounded";
	static workspaceDropdownButton =
		"flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-left rounded-md hover:bg-gray-100 hover:text-black";

	static workspaceDropdownButtonSelected = "bg-gray-100 text-black";
	static workspaceDropdownButtonNotSelected = "text-white";
	static workspaceDropdownTitleWrapper = "flex items-center gap-2";

	static workspaceDropdownList = "flex flex-col gap-2 w-52";
	static workspaceDropdownItem =
		"flex items-center px-4 py-2 text-sm font-medium rounded-md cursor-pointer gap-2 w-full";
	static workspaceDropdownItemSelected =
		"bg-gray-100 text-black hover:bg-gray-100";
	static workspaceDropdownItemNotSelected =
		"text-white hover:bg-gray-500 hover:text-black";
}

export class ModalStyles {
	static modalBg =
		"fixed inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 z-10";
	static modalContent =
		"relative bg-[#333c44] w-4/5 md:w-3/5 lg:w-2/5 max-h-[80%] p-4 rounded-md border overflow-y-auto";
	static modalCloseButtonWrapper =
		"absolute top-4 right-4 flex items-center gap-2 cursor-pointer";
	static modalCloseButton =
		"fa-solid fa-xmark text-red-500 hover:text-white hover:bg-red-500 p-2 rounded-md";
	static modalHeaderWrapper =
		"flex flex-col items-center justify-center gap-2 p-2 text-2xl font-bold text-white";
	static modalTitle =
		"text-center text-white text-xl md:text-xl lg:text-2xl font-bold";
	static modalDescription =
		"text-center text-white text-sm md:text-base lg:text-lg font-medium";
	static modalActionsWrapper = "flex justify-start items-center gap-2 w-full";
}

export class ToastStyles {
	static toastWrapper = "fixed z-50 space-y-4";
	static toast = "flex items-center w-96 p-4 rounded-md shadow-lg text-white";
	static closeButton = "text-xl mr-4 focus:outline-none";
	static toastIconWrapper = "flex-shrink-0";
	static toastIcon = "w-6 h-6";
	static toastContentWrapper = "ml-4";
	static toastTitle = "font-semibold";
	static toastDescription = "text-sm";
}
