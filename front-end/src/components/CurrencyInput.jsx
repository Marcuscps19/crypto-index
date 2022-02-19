import React from 'react';

const formatByLocation = (local, value, code) => value
    .toLocaleString(local, {style: 'currency', currency: code, minimumFractionDigits: 4})



export const formatValue = (code, value) => {
    switch (code) {
        case 'BRL': return (formatByLocation('pt-BR', value, code));
        case 'CAD': return formatByLocation('en-CA' , value, code);
        case 'EUR': return formatByLocation('de-DE', value, code);
        default: return formatByLocation('en-US', value, code);
    }
}

function CurrencyInput({code, value}) {
        return (
            <label htmlFor={code}>
                {code}
                <input value={formatValue(code, value)} name={code} type="text" disabled />
            </label>
        )
}

export default CurrencyInput;