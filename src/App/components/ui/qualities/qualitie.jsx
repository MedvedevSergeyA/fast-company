import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";

const Qualities = ({ id }) => {
    const { getQualities } = useQualities();
    const { _id, color, name } = getQualities(id);

    return (
        <span key={_id} className={"badge m-1 bg-" + color}>
            {name}
        </span>
    );
};

Qualities.propTypes = {
    id: PropTypes.string
};

export default Qualities;
