import React, { useEffect, useState } from "react";
import Users from "./components/users";
import api from "./API";

const App = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        api.users.fetchAll().then((user) => setUsers(user))
    }, []);

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };

    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((mark) => {
                if (mark._id === id) {
                    return { ...mark, bookmark: !mark.bookmark };
                } else {
                    return mark;
                }
            })
        );
    };

    return (
        <>
            <Users
                users={users}
                onDelete={handleDelete}
                onToggle={handleToggleBookMark}
            />
        </>
    );
};

export default App;
