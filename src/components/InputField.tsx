import React from 'react'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from './ui/textarea';


interface InputFieldProps {
	name: string;
	type: string;
	value: string;
	label?: string;
	placeholder?: string;
	labelClassName?: string;
	inputClassName?: string;
	onChange: (e: any) => void;
	onKeyDown?: (e: any) => void;
	isRequired?: boolean;
	autoFocus?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ name, type, value, label, placeholder, labelClassName, inputClassName, onChange, onKeyDown, isRequired = false, autoFocus = false }) => {
	return (
		<div className="flex flex-col space-y-1.5">
			<Label className={`text-white ${labelClassName}`} htmlFor={name}>{label}</Label>
			{
				type === "textarea" ? (
					<Textarea className={`${inputClassName}`} id={name} name={name} placeholder={placeholder || label} value={value} onChange={onChange} required={isRequired} autoFocus={autoFocus} />
				) : (
					<Input className={`${inputClassName}`} id={name} name={name} type={type} placeholder={placeholder || label} value={value} onChange={onChange} onKeyDown={onKeyDown || undefined} required={isRequired} autoFocus={autoFocus} />
				)
			}
		</div>
	);
}


export default InputField;
