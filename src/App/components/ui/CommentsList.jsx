import React from "react"
import PropTypes from "prop-types"
import Comments from "./Comments";

const CommentsList = ({ comments, onRemove }) => {
    return comments.map((comment) => (
        <Comments key={comment._id} {...comment} onRemove={onRemove} />
    ))
}

CommentsList.propTypes = {
    comments: PropTypes.array,
    onRemove: PropTypes.func
}

export default CommentsList
