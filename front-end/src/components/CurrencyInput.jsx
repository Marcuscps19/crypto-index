import React from 'react';

function CurrencyInput({code, value}) {
        return (
            <label htmlFor={code}>
                {code}
                <input value={value} name={code} type="text" disabled />
            </label>
        )
}

export default CurrencyInput;