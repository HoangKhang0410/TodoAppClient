import React, { useState } from 'react';
import axiosConfig from '../apiConfig/axiosConfig';

const Task = ({ task, setData }) => {
    const [isTick, setIsTick] = useState(task.isDone);
    const [isEdit, setIsEdit] = useState(false);

    const [newTask, setNewTask] = useState({
        title: task.title,
        description: task.description,
        isDone: task.isDone,
    });

    const handleTitle = (e) => {
        setNewTask((prev) => {
            return { ...prev, title: e.target.value };
        });
    };

    const handleDescription = (e) => {
        setNewTask((prev) => {
            return { ...prev, description: e.target.value };
        });
    };

    const handleIsDone = (e) => {
        setNewTask((prev) => {
            return { ...prev, isDone: e.target.checked };
        });
        // setIsTick(e.target.checked);
    };

    const handleTick = async (task) => {
        const response = await (await axiosConfig.patch(`updateTask/${task._id}`, { isDone: !isTick })).data;
        setIsTick(!isTick);
    };

    const handleUpdate = async () => {
        const response = await (await axiosConfig.patch(`updateTask/${task._id}`, { ...newTask })).data;
        setData((prev) => {
            return prev.map((task) => {
                if (task._id === response.newTask._id) {
                    return response.newTask;
                }
                return task;
            });
        });
        setIsTick(response.newTask.isDone);
        setIsEdit(false);
    };

    const handleDeleteTask = async () => {
        await axiosConfig.delete(`deleteTask/${task._id}`);
        setData((prev) => {
            return prev.filter((item) => item._id !== task._id);
        });
    };

    if (!isEdit) {
        return (
            <div className="singleTask">
                <div className={`info ${isTick ? 'done' : ''}`}>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                </div>
                <div className="options">
                    <input type="checkbox" onChange={() => handleTick(task)} checked={isTick} />
                    <i className="fa-solid fa-pen-to-square" onClick={() => setIsEdit(true)}></i>
                    <i className="fa-solid fa-trash-can" onClick={handleDeleteTask}></i>
                </div>
            </div>
        );
    } else {
        return (
            <div className="singleTask">
                <div className="info">
                    <input type="text" onChange={handleTitle} defaultValue={task.title} />
                    <textarea
                        style={{ height: '100px' }}
                        defaultValue={task.description}
                        onChange={handleDescription}
                    ></textarea>
                    <div className="checkbox-wrapper">
                        <input
                            type="checkbox"
                            id="bruh"
                            defaultChecked={task.isDone}
                            onChange={handleIsDone}
                            style={{ margin: '0 5px', cursor: 'pointer' }}
                        />
                        <label htmlFor="bruh">Done?</label>
                    </div>
                </div>
                <div className="options">
                    <button onClick={handleUpdate}>Update</button>
                    <button onClick={() => setIsEdit(false)}>Cancel</button>
                </div>
            </div>
        );
    }
};

export default Task;
