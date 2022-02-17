import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import axios from 'axios';
import { CurrenciesContext } from '../contexts/Currencies';
import CurrencyInput from '../components/CurrencyInput';
function Home() {
    const navigate = useNavigate()
    const {values, setValues} = useContext(CurrenciesContext);
    const { currencies, btc, errorMessage } = values;
    
    useEffect(() => {
        getCurrencies();
    }, [])

    const formatToUSADollar = (value) => value.toLocaleString('eu-US')

    const updateCurrencies = (value) => 
        currencies.map((currency) =>  {
            const calculatedRate = value ? currency['rate_float'] * value : currency['calculated_rate'];
    
               if(currency['code'] !== 'BTC') {
                 return ({ ...currency, 'calculated_rate': formatToUSADollar(calculatedRate) });
               }
               return currency;
            });
    

    const onChange = (event) => {
        const { value } = event.target;
        const updatedCurrencies = updateCurrencies(value);
        setValues({
            currencies: updatedCurrencies,
            btc: value,
            errorMessage: null,
        });
    }

    const fetchCurrencies = async () => {
        const token = JSON.parse(localStorage.getItem('token'));
        const headers = { headers: {
            'Authorization': token,
        }}
        return axios.get('http://localhost:3001/api/crypto/btc', headers);
    }

    const formatCurrencies = ((currencies) => { 
        const values = Object.values(currencies);
        return values.map((value) => ({...value, 'calculated_rate': formatToUSADollar(value['rate_float'])}))
    });
    
    const getCurrencies = async () => {
        try {
            const { data: { bpi } } = await fetchCurrencies()  
            setValues({
                ...values,
                currencies: formatCurrencies(bpi),
            });
        } catch({response}) {
            setValues({
                ...values,
                errorMessage: response.data.message,
            })
        }
    }
    return !currencies ? <h1>Loading...</h1> :
     (
        <form>
           <button onClick={() => navigate('/update-price')}>Atualizar valor monetário</button>
           <label htmlFor="BTC">
                BTC
                <input name="BTC" value={btc} onChange={ onChange } type="number" min={1} />
            </label>
            <div>
            {currencies.map((currency, key) => {
                if (currency['code'] !== 'BTC') {
                    return (
                        <CurrencyInput key={key} code={currency['code']} value={currency['calculated_rate']} />
                    )
                }
            })}
            </div>
            <span>{ errorMessage }</span>
        </form>
    )
}

export default Home;