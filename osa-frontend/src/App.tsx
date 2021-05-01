import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import InternalLogMeOutPage from "./components/pages/InternalLogMeOutPage";
import CustomerSignUpPage from "./components/pages/signupPage/CustomerSignUpPage";
import SalesmanSignUpPage from "./components/pages/signupPage/SalesmanSignUpPage";
import { AuthenticatedRoute, UnauthenticatedRoute } from "./routing";
import HomePageRouting from "./routing/HomePageRouting";

export const App = () => (
    <MainLayout>
        <Routes>
            <Route path="/" element={<HomePageRouting />} />
            <UnauthenticatedRoute path="/sign-up-customer" element={<CustomerSignUpPage />} />
            <UnauthenticatedRoute path="/sign-up-salesman" element={<SalesmanSignUpPage />} />
            <AuthenticatedRoute path="/internal/log-me-out" element={<InternalLogMeOutPage />} />
        </Routes>
    </MainLayout>
);

export default App;
