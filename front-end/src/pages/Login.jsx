import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';

function Login() {
    const navigate = useNavigate();
    const initialState = () => ({
        email: '',
        password: '',
        errorMessage: null,
      });
    const API_URL = process.env.REACT_APP_URL || 'http://localhost:3001';
    const [values, setValues] = useState(initialState);



    const onChange = (event) => {
        const { value, name } = event.target;
        setValues({
            ...values,
            [name]: value,
            errorMessage: null,
        })
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = values;
        try {
            const { data: { token } } = await axios.post(`${API_URL}/api/login`, 
            { email, password });
            localStorage.setItem("token", JSON.stringify(token));
            navigate('/')
        } catch({response}) {
            setValues({
                ...values,
                errorMessage: response.data.message,
            });
        }
    };

    return (
        <div className="container">
           <Header />
            <div className="container-body">
                <div className="container-form">
                    <h2 className="form-title">Login</h2>
                    <form className="form-login" onSubmit={onSubmit}>
                        <div className="form-data">
                            <label htmlFor="email">
                            <input
                                autoComplete='off'
                                name="email"
                                type="email"
                                value={ values.email }
                                onChange={ onChange }
                                required
                                placeholder="Digite seu e-mail"
                            />
                            </label>
                            <label htmlFor="password">
                                <input
                                    name="password"
                                    type="password"
                                    value={ values.password }
                                    onChange={ onChange }
                                    required
                                    placeholder="Digite sua senha"
                                />
                            </label>
                            <button
                                type="submit"
                            >
                                Entrar
                            </button>
                            <span className='error-message'>{values.errorMessage}</span>
                        </div>
                    </form>
                </div>
                <aside className="aside-info">
                    <h3>Verifique o valor do Bitcoin na quantidade desejada</h3>
                    <p>Valores em:</p>
                    <ul>
                        <li>- Dólar americano</li>
                        <li>- Dólar canadense</li>
                        <li>- Euro</li>
                        <li>- Real</li>
                    </ul>
                    <p>Atualize os valores da cotação do Dólar Canadense, Euro e Real.</p>
                </aside>
            </div>
        </div>
    )
}

export default Login;