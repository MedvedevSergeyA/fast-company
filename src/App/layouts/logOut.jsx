import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

const LogOut = () => {
    const { logOut } = useAuth()
    useEffect(() => {
        logOut()
    }, [])
    return (
        <div>
            <h1>Loading</h1>
        </div>
    );
};

export default LogOut;
