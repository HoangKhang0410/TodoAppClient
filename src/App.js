import { useEffect, useState } from 'react';
import './App.css';
import NewTask from './components/NewTask';
import Task from './components/Task';
import axios from './apiConfig/axiosConfig';

function App() {
    const [isShow, setIsShow] = useState(false);
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        const getAllTasks = async () => {
            const response = await (await axios.get('/getAllTasks')).data;
            setTasks(response.tasks);
        };
        getAllTasks();
    }, []);
    return (
        <>
            <div className="App">
                <h1>TODO APP</h1>
                <button className="createBtn" onClick={() => setIsShow(true)}>
                    Add Task
                </button>
                <div className="listTask">
                    {tasks?.map((task, index) => {
                        return <Task key={index} task={task} setData={setTasks} />;
                    })}
                </div>
            </div>
            {isShow && <NewTask setIsShow={setIsShow} setData={setTasks} />}
        </>
    );
}

export default App;
