import React from "react";
import { Flex, Heading, useColorModeValue } from "@chakra-ui/react";

const SignupPage: React.FC<SignUpPageProps> = (props) => {
    const primaryColor = useColorModeValue("blue.800", "blue.100");
    return (
        <Flex direction="column" alignItems="center" width="full" maxWidth="600px" padding={10}>
            <Heading as="h2" size="md" color={primaryColor}>
                {props.title}
            </Heading>
            {props.children}
        </Flex>
    );
};

export default SignupPage;
