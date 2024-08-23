export enum ButtonType {
	Button = "button",
	Submit = "submit",
	Reset = "reset",
}

export interface ButtonProps {
	text: string;
	type: ButtonType;
	className: string;
	isDisabled?: boolean;
	onClick?: () => void;
}
