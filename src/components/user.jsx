import React from "react";
import Qualities from "./qualitie";
import BookMark from "./bookmark";
import PropTypes from "prop-types";


const User = ({ users, ...rest }) => {
    return (
        <>
            <tr>
                <td>{users.name}</td>
                <td>
                    {users.qualities.map((item) => (
                        <Qualities
                            key={item._id}
                            name={item.name}
                            color={item.color}
                            _id={item._id}
                        />
                    ))}
                </td>
                <td>{users.profession.name}</td>
                <td>{users.completedMeetings}</td>
                <td>{users.rate}/5</td>
                <td>
                    {
                        <BookMark
                            status={users.bookmark}
                            setToggle={rest.important}
                            usId={rest.id}
                        />
                    }
                </td>
                <td>
                    <button
                        className={"btn btn-danger"}
                        onClick={() => rest.onClick(users._id)}
                    >
                        Удалить
                    </button>
                </td>
            </tr>
        </>
    );
};

User.propTypes = {
    users: PropTypes.array.isRequired
};


export default User;
