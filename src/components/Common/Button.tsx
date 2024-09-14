import { Button } from "@/components/ui/button";

export enum ButtonType {
	Button = "button",
	Submit = "submit",
	Reset = "reset",
}

export interface ButtonProps {
	icon?: string;
	text?: string;
	type: ButtonType;
	className?: string;
	isDisabled?: boolean;
	onClick?: () => void;
	style?: React.CSSProperties;
}

const CustomButton = ({ icon, text, type, className, isDisabled = false, onClick, style }: ButtonProps) => {
	return (
		<Button className={className} type={type} disabled={isDisabled} onClick={onClick} style={style}>
			{icon && <i className={icon}></i>}
			{text && <span>{text}</span>}
		</Button>
	)
}

export default CustomButton;
