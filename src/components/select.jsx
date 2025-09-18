import React, { forwardRef, useId } from 'react'

function Select({
    options,
    label,
    className = "",
    ...props

}, ref) {
    const id = useId();
    return (
        <div className='w-full'>
            {label && <label htmlFor={id} className=''>{label} </label>}
            <select
                id={id}
                {...props}
                ref={ref}
                className={`px-3 py-2 rounded-lg  text-black outline-none focus:bg-white border-gray-200 w-full duration-200 border  ${className}`}
            >
                {options?.map((option)=>(
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default forwardRef(Select);
