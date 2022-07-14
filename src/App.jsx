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
         return users.map(mark => {
             if (mark._id === id) {
                 mark.bookmark = !mark.bookmark
             }
         })
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