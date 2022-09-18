import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextAreaField from "../common/form/textAreaField";
import PropTypes from "prop-types";
import API from "../../API";
import SelectField from "../common/form/selectField";

const initialData = { userId: "", content: "" };
const AddAreaFiled = ({ onSubmit }) => {
    const [data, setData] = useState(initialData);
    const [users, setUsers] = useState({});
    const [errors, setErrors] = useState({});
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        userId: {
            isRequired: {
                message: "Выберите пользователя"
            }
        },
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
        API.users.fetchAll().then(setUsers);
    }, []);
    useEffect(() => {
        validate();
    }, [data]);

    const clearForm = () => {
        setData(initialData);
        setErrors({});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        clearForm();
    };
    const arrayOfUsers =
        users &&
        Object.keys(users).map((userId) => ({
            label: users[userId].name,
            value: users[userId]._id
        }));

    return (
        <div>
            <h1>Новый комментарий</h1>
            <form onSubmit={handleSubmit}>
                <SelectField
                    onChange={handleChange}
                    options={arrayOfUsers}
                    name="userId"
                    value={data.userId}
                    defaultOption="выберите пользователя"
                    error={errors.userId}
                />
                <TextAreaField
                    value={data.content}
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
