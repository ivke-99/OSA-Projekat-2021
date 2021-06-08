import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";
import * as React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";
import "focus-visible/dist/focus-visible";
import { RecoilRoot } from "recoil";
import { css, Global } from "@emotion/react";
import AuthInitializer from "./components/authInitializer/AuthInitializer";
import AxiosInterception from "./components/axiosInterception/AxiosInterception";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import { mode } from "@chakra-ui/theme-tools";
import { Dict } from "@chakra-ui/utils";

const GlobalStyles = css`
    /*
    This will hide the focus indicator if the element receives focus    via the mouse,
    but it will still show up on keyboard focus.
  */

    .js-focus-visible :focus:not([data-focus-visible-added]) {
        outline: none;
        box-shadow: none;
    }
`;

const styles = {
    global: (props: Dict<any>) => ({
        body: {
            color: mode("gray.500", "whiteAlpha.900")(props),
            bg: mode("gray.300", "#141214")(props),
        },
    }),
};

const components = {
    Drawer: {
        // setup light/dark mode component defaults
        baseStyle: (props: Dict<any>) => ({
            dialog: {
                bg: mode("white", "#141214")(props),
            },
        }),
    },
};

const theme = extendTheme({
    components,
    styles,
});

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    return {
        ...config,
        headers: {
            ...config.headers,
            common: {
                ...config.headers.common,
                Authorization: `Bearer ${token}`,
            },
        },
    };
});

ReactDOM.render(
    <React.StrictMode>
        <ColorModeScript />
        <RecoilRoot>
            <ChakraProvider theme={theme}>
                <Global styles={GlobalStyles} />
                <AuthInitializer>
                    <Router>
                        <AxiosInterception>
                            <App />
                        </AxiosInterception>
                    </Router>
                </AuthInitializer>
            </ChakraProvider>
        </RecoilRoot>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
