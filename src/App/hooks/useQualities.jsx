import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import qualitiesService from "../services/qualities.service";
import PropTypes from "prop-types";
const QualitiesContext = React.createContext();

export const useQualities = () => {
    return useContext(QualitiesContext);
};

export const QualitiesProvider = ({ children }) => {
    const [qualities, setQualities] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getQualitiesList();
    }, []);
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    function getQualities(id) {
        return qualities.find((q) => q._id === id);
    }

    async function getQualitiesList() {
        try {
            const { content } = await qualitiesService.fetchAll();
            setQualities(content);
            setIsLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    return (
        <QualitiesContext.Provider
            value={{ qualities, isLoading, getQualities }}
        >
            {children}
        </QualitiesContext.Provider>
    );
};
QualitiesProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
