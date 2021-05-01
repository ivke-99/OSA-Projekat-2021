import React, { useEffect } from "react";
import {
    Button,
    Stack,
    FormControl,
    FormLabel,
    Input,
    ButtonGroup,
    FormErrorMessage,
    useToast,
} from "@chakra-ui/react";
import yup from "../../../util/yupExtended";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

const ProfileForm: React.FC<PersonPropsWithCancel> = ({ onCancel, person }) => {
    const { firstName, surname, username, setFirstName, setSurname } = person;

    const toast = useToast();

    const formSchema = yup.object().shape({
        firstName: yup
            .string()
            .max(30, "First name field should contain at most 30 letters.")
            .required("First name is a required field."),
        surname: yup
            .string()
            .max(30, "Last name field should contain at most 30 letters.")
            .required("Last name is a required field."),
    });

    const { register, handleSubmit, formState, reset } = useForm<ProfileEditFormInputs>({
        mode: "onChange",
        resolver: yupResolver(formSchema),
        defaultValues: {
            firstName: "",
            surname: "",
        },
    });

    const { errors } = formState;

    const sendToAPI = (form: ProfileEditFormInputs) => {
        axios
            .put("/user/me/update/info", form)
            .then((res) => {
                if (res.status !== 200) return;
                toast({
                    position: "top",
                    duration: 2500,
                    title: "Data changed successfully",
                    status: "success",
                    isClosable: true,
                });
                setFirstName(form.firstName);
                setSurname(form.surname);
            })
            .catch(console.error);
        onCancel();
    };

    useEffect(() => {
        reset({ firstName, surname });
    }, [reset, firstName, surname]);

    return (
        <Stack spacing={4}>
            <FormControl isInvalid={!!errors?.firstName?.message} errortext={errors?.firstName?.message} isRequired>
                <FormLabel>First Name</FormLabel>
                <Input type="text" placeholder="Input your first name" {...register("firstName")} />
                <FormErrorMessage>{errors?.firstName?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors?.surname?.message} errortext={errors?.surname?.message} isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input type="text" placeholder="Input your last name" {...register("surname")} />
                <FormErrorMessage>{errors?.surname?.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
                <FormLabel>Username</FormLabel>
                <Input value={username} isDisabled />
            </FormControl>
            <ButtonGroup d="flex" justifyContent="flex-end">
                <Button variant="outline" onClick={onCancel}>
                    Cancel
                </Button>
                <Button
                    isDisabled
                    colorScheme="teal"
                    disabled={!formState.isDirty || (formState.isDirty && !formState.isValid)}
                    onClick={handleSubmit(sendToAPI)}
                >
                    Save
                </Button>
            </ButtonGroup>
        </Stack>
    );
};

export default ProfileForm;
