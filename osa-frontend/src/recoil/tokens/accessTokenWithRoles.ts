import { selector } from "recoil";
import accessTokenState from "./accessTokenState";
import jwtDecode from "jwt-decode";

const accessTokenWithRoles = selector({
    key: "accessTokenWithRoles",
    get: ({ get }): Roles => {
        const token = get(accessTokenState);
        try {
            // SALESMAN,ADMIN,CUSTOMER
            const roles = jwtDecode<AccessToken>(token).roles;
            return {
                isCustomer: roles.includes("CUSTOMER"),
                isSalesman: roles.includes("SALESMAN"),
                isAdmin: roles.includes("ADMIN"),
            };
        } catch (err) {
            return {
                isCustomer: false,
                isSalesman: false,
                isAdmin: false,
            };
        }
    },
});

export default accessTokenWithRoles;
