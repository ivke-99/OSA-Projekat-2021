import { selector } from "recoil";
import accessTokenState from "./accessTokenState";
import jwtDecode from "jwt-decode";

const accessTokenWithUsername = selector({
    key: "accessTokenWithUsername",
    get: ({ get }) => {
        const token = get(accessTokenState);
        try {
            return jwtDecode<AccessToken>(token).sub;
        } catch {
            return "";
        }
    },
});

export default accessTokenWithUsername;
