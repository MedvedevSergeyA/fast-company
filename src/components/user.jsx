import React, {useState} from 'react';
import Qualities from './qualitie'
import BookMark from './bookmark'



const User = ({users, ...rest}) => {

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
                    <td>{<BookMark status={user.bookmark} setToggle={rest.important}/>}</td>
                    <td><button className={'btn btn-danger'} onClick={() => rest.onClick(user._id)}>Удалить</button></td>
                </tr>
            ))}
        </>
    );
};

export default User;