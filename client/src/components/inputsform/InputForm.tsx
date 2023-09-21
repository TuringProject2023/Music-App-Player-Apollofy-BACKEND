import {InputStyles} from './inputForm.styles';
import {ChangeEventHandler} from 'react';

type InputProps = {
	placeholder: string;
	type: string;
	value: string;
	name: string;
	handleChange: ChangeEventHandler<HTMLInputElement>;
	inputRef?: React.RefObject<HTMLInputElement>;
};

const InputForm = ({placeholder, type, value, name, handleChange, inputRef}: InputProps) => {
	return <InputStyles placeholder={placeholder} type={type} value={value} name={name} onChange={handleChange} ref={inputRef} />;
};

export default InputForm
