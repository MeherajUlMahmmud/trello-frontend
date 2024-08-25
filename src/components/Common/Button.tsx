import { ButtonProps } from '../../types/Button';

const Button = ({ icon, text, type, className, isDisabled = false, onClick, style }: ButtonProps) => {
	return (
		<button
			type={type}
			className={className}
			disabled={isDisabled}
			onClick={onClick}
			style={{
				...style,
				gap: icon && text ? '0.5rem' : '0rem',
			}}
		>
			{icon && <i className={icon}></i>}
			<span>{text}</span>
		</button>
	)
}

export default Button;
