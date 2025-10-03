import { forwardRef, useState } from 'react';
import { TextInput } from '@mantine/core';
import classes from './FloatingLabelInput.module.css';

const Input = forwardRef(function Input({ label, className = "", type, ...props }, ref) {
    const [focused, setFocused] = useState(false);
    // The `props.value` will come from react-hook-form
    const floating = (props.value && String(props.value).trim().length !== 0) || focused || undefined;

    // Get the onFocus and onBlur from react-hook-form's props
    const { onFocus, onBlur, ...restProps } = props;

    return (
        <TextInput
            ref={ref}
            type={type}
            label={label}
            required
            classNames={classes}
            mt="md"
            autoComplete="nope"
            data-floating={floating}
            labelProps={{ 'data-floating': floating }}
            {...restProps} // Pass all props from react-hook-form
            onFocus={(e) => { setFocused(true); onFocus && onFocus(e); }}
            onBlur={(e) => { setFocused(false); onBlur && onBlur(e); }}
        />
    );
})
export default Input;