import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import Loader from "../../loader/loader";
import UserCard from "../../ui/UserCard";
import QualitiesCard from "../../ui/QualitiesCard";
import MeetingsCard from "../../ui/MeetingsCard";
import CommentsComponent from "../../ui/CommentsComponent";
import { useUser } from "../../../hooks/useUsers";
import { CommentsProvider } from "../../../hooks/useComments";

const UserPage = ({ userId }) => {
    const history = useHistory();
    const { getUserById } = useUser();
    const user = getUserById(userId);
    const handleBackToUserList = () => {
        history.push("/users");
    };

    return (
        <>
            {user ? (
                <div className="container">
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <button
                                className="btn btn-primary mb-3"
                                onClick={handleBackToUserList}
                            >
                                Назад
                            </button>
                            <UserCard user={user} />
                            <QualitiesCard user={user} />
                            <MeetingsCard user={user} />
                        </div>
                        <div className="col-md-8">
                            <CommentsProvider>
                                <CommentsComponent />
                            </CommentsProvider>
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
