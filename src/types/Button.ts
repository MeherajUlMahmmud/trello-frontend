export enum ButtonType {
	Button = "button",
	Submit = "submit",
	Reset = "reset",
}

export interface ButtonProps {
	icon?: string;
	text?: string;
	type: ButtonType;
	className: string;
	isDisabled?: boolean;
	onClick?: () => void;
	style?: React.CSSProperties;
}
