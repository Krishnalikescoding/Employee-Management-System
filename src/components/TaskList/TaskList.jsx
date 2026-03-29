import React from 'react'
import "../../css/TaskList.css";


const TaskList = () => {
    return(
        <div className="Card-Container">
            <div className="Cards">
                <div className="header">
                    <div className="urgency">
                        <h2>High</h2>
                    </div>
                    <div className="assigned-date">
                        <h2>29th March, 2026</h2>
                    </div>
                </div>
                <div className="task-body">
                    <div className="task-title">
                        <h2>Create New Project</h2>
                    </div>
                    <div className="task-description">
                        <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, vitae. Necessitatibus perspiciatis eaque aspernatur eum harum dolor ipsam, ea eius quaerat numquam iusto repellat obcaecati quo maxime architecto deleniti alias cumque expedita aut doloremque officiis. Ipsam est, fuga nostrum accusamus in, cum eum laboriosam numquam vel soluta quibusdam veniam modi?</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskList