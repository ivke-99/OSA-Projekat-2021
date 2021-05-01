import React from "react";
import { accessTokenIsAuthenticated } from "../recoil/tokens";
import { useRecoilValue } from "recoil";
import { Navigate, Route } from "react-router-dom";

const UnauthenticatedRoute: React.FC<RouteProps> = (props) => {
    const isAuth = useRecoilValue<boolean>(accessTokenIsAuthenticated);

    if (isAuth) {
        return <Navigate to="/" />;
    }

    return <Route {...props} />;
};

export default UnauthenticatedRoute;
