import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getProfessionByIds, getProfessionLoadingStatus, loadProfessionList } from "../../store/profession";

const Profession = ({ id }) => {
    const dispatch = useDispatch()

    const isLoading = useSelector(getProfessionLoadingStatus())

    const prof = useSelector(getProfessionByIds(id))
    useEffect(() => {
        dispatch(loadProfessionList())
    }, [])

    if (isLoading) return "Loading"
    return (
        <p>{prof.name}</p>
    )
};

Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
