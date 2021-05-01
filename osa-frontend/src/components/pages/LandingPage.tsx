import React from "react";
import LandingSection from "../sections/LandingSection";
import { Fade } from "@chakra-ui/react";
import mainImage from "../../assets/just-a-little-spread.jpg";

const LandingPage: React.FC = (props) => {
    return (
        <Fade in={true}>
            <LandingSection
                title="Welcome to InstandFood!"
                subtitle="Best food at your door!"
                image={mainImage}
                createAccCustomerText="Create your account now"
                createAccCustomerLink="/sign-up-customer"
                createAccSalesmanText="Register as salesman"
                createAccSalesmanLink="/sign-up-salesman"
            />
        </Fade>
    );
};

export default LandingPage;
