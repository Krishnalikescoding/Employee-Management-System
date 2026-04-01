import React, { createContext, useContext, useEffect, useState } from "react";
import { getLocalStorage } from "../utils/localStorage";

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [userData, setUserData] = useState(null)

    useEffect(() => {
        const { employees, admin } = getLocalStorage()
        setUserData({ employees, admin })
    },[])
    return (
        <div>
            <AuthContext>
                {children}
            </AuthContext>
        </div>
    )
}

export default AuthProvider