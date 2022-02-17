import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../contexts/Login';
import axios from 'axios';

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
        <form onSubmit={onSubmit}>
            {/* Image Source: https://giphy.com/gifs/joinhoney-f9qwUQW56qC7BeCfCM */}
            {/* <img src='https://media1.giphy.com/media/f9qwUQW56qC7BeCfCM/giphy.gif?cid=ecf05e477e0wmxie7c3qpjgoofgz7gby1mbyjdlqkblkrhku&rid=giphy.gif&ct=g' alt='gif de uma moeda andando' /> */}
            <h1>Crypto App</h1>
            <label htmlFor="email">
                <input
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
            <span>{values.errorMessage}</span>
        </form>
    )
}

export default Login;