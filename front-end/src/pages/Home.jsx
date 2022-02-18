import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CurrenciesContext } from '../contexts/Currencies';
import CurrencyInput from '../components/CurrencyInput';
function Home() {
    const navigate = useNavigate()
    const {values, setValues} = useContext(CurrenciesContext);
    const { currencies, btc, errorMessage } = values;
    
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
                <CurrencyInput key={key} code={currency['code']} value={currency['calculated_rate']} />
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
            errorMessage: null,
        });
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
            {createCurrenciesInputs()}
            </div>
            <span>{ errorMessage }</span>
        </form>
    )
}

export default Home;