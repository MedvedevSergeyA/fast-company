import React from "react";
import Qualities from "./qualitie";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";

const QualitiesList = ({ qualities }) => {
    const { isLoading } = useQualities();
    if (isLoading) return "Loading";
    return (
        <>
            {qualities
                ? qualities.map((qual) => <Qualities key={qual} id={qual} />)
                : []}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
