import React, { useEffect } from "react";
import { accessTokenWithRoles } from "../recoil/tokens";
import { useRecoilValue } from "recoil";
import { Route, useNavigate } from "react-router-dom";

const RoleRoute: React.FC<RoleRouteProps> = (props) => {
    const roles = useRecoilValue<Roles>(accessTokenWithRoles);
    const navigate = useNavigate();
    const navigateOnValidation = (propRoles: string[], roles: Roles) => {
        if (propRoles.includes("ADMIN") && roles.isAdmin) return true;
        if (propRoles.includes("SALESMAN") && roles.isSalesman) return true;
        if (propRoles.includes("CUSTOMER") && roles.isCustomer) return true;
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!navigateOnValidation(props.roles, roles)) navigate("/");
        }, 250);
        return () => clearTimeout(timer);
    }, [props.roles, navigate, roles]);

    return <Route {...props} />;
};

export default RoleRoute;
