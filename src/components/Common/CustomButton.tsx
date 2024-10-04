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
	isLoading?: boolean;
	isDisabled?: boolean;
	onClick?: (e: any) => void;
	style?: React.CSSProperties;
}

const CustomButton = ({ icon, text, type, className, isLoading = false, isDisabled = false, onClick, style }: ButtonProps) => {
	return (
		<Button className={`${className} gap-2 ${isDisabled ? 'cursor-not-allowed' : ''}`} type={type} onClick={onClick} disabled={isDisabled} style={style}>
			{
				isLoading ? (
					<i className="fa-solid fa-spinner fa-spin"></i>
				) : icon && <i className={icon}></i>
			}
			{
				isLoading ? (
					<span>Loading...</span>
				) : text && <span>{text}</span>
			}
		</Button>
	)
}

export default CustomButton;
