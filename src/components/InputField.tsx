import React from 'react'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


interface InputFieldProps {
	name: string;
	type: string;
	value: string;
	label: string;
	placeholder: string;
	onChange: (e: any) => void;
	isRequired?: boolean;
	autoFocus?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ name, type, value, label, placeholder, onChange, isRequired = false, autoFocus = false }) => {
	return (
		<div className="flex flex-col space-y-1.5">
			<Label htmlFor={name}>{label}</Label>
			<Input id={name} name={name} type={type} placeholder={placeholder} value={value} onChange={onChange} required={isRequired} autoFocus={autoFocus} />
		</div>
	);
}


export default InputField;
