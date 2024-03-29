import React from "react";
import PropTypes from "prop-types";

const Qualities = ({ _id, color, name }) => {
    return (
        <span key={_id} className={"badge m-1 bg-" + color}>
            {name}
        </span>
    );
};

Qualities.propTypes = {
    color: PropTypes.string,
    name: PropTypes.string,
    _id: PropTypes.string
};

export default Qualities;
