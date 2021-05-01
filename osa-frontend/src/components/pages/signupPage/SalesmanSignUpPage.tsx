import React from "react";
import SignUpFormSalesman from "./SignUpFormSalesman";
import SignUpPage from "./SignUpPage";

const SalesmanSignUpPage = () => {
    return (
        <SignUpPage title={"Salesman sign-up"}>
            <SignUpFormSalesman />
        </SignUpPage>
    );
};

export default SalesmanSignUpPage;
