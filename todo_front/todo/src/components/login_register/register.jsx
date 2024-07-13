import { useState } from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

export default function Register(){

    let navigate = useNavigate()
    const [user, setUser] = useState({
        username: "",
        password: ""
    })
    const {username, password} = user;
    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    }
    const onSubmit = async(e) =>{
        e.preventDefault();
        await axios.post("http://localhost:8080/api/auth/register", user);
        navigate("/")
    }   

    return(
        <form onSubmit={(e) => onSubmit(e)} className='login'>
            <div className="form_title">
                <h1>Register</h1>
                <p>Please sign up to enter in</p>
            </div>

            <div className="form_inputs">
                <input type="text" 
                placeholder='Username'
                name="username"
                value={username}
                onChange={(e) => handleChange(e)}/>
                <br />
                <input type="password" 
                placeholder='Password'
                name="password"
                value={password}
                onChange={(e) => handleChange(e)}/>
            </div>

            <div className="form_forget">
                <a href="">
                    Forget Password?
                </a>
            </div>

            <div className="form_btn">
                <button type='submit'>Register</button>
            </div>
        </form>
    )
}
