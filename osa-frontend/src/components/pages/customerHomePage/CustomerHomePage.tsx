import { Fade, Text } from "@chakra-ui/react";
import React from "react";

const CustomerHomePage = () => {
    return (
        <Fade in={true}>
            <Text fontSize="4xl">Welcome user!</Text>
        </Fade>
    );
};

export default CustomerHomePage;
