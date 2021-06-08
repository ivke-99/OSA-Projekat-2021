import { Fade, Text } from "@chakra-ui/react";
import React from "react";
import { useRecoilValue } from "recoil";
import { accessTokenWithUsername } from "../../../recoil/tokens";

const AdminHomePage = () => {
    const username = useRecoilValue(accessTokenWithUsername);
    return (
        <Fade in={true}>
            <Text fontSize="4xl">Welcome {username}</Text>
        </Fade>
    );
};

export default AdminHomePage;
