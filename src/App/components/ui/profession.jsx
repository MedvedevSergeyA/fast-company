import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getProfessionByIds, getProfessionLoadingStatus, loadProfessionList } from "../../store/profession";

const Profession = ({ id }) => {
    const dispatch = useDispatch()
    const prof = useSelector(getProfessionByIds(id))
    const isLoading = useSelector(getProfessionLoadingStatus())

    useEffect(() => {
        dispatch(loadProfessionList())
    }, [])

    if (!isLoading) {
        return <p>{prof.name}</p>;
    } else {
        return "loading...";
    }
};

Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
