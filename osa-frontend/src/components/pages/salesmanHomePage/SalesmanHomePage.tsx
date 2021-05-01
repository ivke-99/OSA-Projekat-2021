import React from "react";
import { useRecoilValue } from "recoil";
import { accessTokenWithRoles } from "../../../recoil/tokens";
import SalesmanPanel from "./SalesmanPanel";

const SalesmanHomePage: React.FC = () => {
    const { isSalesman } = useRecoilValue(accessTokenWithRoles);
    if (isSalesman) return <SalesmanPanel />;
    else return null;
};

export default SalesmanHomePage;
