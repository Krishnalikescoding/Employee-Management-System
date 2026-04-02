import React, { createContext, useState } from "react";
import { getLocalStorage } from "../utils/localStorage.jsx";

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const { employees, admin } = getLocalStorage()
    const [userData, setUserData] = useState({ employees, admin })

    return (
        <AuthContext.Provider value={userData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider