import React, { useState, useEffect } from 'react';
import axios from 'axios';
import setAuthToken from '../../AxiosHelper/axios';
import './Action.css';

export default function Update({ id }) { // Получаем id через пропсы
    const [title, setTitle] = useState(''); 
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    setAuthToken(token);
                    if (!id) {
                        setError('Invalid task ID.');
                        return;
                    }
                    const res = await axios.get(`http://localhost:8080/api/task/${id}`);
                    setTitle(res.data.title); // Предполагается, что res.data содержит задачу с полем title
                } else {
                    setError('No token found. Please log in.');
                }
            } catch (error) {
                setError('Error fetching task');
                console.error(error.response ? error.response.data : error.message);
            }
        };

        fetchTask();
    }, [id]);

    const handleChange = (e) => {
        setTitle(e.target.value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            setError('No token found. Please log in.');
            return;
        }

        try {
            const res = await axios.put(
                `http://localhost:8080/api/task/${id}`, 
                { title },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(res.data); 
        } catch (error) {
            setError('Error updating task');
            console.error(error.response ? error.response.data : error.message);
        }
    };

    return (
        <div>
            <form onSubmit={onSubmit} className='post_form'>
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
            {error && <p className="error_message">{error}</p>} {/* Вывод ошибки с классом */}
        </div>
    );
}
