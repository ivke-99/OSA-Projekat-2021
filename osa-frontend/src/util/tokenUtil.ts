import { isAfter, parse, sub } from "date-fns";
import jwtDecode from "jwt-decode";

const duration: Duration = { seconds: 15 };
const isTokenNotExpired = (token: string): boolean => {
    let decodedToken;
    try {
        decodedToken = jwtDecode<UniversalToken>(token);
    } catch (err) {
        return false;
    }
    const expiryOfToken = parse(decodedToken.exp.toString(), "t", Date.now());
    const expiryOfTokenSubtractedByDuration = sub(expiryOfToken, duration);
    return isAfter(expiryOfTokenSubtractedByDuration, Date.now());
};

interface UniversalToken extends AccessToken {}

export { isTokenNotExpired };
