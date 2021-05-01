interface SignupFormInputsCustomer {
    firstName: string;
    surname: string;
    username: string;
    password: string;
    passwordAgain: string;
    addrNumber: string;
    addrStreet: string;
    addrCity: string;
    addrCountry: string;
}

interface SignUpFormInputsSalesman extends SignupFormInputsCustomer {
    email: string;
    companyName: string;
}

interface SignUpPageProps {
    title: string;
}
