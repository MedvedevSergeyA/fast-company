import React from "react";
import CommentsList from "./CommentsList";
import AddAreaFiled from "./addAreaFiled";
import { orderBy } from "lodash";
import { useComments } from "../../hooks/useComments";

const CommentsComponent = () => {
    const { createComment, comments, removeComment } = useComments();

    const handleSubmit = (data) => {
        createComment(data);
        // API.comments
        //     .add({ ...data, pageId: userId })
        //     .then((data) => setComments([...comments, data]));
    };
    const handleRemove = (id) => {
        removeComment(id);
        // API.comments.remove(id).then((id) => {
        //     setComments(comments.filter((x) => x._id !== id));
        // });
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
