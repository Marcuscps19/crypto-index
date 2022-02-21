import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageContext } from '../contexts/Message';
import { formatValue } from '../components/CurrencyInput';
import NumberFormat from 'react-number-format';
import axios from 'axios';
import Loading from '../components/Loading';
import Header from '../components/Header';

function UpdatePrice() {
    const { message, setMessage } = useContext(MessageContext);
    const navigate = useNavigate();
    const [currencyCode, setCurrencyCode] = useState('BRL');
    const [inputValue, setInputValue] = useState('');
    const [currencies, setCurrencies] = useState('');
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001'


    useEffect(() => {
        getActualCurrencies() 
    }, [])

    const getActualCurrencies = async () => {
        const token = JSON.parse(localStorage.getItem('token'));
        const headers = { headers: {
            'Authorization': token,
        }}
        try {
            const response = await axios.get(`https://murmuring-caverns-62079.herokuapp.com/api/currencies`, headers);
            setCurrencies(JSON.parse(response.data));
        } catch({ response }){
            setMessage(response.data.message);
        }

    }

    const onSelectChange = (event) => {
        setCurrencyCode(
            event.target.value,
        );
    }

    const onInputChange = (event) => {
        setInputValue(event.value);
    }

    const getCodesFromCurrencies = () => Object
    .entries(currencies)
    .map((currency, key) => <option key={key} value={currency[0]}>{currency[0]}</option>);

    const getActualCurrencyValue = () => Object
    .entries(currencies)
    .map((currency) => {
        if(currency[0] === currencyCode) {
           return formatValue(currency[0], parseFloat(currency[1]))
        }
        return '';
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
            setMessage(response.data.message);
            navigate('/');
        } catch({ response }) {
            setMessage(response.data.message);
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
        <div className="container">
            <Header />
            <div className="container-update-price">
                <form className="form-home" onSubmit={updateCurrency}>
                <button type="button" onClick={() => navigate('/')}>Voltar</button>
                <div className="form-update-price">
                    <label htmlFor="currency">
                        Moeda:
                        <select name="currency" onChange={ onSelectChange }>
                            {getCodesFromCurrencies()}    
                        </select>
                    </label>
                    <span className="actual-value">Valor atual: {getActualCurrencyValue()}</span>
                    <label htmlFor="new-value">
                        Novo valor:
                        <NumberFormat
                            className="input-new-value"
                            name="new-value"
                            thousandSeparator={true}
                            prefix={getPrefix()}
                            allowNegative={false}
                            onValueChange={onInputChange}
                            decimalSeparator='.'
                            required
                        />
                    </label>
                    <span className="error-message">{ message !== 'Valor inválido' ? '' : message }</span>
                </div>
                    <button type="submit">ATUALIZAR</button>
                </form>
            </div>
        </div>
    )
}

export default UpdatePrice;