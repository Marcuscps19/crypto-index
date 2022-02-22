import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { MessageContext } from '../contexts/Message';
import CurrencyInput from '../components/CurrencyInput';
import Loading from '../components/Loading';
import Header from '../components/Header';
import axios from 'axios';
function Home() {
    const navigate = useNavigate()
    const { message, setMessage } = useContext(MessageContext);
    const initialState = () => ({
        currencies: null,
        btc: 1,
      });
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
    const [values, setValues] = useState(initialState);
    const { currencies, btc } = values;


    useEffect(() => {
        getCurrencies();
      }, []);
    
      const formatCurrencies = ((currencies) => { 
        const values = Object.values(currencies);
        return values.map((value) => ({...value, 'calculated_rate': value['rate_float']}))
    });
    
      const fetchCurrencies = async () => {
        const token = JSON.parse(localStorage.getItem('token'));
        const headers = { headers: {
            'Authorization': token,
        }}
        return await axios.get(`${API_URL}api/crypto/btc`, headers);
    }
      
      const getCurrencies = async () => {
        try {
            const { data: { bpi } } = await fetchCurrencies()  
            setValues({
                ...values,
                currencies: formatCurrencies(bpi),
            });
        } catch({response}) {
            setMessage(response.data.message);
        }
      }
    
    const updateCurrencies = (value) => 
        currencies.map((currency) =>  {
            const calculatedRate = value ? currency['rate_float'] * value : 0;
               if(currency['code'] !== 'BTC') {
                 return ({ ...currency, 'calculated_rate': calculatedRate });
               }
               return currency;
            });
    const createCurrenciesInputs = () => currencies.map((currency, key) => {
        if (currency['code'] !== 'BTC') {
            return (
                <CurrencyInput 
                    key={key} 
                    code={currency['code']} 
                    value={currency['calculated_rate']} />
            )
        }
        return '';
    });

    const onChange = (event) => {
        const { value } = event.target;
        const updatedCurrencies = updateCurrencies(value);
        setValues({
            currencies: updatedCurrencies,
            btc: value,
        });
    }
    return !currencies ? <Loading /> :
     (
        <div className="container">
           <Header />
            <div className="container-body">
                <form className='form-home'>
                    <div className="container-btc-input">
                        <label htmlFor="BTC">
                            BTC:
                            <input name="BTC" value={btc} onChange={ onChange } type="number" min={1} />
                        </label>
                    </div>
                     <div className="container-currencies">
                        {createCurrenciesInputs()}
                    </div>
                    <span className='error-message'>{ message !== 'Valor inválido' ? message : '' }</span>
                    <button type="button" onClick={() => navigate('/update-price')}>Atualizar valor monetário</button>
                </form>
            </div>
        </div> 
    )
}

export default Home;