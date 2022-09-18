import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import API from "../../../API";
import { useHistory } from "react-router-dom";
import Loader from "../../loader/loader";
import UserCard from "../../ui/UserCard";
import QualitiesCard from "../../ui/QualitiesCard";
import MeetingsCard from "../../ui/MeetingsCard";
import CommentsComponent from "../../ui/CommentsComponent";

const UserPage = ({ userId }) => {
    const history = useHistory();
    const [user, setUser] = useState();
    useEffect(() => {
        API.users.getById(userId).then((data) => {
            setUser(data);
        });
    }, []);

    const handleBackToUserList = () => {
        history.push("/users");
    };

    return (
        <>
            {user ? (
                // <div className="container">
                //     <div className="d-flex flex-column align-items-center text-center position-relative">
                //         <h1>User Information</h1>
                //         <h2>Name: {user.name}</h2>
                //         <span>
                //             Completed Meetings: {user.completedMeetings}
                //         </span>
                //         <span>Rate: {user.rate}</span>
                //         <span>Profession: {user.profession.name}</span>
                //         <span>
                //             Qualities:
                //             <QualitiesList qualities={user.qualities} />
                //         </span>
                //         <button
                //             className="btn btn-primary"
                //             onClick={() => {
                //                 handleBackToUserList();
                //             }}
                //         >
                //             Изменить
                //         </button>
                //     </div>
                // </div>
                <div className="container">
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <button className='btn btn-primary mb-3' onClick={handleBackToUserList}>Назад</button>
                            <UserCard user={user}/>
                            <QualitiesCard user={user}/>
                            <MeetingsCard user={user}/>
                        </div>
                        <div className="col-md-8">
                            <CommentsComponent/>
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: 200
                    }}
                >
                    <Loader />
                </div>
            )}
        </>
    );
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
