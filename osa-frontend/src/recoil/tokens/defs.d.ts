interface AccessToken {
    sub: string;
    roles: string[];
    exp: number;
    iat: number;
}

interface Roles {
    isCustomer: boolean;
    isSalesman: boolean;
    isAdmin: boolean;
}
