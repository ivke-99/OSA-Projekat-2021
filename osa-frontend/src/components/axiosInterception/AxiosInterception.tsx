import React, { useEffect } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { accessTokenState } from "../../recoil/tokens";
import { useNavigate } from "react-router-dom";

const AxiosInterception: React.FC = (props) => {
    const setToken = useSetRecoilState(accessTokenState);
    const navigate = useNavigate();

    useEffect(() => {
        const resId = axios.interceptors.response.use(
            (response) => response,
            (error) => {
                return new Promise((resolve, reject) => {
                    if (error.response && error.response.status === 401) {
                        navigate("/internal/log-me-out");
                    }
                    return reject(error);
                });
            }
        );

        return () => axios.interceptors.response.eject(resId);
    }, [setToken, navigate]);

    return <>{props.children}</>;
};

export default AxiosInterception;
