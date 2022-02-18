import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CurrenciesContext } from '../contexts/Currencies';
import { formatValue } from '../components/CurrencyInput';
import NumberFormat from 'react-number-format';
import axios from 'axios';
import Loading from '../components/Loading';

function UpdatePrice() {
    const { values, setValues } = useContext(CurrenciesContext);
    const navigate = useNavigate();
    const [currencyCode, setCurrencyCode] = useState('BRL');
    const [inputValue, setInputValue] = useState('');
    const { currencies, errorMessage } = values;

    const onSelectChange = (event) => {
        setCurrencyCode(
            event.target.value,
        );
    }

    const onInputChange = (event) => {
        setInputValue(event.value);
    }

    const getCodesFromCurrencies = () => currencies.map((currency, key) => {
        if(currency['code'] !== 'USD' && currency['code'] !== 'BTC')
            return <option key={key} value={currency['code']}>{currency['code']}</option>
        return ''
    })

    const getActualCurrencyValue = () => currencies.map((currency) => {
        console.log(currency)
        if(currency['code'] === currencyCode) {
            return formatValue(currency['code'], currency['rate_float'])
        }
        return ''
    });

    const postCurrencies = async () => {
        const token = JSON.parse(localStorage.getItem('token'));

        const headers = {
            'Content-type': 'application/json',
            'Authorization': token,
        }
        return await axios.post('http://localhost:3001/api/crypto/btc', {
                "currency": currencyCode,
                "value": inputValue,
        }, { headers: headers });
    }

    const updateCurrency = async (event) => {
        event.preventDefault();
        try {
            const response = await postCurrencies();
            setValues({
                ...values,
                errorMessage: response.data.message,
            });
            navigate('/');
        } catch({ response }) {
            setValues({
                ...values,
                errorMessage: response.data.message,
            });
        }
    }

    const getPrefix = () => {
        switch (currencyCode) {
            case 'BRL': return 'R$';
            case 'EUR': return '€';
            default: return '$';
        }
    }

    return !currencies ? <Loading /> : (
        <div>
            <form onSubmit={updateCurrency}>
            <button type="buttton" onClick={() => navigate('/')}>Voltar</button>
            <label htmlFor="currency">
                    Moeda
                    <select name="currency" onChange={ onSelectChange }>
                        {getCodesFromCurrencies()}    
                    </select>
                    <span>Valor atual: {getActualCurrencyValue()}</span>
                    
                </label>
                <label htmlFor="new-value">
                    Novo valor:
                    <NumberFormat
                        name="new-value"
                        thousandSeparator={true}
                        prefix={getPrefix()}
                        allowNegative={false}
                        onValueChange={onInputChange}
                        decimalSeparator='.'
                        required
                    />
                </label>
                <span>{ errorMessage }</span>
                <button type="submit">ATUALIZAR</button>
            </form>
        </div>
    )
}

export default UpdatePrice;