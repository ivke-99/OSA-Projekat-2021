interface CancelProps {
    onCancel: () => void;
}

interface PersonPropsWithCancel extends CancelProps {
    person: {
        firstName: string;
        surname: string;
        username: string;
        setFirstName: (firstName: string) => void;
        setSurname: (surname: string) => void;
    };
}

interface ProfileEditFormInputs {
    firstName: string;
    surname: string;
}

interface PasswordEditFormInputs {
    oldPassword: string;
    password: string;
    passwordAgain: string;
}
