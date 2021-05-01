import { selector } from "recoil";
import accessTokenState from "./accessTokenState";

const accessTokenIsAuthenticated = selector({
    key: "accessTokenIsAuthenticated",
    get: ({ get }) => {
        const token = get(accessTokenState);
        return token.length >= 1;
    },
});

export default accessTokenIsAuthenticated;
