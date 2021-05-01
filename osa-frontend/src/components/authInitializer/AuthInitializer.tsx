import React, { useEffect, useState } from "react";
import { accessTokenState } from "../../recoil/tokens";
import { useSetRecoilState } from "recoil";
import { Center, ScaleFade, Spinner } from "@chakra-ui/react";

const AuthInitializer: React.FC = (props) => {
    const setAccessToken = useSetRecoilState(accessTokenState);
    const [ready, setReady] = useState<boolean>(false);

    useEffect(() => {
        const accessToken = localStorage.getItem("token");

        if (accessToken) setAccessToken(accessToken);

        setReady(true);
    }, [setAccessToken, ready]);

    return ready ? (
        <ScaleFade initialScale={0.9} in={true}>
            {props.children}
        </ScaleFade>
    ) : (
        <Center marginTop="50vh">
            <Spinner size="xl" />
        </Center>
    );
};

export default AuthInitializer;
