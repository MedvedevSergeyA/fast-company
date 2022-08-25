import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import API from "../API";
import { useHistory } from "react-router-dom";
import QualitiesList from "./qualitiesList";
import Loader from "./loader/loader";

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
                <div className="container">
                    <div className="d-flex flex-column align-items-center text-center position-relative">
                        <h1>User Information</h1>
                        <h2>Name: {user.name}</h2>
                        <span>
                            Completed Meetings: {user.completedMeetings}
                        </span>
                        <span>Rate: {user.rate}</span>
                        <span>Profession: {user.profession.name}</span>
                        <span>
                            Qualities:
                            <QualitiesList qualities={user.qualities} />
                        </span>
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                handleBackToUserList();
                            }}
                        >
                            Назад
                        </button>
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
