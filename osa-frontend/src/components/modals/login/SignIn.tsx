import React from "react";
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    ModalBody,
    ModalFooter,
    useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { accessTokenState } from "../../../recoil/tokens";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const SignIn: React.FC<{ isOpen: any; onOpen: any; onClose: any }> = (props) => {
    const { onClose } = props;
    const setAccessToken = useSetRecoilState(accessTokenState);
    const [successLoginToastId, failLoginToastId] = "12".split("");

    const toast = useToast();

    const formSchema = yup.object().shape({
        username: yup.string().required("Username is a required field."),
        password: yup.string().required("Password is a required field."),
    });

    const {
        register,
        handleSubmit,

        formState: { errors },
    } = useForm<LoginFormInputs>({
        mode: "onChange",
        resolver: yupResolver(formSchema),
    });

    const setupJwtTokenState = (data: JwtTokensData) => {
        const token = data.token;
        localStorage.setItem("token", token);
        setAccessToken(token);
    };

    const signInAPICall = async (data: LoginFormInputs): Promise<any> => {
        const username = data.username;
        const password = data.password;
        try {
            const response = await axios.post("/auth/authenticate", {
                username,
                password,
            });
            if (response.status === 200) {
                if (!toast.isActive(successLoginToastId)) {
                    toast({
                        id: successLoginToastId,
                        title: "Logged in successfully.",
                        status: "success",
                        duration: 1000,
                        position: "top",
                        isClosable: true,
                    });
                }
                setupJwtTokenState(response.data);
            }
        } catch (err) {
            console.log(err);
            if (!toast.isActive(failLoginToastId)) {
                toast({
                    id: failLoginToastId,
                    title: "Login failed!",
                    description: `${err?.response?.data?.error}`,
                    status: "error",
                    duration: 3000,
                    position: "top",
                    isClosable: true,
                });
            }
        }
    };

    return (
        <>
            <ModalBody pb={6}>
                <FormControl isInvalid={!!errors?.username?.message} errortext={errors?.username?.message} isRequired>
                    <FormLabel>Username</FormLabel>
                    <Input type="username" placeholder="Input your username" {...register("username")} />
                    <FormErrorMessage>{errors?.username?.message}</FormErrorMessage>
                </FormControl>

                <FormControl
                    isInvalid={!!errors?.password?.message}
                    errortext={errors?.password?.message}
                    mt={4}
                    isRequired
                >
                    <FormLabel>Password</FormLabel>
                    <Input type="password" placeholder="input your password" {...register("password")} />
                    <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
                </FormControl>
            </ModalBody>

            <ModalFooter>
                <Button
                    onClick={handleSubmit(signInAPICall)}
                    colorScheme="blue"
                    mr={3}
                    disabled={!!errors.username || !!errors.password}
                >
                    Sign in
                </Button>
                <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
        </>
    );
};

export default SignIn;
