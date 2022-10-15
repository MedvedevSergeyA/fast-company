import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextAreaField from "../common/form/textAreaField";
import PropTypes from "prop-types";

const AddAreaFiled = ({ onSubmit }) => {
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        content: {
            isRequired: {
                message: "Комментарий не может быть пустым"
            }
        }
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    useEffect(() => {
        validate();
    }, [data]);

    const clearForm = () => {
        setData({});
        setErrors({});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        clearForm();
    };
    return (
        <div>
            <h1>Новый комментарий</h1>
            <form onSubmit={handleSubmit}>
                <TextAreaField
                    value={data.content || ""}
                    label="Комментарий"
                    name="content"
                    onChange={handleChange}
                    error={errors.content}
                />
                <div>
                    <button className="btn btn-primary">Опубликовать</button>
                </div>
            </form>
        </div>
    );
};

AddAreaFiled.propTypes = {
    onSubmit: PropTypes.func
};

export default AddAreaFiled;
