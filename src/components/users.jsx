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
                    <tbody><User users={users} onClick={rest.onDelete} important={rest.onToggle}/></tbody>
                </table>
        </>
    )
};

export default Users;