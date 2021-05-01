import React from "react";
import { useRecoilValue } from "recoil";
import CustomerHomePage from "../components/pages/customerHomePage/CustomerHomePage";
import LandingPage from "../components/pages/LandingPage";
import SalesmanHomePage from "../components/pages/salesmanHomePage/SalesmanHomePage";
import { accessTokenWithRoles } from "../recoil/tokens";

const HomePageRouting: React.FC = () => {
    const roles = useRecoilValue<Roles>(accessTokenWithRoles);
    if (roles.isCustomer) {
        return <CustomerHomePage />;
    } else if (roles.isSalesman) {
        return <SalesmanHomePage />;
    } else {
        return <LandingPage />;
    }
};

export default HomePageRouting;
