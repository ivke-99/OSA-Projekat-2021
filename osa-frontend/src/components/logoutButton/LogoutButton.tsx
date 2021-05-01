import React from "react";
import { Button } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import { accessTokenState } from "../../recoil/tokens";

const LogoutButton: React.FC = () => {
    const setAccessToken = useSetRecoilState(accessTokenState);
    const logoutHandler = () => {
        setAccessToken("");
        localStorage.removeItem("token");
    };

    return (
        <Button onClick={logoutHandler} size="sm" rounded="md" colorScheme="gray">
            Logout
        </Button>
    );
};

export default LogoutButton;
