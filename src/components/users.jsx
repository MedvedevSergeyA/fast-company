import React from 'react';
import User from "./user"

const Users = ({users, ...rest}) => {

    return (
        <>
                <table className="table table-light">
                    <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился, раз</th>
                        <th scope="col">Оценка</th>
                        <th scope="col">Избранное</th>
                    </tr>
                    </thead>
                    <tbody>{users.map(user => (
                        <User key={user._id} users={user} onClick={rest.onDelete} important={rest.onToggle} id={user._id}/>
                    ))}
                    </tbody>
                </table>
        </>
    )
};

export default Users;