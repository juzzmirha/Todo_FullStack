import { useEffect, useState } from 'react'
import './home.css'
import axios from "axios"
import setAuthToken from '../../AxiosHelper/axios.js';
import Action from '../Action/Action.jsx';
import Update from '../Action/Update.jsx';

export default function Home() {

    const [users, setUsers] = useState([]);
    const [modal, setModal] = useState(false);
    const [update, setUpdate] = useState(false);

    const [taskId, setTaskId] = useState(null); 

    const openUpdateForm = (id) => {
        setTaskId(id);
        setUpdate(true);
    };
    const loadUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            setAuthToken(token);
            
            const res = await axios.get("http://localhost:8080/api/task");
            setUsers(res.data);
        } catch (error) {
            console.error('Error loading users:', error);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleRemove = async (id) => {
        try {
            const token = localStorage.getItem('token');
            setAuthToken(token);
            
            await axios.delete(`http://localhost:8080/api/task/${id}`);
            loadTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <div className='home'>
            <h1>Taskify</h1>
            
            <div className='home_util'>
                <button onClick={() => setModal(true)}>Add</button> 
                
                <select name="" id="">
                    <option value="">All</option>
                </select>   
            </div>
            
            <div className="home_titles">
                {Array.isArray(users) ? (
                    users.map((user, index) => (
                        <div key={index} className='title'>
                            <div className='text'>
                                <h3>{user.title}</h3>
                                <p>{user.createdAt}</p>
                            </div>
                            <div className="home_actions">
                                <button className='delete_btn'>
                                    <i onClick={() => handleRemove(user.taskId)} class="fa-solid fa-trash"></i>
                                </button>
                                <button className='update_btn' onClick={() => openUpdateForm()}>
                                    <i class="fa-solid fa-pen-to-square"></i>
                                </button>
                            </div>
                        </div>
                        
                    ))
                ) : (
                    <p>Loading...</p>
                )} 
            </div>

            {modal && 
                <div className="post_title">
                    <h1>Create new task</h1>
                    <Action/>
                    <button className='close_btn' onClick={() => setModal(false)}>&times;</button>
                </div>
            }

            {
                update && <div className='post_title'>
                    <h1>Update your task</h1>
                        <Update id={taskId}/>
                    <button className='close_btn' onClick={() => setUpdate(false)}>&times;</button>
                </div>
            }
        </div>
    );
}
