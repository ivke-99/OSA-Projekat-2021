import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import { accessTokenState } from "../../recoil/tokens";

const InternalLogMeOutPage: React.FC = () => {
    const toast = useToast();
    const setToken = useSetRecoilState(accessTokenState);

    useEffect(() => {
        setToken("");
        localStorage.removeItem("token");
        toast({
            title: "Session expired.",
            description: "You've been logged out.",
            status: "error",
            position: "top",
            duration: 3000,
            isClosable: true,
        });
    }, [toast, setToken]);

    return <Navigate to="/" />;
};

export default InternalLogMeOutPage;
