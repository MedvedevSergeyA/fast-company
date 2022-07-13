import React, {useState} from 'react';
import Qualities from './qualitie'
import BookMark from './bookmark'



const User = ({users}) => {


    return (
        <>
            {users.map((user) => (
                <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.qualities.map(item =>
                        <Qualities name={item.name} color={item.color} _id={item._id}/>
                    )}
                    </td>
                    <td>{user.profession.name}</td>
                    <td>{user.completedMeetings}</td>
                    <td>{user.rate}/5</td>
                    <td><button className={'btn btn-danger'} >Удалить</button></td>
                </tr>
            ))}
        </>
    );
};

export default User;