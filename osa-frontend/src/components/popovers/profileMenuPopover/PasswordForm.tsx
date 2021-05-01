import {
    Button,
    ButtonGroup,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Stack,
    useToast,
} from "@chakra-ui/react";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "../../../util/yupExtended";
import { useForm } from "react-hook-form";
import axios from "axios";

const PasswordForm: React.FC<CancelProps> = ({ onCancel }) => {
    const toast = useToast();

    const formSchema = yup.object().shape({
        oldPassword: yup.string().required("Old password field is required."),
        password: yup
            .string()
            .password()
            .min(6, "Password must be at least 6 characters.")
            .max(16, "Password must be at most 16 characters.")
            .minLowercase(1, "Password must contain at least 1 lowercase letter.")
            .minUppercase(1, "Password must contain at least 1 uppercase letter.")
            .minNumbers(1, "Password must contain at least a single digit.")
            .minSymbols(0)
            .required("Password is a required field."),
        passwordAgain: yup
            .string()
            .oneOf([yup.ref("password"), null], "Passwords do not match!")
            .required("Password confirmation is a required field."),
    });

    const { register, handleSubmit, formState, setError } = useForm<PasswordEditFormInputs>({
        mode: "onChange",
        resolver: yupResolver(formSchema),
        reValidateMode: "onChange",
    });

    const { errors } = formState;

    const sendToAPI = (form: PasswordEditFormInputs) => {
        axios
            .put("/user/me/update/password", form)
            .then((res) => {
                if (res.status !== 200) return;
                onCancel();
                toast({
                    position: "top",
                    duration: 2500,
                    title: "Password changed successfully",
                    status: "success",
                    isClosable: true,
                });
            })
            .catch((err) => {
                if (err.response.status === 406) {
                    setError("oldPassword", { message: "Your old password is invalid." });
                    return;
                }
            });
    };

    return (
        <Stack spacing={4}>
            <FormControl isInvalid={!!errors?.oldPassword?.message} errortext={errors?.oldPassword?.message} isRequired>
                <FormLabel>Old password</FormLabel>
                <Input type="password" placeholder="Input your old password" {...register("oldPassword")} />
                <FormErrorMessage>{errors?.oldPassword?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors?.password?.message} errortext={errors?.password?.message} isRequired>
                <FormLabel>New password</FormLabel>
                <Input type="password" placeholder="Input your new password" {...register("password")} />
                <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
            </FormControl>
            <FormControl
                isInvalid={!!errors?.passwordAgain?.message}
                errortext={errors?.passwordAgain?.message}
                isRequired
            >
                <FormLabel>Repeat new password</FormLabel>
                <Input type="password" placeholder="Repeat your new password" {...register("passwordAgain")} />
                <FormErrorMessage>{errors?.passwordAgain?.message}</FormErrorMessage>
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

export default PasswordForm;
