import React, { useEffect, useState } from "react";
import CommentsList from "./CommentsList";
import AddAreaFiled from "./addAreaFiled";
import API from "../../API";
import { useParams } from "react-router";
import { orderBy } from "lodash";

const CommentsComponent = () => {
    const { userId } = useParams();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        API.comments
            .fetchCommentsForUser(userId)
            .then((data) => setComments(data));
    }, []);

    const handleSubmit = (data) => {
        API.comments
            .add({ ...data, pageId: userId })
            .then((data) => setComments([...comments, data]));
    };
    const handleRemove = (id) => {
        API.comments.remove(id).then((id) => {
            setComments(comments.filter((x) => x._id !== id));
        });
    };

    const filteredComments = orderBy(comments, ["created_at"], ["desc"]);
    return (
        <div className="mt-5">
            <div className="card mb-2">
                {" "}
                <div className="card-body">
                    <AddAreaFiled onSubmit={handleSubmit} />
                </div>
            </div>
            {filteredComments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr />
                        <CommentsList
                            comments={filteredComments}
                            onRemove={handleRemove}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CommentsComponent;
