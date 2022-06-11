import React, { useState } from 'react';
import axiosConfig from '../apiConfig/axiosConfig';

const NewTask = ({ setIsShow, setData, singleTask = null }) => {
    const [task, setTask] = useState({
        title: '',
        description: '',
    });

    const handleTitle = (e) => {
        setTask((prev) => {
            return { ...prev, title: e.target.value };
        });
    };

    const handleDescription = (e) => {
        setTask((prev) => {
            return { ...prev, description: e.target.value };
        });
    };

    const handleSubmit = async () => {
        const response = await (await axiosConfig.post('createTask', { ...task })).data;
        setData((prev) => [...prev, response.newTask]);
        setIsShow(false);
    };

    return (
        <>
            <div className="form">
                <input type="text" placeholder="Your Title" onChange={handleTitle} value={singleTask?.title} />
                <textarea placeholder="Your Description" onChange={handleDescription} value={singleTask?.description} />
                <div className="formBtn">
                    <button onClick={handleSubmit}>Submit</button>
                    <button onClick={() => setIsShow(false)}>Cancel</button>
                </div>
            </div>
            <div className="overlay"></div>
        </>
    );
};

export default NewTask;
