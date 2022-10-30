import React, { useEffect, useState } from "react";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import { validator } from "../../../utils/validator";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useSelector } from "react-redux";
import { getQualities, getQualitiesLoadingStatus } from "../../../store/qualities";
import { getProfession, getProfessionLoadingStatus } from "../../../store/profession";

const EditUserPage = () => {
    const { currentUser, upDateUser } = useAuth();
    const history = useHistory();
    const [data, setData] = useState(currentUser);
    const professions = useSelector(getProfession())
    const professionLoading = useSelector(getProfessionLoadingStatus())
    const qualities = useSelector(getQualities())
    const qualitiesLoading = useSelector(getQualitiesLoadingStatus())


    const [errors, setErrors] = useState({});

    const professionsList = professions.map((prof) => ({
        label: prof.name,
        value: prof._id
    }));
    const qualitiesList = qualities.map((item) => ({
        label: item.name,
        value: item._id
    }));

    const transformData = (data) => {
        const setQual = data.map((id) =>
            qualitiesList.find((q) => q.value === id)
        );
        return setQual;
    };
    useEffect(() => {
        if (!professionLoading && !qualitiesLoading && currentUser && !data) {
            setData({
                ...currentUser,
                qualities: transformData(currentUser.qualities)
            });
        }
    }, [professionLoading, qualitiesLoading, currentUser, data]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();

        if (!isValid) return;

        const newData = {
            ...data,
            qualities: data.qualities.map((q) => q.value)
        };

        try {
            await upDateUser(newData);
            history.push("/users");
        } catch (error) {
            setErrors(error);
        }
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен не корректно"
            }
        },
        name: {
            isRequired: {
                message: "Имя обязательно к заполнению"
            }
        }
    };
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    useEffect(() => {
        validate();
    }, [data]);

    const isValid = Object.keys(errors).length === 0;
    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Электронная почта"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    error={errors.email}
                />
                <TextField
                    label="Имя"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    error={errors.name}
                />
                <SelectField
                    defaultOption="Choose..."
                    onChange={handleChange}
                    name="profession"
                    options={professionsList}
                    error={errors.profession}
                    value={data.profession}
                    label="Выберите вашу профессию"
                />
                <RadioField
                    onChange={handleChange}
                    options={[
                        { name: "male", value: "male" },
                        { name: "female", value: "female" }
                    ]}
                    value={data.sex}
                    name="sex"
                    label="Выберите ваш пол"
                />
                <MultiSelectField
                    onChange={handleChange}
                    defaultValue={data.qualities}
                    options={qualitiesList}
                    name="qualities"
                    label="Выберите ваши качества"
                />
                <button
                    className="btn btn-primary w-100 mx-auto"
                    type="submit"
                    disabled={!isValid}
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default EditUserPage;
