import React from "react";
import { useParams } from "react-router-dom";

const UserPage = () => {
    const params = useParams();
    console.log(params);
    return (
        <div>
            <h1>Вы попали на страницу пользователя с ID {params.id}</h1>
        </div>
    );
};

export default UserPage;
