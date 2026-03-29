import React from "react";
import TaskNumber from "../other/TaskNumber";
import TaskList from "../TaskList/TaskList";
import Header from "../other/Header";

const EmployeeDashboard = () => {
    return (
        <div>
            <div>
                <Header />
                <TaskNumber />
                <TaskList />
            </div>
        </div>
    )
}

export default EmployeeDashboard