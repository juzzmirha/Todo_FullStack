import { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/authenticate', credentials);
            localStorage.setItem('token', response.data.token);
            navigate('/home');
        } catch (error) {
            setError('Invalid username or password');
            console.error(error);
        }
    };

    return (
        <form onSubmit={(e) => onSubmit(e)} className='login'>
            <div className="form_title">
                <h1>Login</h1>
                <p>Please enter your login and password</p>
            </div>

            <div className="form_inputs">
                <input type="text" 
                    placeholder='Username'
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}/>
                <br />
                <input type="password" 
                    placeholder='Password'
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}/>
            </div>

            {error && <p style={{color: 'red'}}>{error}</p>}

            <div className="form_forget">
                <a href="#">
                    Forget Password?
                </a>
            </div>

            <div className="form_btn">
                <button type='submit'>Login</button>
            </div>
        </form>
    );
}
