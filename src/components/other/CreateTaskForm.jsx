import React from "react";
import backButton from "../../assets/back-button.svg";
import "../../css/CreateTaskForm.css"

const CreateTaskForm = () => {
    return (
        <div className="main-container">
            <div className="header">
                <div className="back-btn">
                    <span class="material-symbols-outlined">
                        arrow_circle_left
                    </span>
                    <div className="createTaskhead">
                    <h2>Create Task</h2>
                    </div>
                </div>
            </div>
            <form>
                <div className="task-title">
                    <h2>Task Title</h2>
                    <input type="text" placeholder="Ex: Make a UI design"/>
                </div>
                <div className="description">
                    <h2>Description</h2>
                    <textarea name="Task" id="task-description"></textarea>
                </div>
                <div className="date">
                    <h2>Date</h2>
                    <input type="date" name="submission-date" id="submission-date"/>
                </div>
                <div className="assignedTo">
                    <h2>Assign To</h2>
                    <input type="text" placeholder="Ex: Rahul"/>
                </div>
                <div className="category">
                    <h2>Category</h2>
                    <input type="text" placeholder="Ex: Design, Development"/>
                </div>
                <button className="createTask-btn">Create Task</button>
            </form>
        </div>
    )
}

export default CreateTaskForm