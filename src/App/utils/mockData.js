import { useEffect, useState } from "react";
import professions from "../2. mockData/professions.json";
import qualities from "../2. mockData/qualities.json";
import users from "../2. mockData/users.json";
import httpService from "../services/http.service";

const useMockData = () => {
    const statusConsts = {
        idle: "Not Started",
        panding: "In Process",
        successed: "Ready",
        error: "Error occured"
    };
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(statusConsts.idle);
    const [progress, setProgress] = useState(0);
    const [count, setCount] = useState(0);
    const summuryCount = professions.length + qualities.length + users.length;

    const incrementCount = () => {
        setCount((prevState) => prevState + 1);
    };
    const updateProgress = () => {
        if (count !== 0 && status === statusConsts.idle) {
            setStatus(statusConsts.panding);
        }
        const newProgress = Math.floor((count / summuryCount) * 100);
        if (progress < newProgress) {
            setProgress(() => newProgress);
        }
        if (newProgress === 100) {
            setStatus(statusConsts.successed);
        }
    };

    useEffect(() => {
        updateProgress();
    }, [count]);

    async function initialize() {
        try {
            for (const prof of professions) {
                await httpService.put("profession/" + prof._id, prof);
                incrementCount();
            }
            for (const qual of qualities) {
                await httpService.put("quality/" + qual._id, qual);
                incrementCount();
            }
            for (const user of users) {
                await httpService.put("user/" + user._id, user);
                incrementCount();
            }
        } catch (error) {
            setError(error);
            setStatus(statusConsts.error);
        }
    }

    return { error, initialize, progress, status };
};
export default useMockData;