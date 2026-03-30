import React from "react";
import Header from "../other/Header";
import CreateTaskForm from "../other/CreateTaskForm";
import AdminDashBoardTaskList from "../other/AdminDashBoardTaskList";


const AdminDashboard = () => {
    return (
        <>
            <Header />
            <CreateTaskForm />
            <AdminDashBoardTaskList />
        </>
    )
}

export default AdminDashboard