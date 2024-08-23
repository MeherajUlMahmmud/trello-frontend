import React from 'react';
import { ButtonProps } from '../../types/Button';

const Button = ({ text, type, className, isDisabled = false, onClick }: ButtonProps) => {
	return (
		<button
			type={type}
			className={className}
			disabled={isDisabled}
			onClick={onClick}
		>
			<span dangerouslySetInnerHTML={{ __html: text }} />
		</button>
	)
}

export default Button;
