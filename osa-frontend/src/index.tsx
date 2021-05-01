import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
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
            <ChakraProvider>
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
