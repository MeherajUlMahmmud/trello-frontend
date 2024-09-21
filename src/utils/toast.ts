import { Assets } from "./constants";

export interface CreateToastProps {
	id?: number;
	type: ToastType;
	title: string;
	description?: string;
	toastList: any[];
	setToastList: React.Dispatch<React.SetStateAction<any[]>>;
}

export interface ToastProps extends CreateToastProps {
	backgroundColor: ToastColor;
	icon: string;
}

export enum ToastType {
	Success = "success",
	Warning = "warning",
	Error = "error",
	Info = "info",
}

export enum ToastPosition {
	TopRight = "top-right",
	TopLeft = "top-left",
	BottomRight = "bottom-right",
	BottomLeft = "bottom-left",
}

export enum ToastColor {
	Success = "#5cb85c",
	Warning = "#f0ad4e",
	Error = "#d9534f",
	Info = "#5bc0de",
}

const toastTypeMap: Record<
	ToastType,
	{ backgroundColor: ToastColor; icon: string }
> = {
	[ToastType.Success]: {
		backgroundColor: ToastColor.Success,
		icon: Assets.toastCheck,
	},
	[ToastType.Warning]: {
		backgroundColor: ToastColor.Warning,
		icon: Assets.toastWarning,
	},
	[ToastType.Error]: {
		backgroundColor: ToastColor.Error,
		icon: Assets.toastError,
	},
	[ToastType.Info]: {
		backgroundColor: ToastColor.Info,
		icon: Assets.toastInfo,
	},
};

export const createToastMessage = (toast: CreateToastProps) => {
	const { type, title, description, toastList, setToastList } = toast;

	const { backgroundColor, icon } = toastTypeMap[type];

	const newToast: ToastProps = {
		id: Math.floor(Math.random() * 101 + 1),
		type,
		title,
		description,
		backgroundColor,
		icon,
		toastList,
		setToastList,
	};

	setToastList([...toastList, newToast]);
};
