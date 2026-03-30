import React from "react";
import "../../css/AdminDashBoardTaskList.css"

const AdminDashBoardTaskList = () => {
    return (
        <div className="main-container">
            <h2>Tasks Assigned By You</h2>
            <div className="taskList-container">

                {/* Header Row */}
                <div className="taskList-header">
                    <span>Assigned To</span>
                    <span>Task</span>
                    <span>Status</span>
                </div>

                {/* Task Rows */}
                <div className="taskList">
                    <div className="assignedTo">Krishna Gupta</div>
                    <div className="assignedTask">Make a UI Design</div>
                    <div className="status completed">Completed</div>
                </div>
                <div className="taskList">
                    <div className="assignedTo">Krishna Gupta</div>
                    <div className="assignedTask">Make a UI Design</div>
                    <div className="status failed">Failed</div>
                </div>
                <div className="taskList">
                    <div className="assignedTo">Krishna Gupta</div>
                    <div className="assignedTask">Make a UI Design</div>
                    <div className="status accepted">Accepted</div>
                </div>
                <div className="taskList">
                    <div className="assignedTo">Krishna Gupta</div>
                    <div className="assignedTask">Make a UI Design</div>
                    <div className="status completed">Completed</div>
                </div>
                <div className="taskList">
                    <div className="assignedTo">Krishna Gupta</div>
                    <div className="assignedTask">Make a UI Design</div>
                    <div className="status completed">Completed</div>
                </div>

            </div>
        </div>
    )
}

export default AdminDashBoardTaskList