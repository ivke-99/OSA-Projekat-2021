import React from "react";
import { Flex } from "@chakra-ui/react";
import Navbar from "../../navbar";

const MainLayout: React.FC = (props) => (
    <Flex direction="column" align="center" maxW={{ xl: "1400px" }} m="0 auto" minH="100vh" {...props}>
        <Navbar />
        {props.children}
    </Flex>
);

export default MainLayout;
