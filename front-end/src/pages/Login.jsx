import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../contexts/Login';
import axios from 'axios';
import Header from '../components/Header';

function Login() {
    const { values, setValues } = useContext(LoginContext);
    const navigate = useNavigate();

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
            const { data: { token } } = await axios.post('http://localhost:3001/api/login', 
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
                    {/* Image Source: https://giphy.com/gifs/joinhoney-f9qwUQW56qC7BeCfCM
                <img src='https://media1.giphy.com/media/f9qwUQW56qC7BeCfCM/giphy.gif?cid=ecf05e477e0wmxie7c3qpjgoofgz7gby1mbyjdlqkblkrhku&rid=giphy.gif&ct=g' alt='gif de uma moeda andando' /> */}
                </aside>
            </div>
        </div>
    )
}

export default Login;