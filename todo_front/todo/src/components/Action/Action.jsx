import { useState } from 'react';
import './Action.css';
import axios from 'axios';

export default function Action() {
    const [title, setTitle] = useState('');
    const [error, setError] = useState(null);
    
    const handleChange = (e) => {
        setTitle(e.target.value);
    };

    const onSubmit = async(e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            setError('No token found. Please log in.');
            return;
        }

        try {
            const res = await axios.post(
                'http://localhost:8080/api/task', 
                { title },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(res.data); 
        } catch (error) {
            setError('Error creating task');
            console.error(error);
        }
    };

    return (
        <div>
            <form onSubmit={(e) => onSubmit(e)} className='post_form'>
                <input 
                    type="text"
                    name="title"
                    value={title}
                    onChange={handleChange}
                    placeholder="Task Title"
                    required
                />
                <div className="post_btn">
                    <button type="submit"><i className="fa-solid fa-arrow-right"></i></button>
                </div>
                
            </form>
        </div>
    );
}
