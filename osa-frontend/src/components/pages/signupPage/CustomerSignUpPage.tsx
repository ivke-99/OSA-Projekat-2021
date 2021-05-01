import React from "react";
import SignupFormCustomer from "./SignupFormCustomer";
import SignUpPage from "./SignUpPage";

const CustomerSignUpPage = () => {
    return (
        <SignUpPage title={"Customer sign-up"}>
            <SignupFormCustomer />
        </SignUpPage>
    );
};

export default CustomerSignUpPage;
