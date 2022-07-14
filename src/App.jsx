import React, {useState} from 'react';
import Users from "./components/users";
import SearchStatus from "./components/searchStatus"
import api from "./API"

const App = () => {
    const [users, setUsers] = useState(api.users.fetchAll())

    const handleDelete = (userId) => {
        setUsers(users.filter(user => user._id !== userId))
    }

    const handleToggleBookMark = (id) => {
        setUsers(users.map(mark => {
            if (mark._id === id) {
                return {...mark, bookmark: !mark.bookmark}
            } else {
                return mark
            }
        }))
    }


    return (
        <>
            <SearchStatus length={users.length}/>
            <Users
                users={users}
                onDelete = {handleDelete}
                onToggle={handleToggleBookMark}
            />
        </>
    )

};

export default App;