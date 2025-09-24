import { forwardRef, useState } from 'react';
import { TextInput } from '@mantine/core';
import classes from './FloatingLabelInput.module.css';

const Input= forwardRef( function Input({label, className="", type}, ref) {
    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState('');
    const floating = value.trim().length !== 0 || focused || undefined;

    return (
        <TextInput
        ref={ref}
        type={type}
            label={label}
            // placeholder="OMG, it also has a placeholder"
            required
            classNames={classes}
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            mt="md"
            autoComplete="nope"
            data-floating={floating}
            labelProps={{ 'data-floating': floating }}
            // {...props}
        />
    );
})
export default Input;