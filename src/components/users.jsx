import React from 'react';
import User from "./user"

const Users = ({users, ...rest}) => {

    // const renderPhrase = (number) => {
    //     const lastOne = Number(number.toString().slice(-1))
    //
    //
    //     if (number > 4 && number < 15) return 'Человек тусанет'
    //
    //     if([2, 3, 4].indexOf(lastOne) >= 0) return "Человека тусанут"
    //
    //     if(lastOne === 1) return "Человек тусанет"
    // }

    return (
        <>
                {/*<h2><span className={"badge bg-" + (users.length > 0 ? "primary" : "danger")}>*/}
                {/*    {users.length > 0? `${users.length} ${renderPhrase(users.length)} с тобой сегодня` : "С тобой никто не тусанет"}*/}
                {/*</span>*/}
                {/*</h2>*/}
                {/*{users.length > 0 &&*/}
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
                    {/*<tbody>{<User users={users}/>}</tbody>*/}
                </table>
        </>
    )
};

export default Users;