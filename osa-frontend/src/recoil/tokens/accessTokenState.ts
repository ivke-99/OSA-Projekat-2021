import { atom } from "recoil";

const accessTokenState = atom({
    key: "accessTokenState",
    default: "",
});

export default accessTokenState;
