import React from 'react';
import Qualities from './qualitie'
import BookMark from './bookmark'



const User = ({users}) => {
    return (
        <>
            {users.map((user) => (
                <tr key={user._id}>
                    <td>{user.name}</td>
                    {/*<td>{user.qualities.map(item =>*/}
                    {/*    <span key={item._id}*/}
                    {/*          className={`badge bg-${item.color} m-1`}*/}
                    {/*    >{item.name}*/}
                    {/*            </span>*/}
                    {/*)}*/}
                    {/*</td>*/}
                    <td>{user.profession.name}</td>
                    <td>{user.completedMeetings}</td>
                    <td>{user.rate}/5</td>
                    {/*<td><button className={'btn btn-danger'} onClick={() => handleDelete(user._id)}>Удалить</button></td>*/}
                </tr>
            ))}
        </>
    );
};

export default User;