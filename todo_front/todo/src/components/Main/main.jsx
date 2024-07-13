import { Link } from 'react-router-dom'
import './main.css'
export default function Main() {

    return (
        <div className='main_content'>
            <div className="main_logo">
                <img src="./todo.png"/>
            </div>

            <div className="main_texts">
                <h1>Taskify</h1>
                <p>Plan, organize, achieve goals - with Taskify.</p>
            </div>
            
            <div className="main_btn">
                <Link to={'/login'}>Login</Link>
                <br />
                <Link to={'/register'}>Register</Link>
            </div>
        </div>
    )
}