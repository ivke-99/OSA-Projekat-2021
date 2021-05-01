import React, { useState } from "react";
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    ListItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    UnorderedList,
    useColorModeValue,
    useDisclosure,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "../../../util/yupExtended";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupFormCustomer: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [modalBody, setModalBody] = useState<string[]>([]);
    const navigate = useNavigate();
    const toast = useToast();

    const primaryColor = useColorModeValue("blue.800", "blue.100");

    const formSchema = yup.object().shape({
        firstName: yup.string().trim().required("First name is a required field."),
        surname: yup.string().trim().required("Last name is a required field."),
        username: yup.string().trim().required("Username is a required field."),
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
        addrNumber: yup
            .string()
            .min(1, "Address number field should contain at 1 letter.")
            .max(10, "Address number field should contain at most 10 letters.")
            .trim()
            .required("Address number is a required field."),
        addrStreet: yup
            .string()
            .min(3, "Address street field should contain at least 3 letters.")
            .max(40, "Address street field should contain at most 40 letters.")
            .trim()
            .required("Address street is a required field."),
        addrCity: yup
            .string()
            .min(3, "City field should contain at least 3 letters.")
            .max(50, "City field should contain at most 50 letters.")
            .trim()
            .required("City is a required field."),
        addrCountry: yup
            .string()
            .min(3, "Country field should contain at least 3 letters.")
            .max(30, "Country field should contain at most 30 letters.")
            .trim()
            .required("Country is a required field."),
    });
    const { register, handleSubmit, formState } = useForm<SignupFormInputsCustomer>({
        mode: "onChange",
        resolver: yupResolver(formSchema),
    });

    const { errors } = formState;

    const sendToAPI = (form: SignupFormInputsCustomer) => {
        axios
            .post("/register-customer", form)
            .then((res) => {
                if (res.status !== 200) return;
                toast({
                    position: "top",
                    duration: 2000,
                    title: "Sign-up successful",
                    description: "You can sign-in with your account now.",
                    status: "success",
                    isClosable: true,
                });
                navigate("/");
            })
            .catch((err) => {
                const messages: string[] =
                    err?.response?.data?.bindingResult?.map((e: { defaultMessage: string }) => e.defaultMessage) ?? [];
                setModalBody(messages);
                onOpen();
            });
    };

    return (
        <>
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Registration request failed</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <UnorderedList>
                            {modalBody.map((e, i) => (
                                <ListItem key={i}>{e}</ListItem>
                            ))}
                        </UnorderedList>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <VStack borderWidth="1px" borderRadius="lg" overflow="hidden" mt={4} width="full" p={5} spacing={8}>
                <FormControl isInvalid={!!errors?.firstName?.message} errortext={errors?.firstName?.message} isRequired>
                    <FormLabel color={primaryColor}>First name</FormLabel>
                    <Input type="text" placeholder="Input your first name" {...register("firstName")} />
                    <FormErrorMessage>{errors?.firstName?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors?.surname?.message} errortext={errors?.surname?.message} isRequired>
                    <FormLabel color={primaryColor}>Last name</FormLabel>
                    <Input type="text" placeholder="Input your last name" {...register("surname")} />
                    <FormErrorMessage>{errors?.surname?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors?.username?.message} errortext={errors?.username?.message} isRequired>
                    <FormLabel color={primaryColor}>Username</FormLabel>
                    <Input type="text" placeholder="Input your username" {...register("username")} />
                    <FormErrorMessage>{errors?.username?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors?.password?.message} errortext={errors?.password?.message} isRequired>
                    <FormLabel color={primaryColor}>Password</FormLabel>
                    <Input type="password" placeholder="Input your password" {...register("password")} />
                    <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
                </FormControl>
                <FormControl
                    isInvalid={!!errors?.passwordAgain?.message}
                    errortext={errors?.passwordAgain?.message}
                    isRequired
                >
                    <FormLabel color={primaryColor}>Password again</FormLabel>
                    <Input type="password" placeholder="Input your password again" {...register("passwordAgain")} />
                    <FormErrorMessage>{errors?.passwordAgain?.message}</FormErrorMessage>
                </FormControl>
                <FormControl
                    isInvalid={!!errors?.addrNumber?.message}
                    errortext={errors?.addrNumber?.message}
                    isRequired
                >
                    <FormLabel color={primaryColor}>Address number</FormLabel>
                    <Input type="text" placeholder="Input your address number" {...register("addrNumber")} />
                    <FormErrorMessage>{errors?.addrNumber?.message}</FormErrorMessage>
                </FormControl>
                <FormControl
                    isInvalid={!!errors?.addrStreet?.message}
                    errortext={errors?.addrStreet?.message}
                    isRequired
                >
                    <FormLabel color={primaryColor}>Address street</FormLabel>
                    <Input type="text" placeholder="Input your address street" {...register("addrStreet")} />
                    <FormErrorMessage>{errors?.addrStreet?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors?.addrCity?.message} errortext={errors?.addrCity?.message} isRequired>
                    <FormLabel color={primaryColor}>Residential city</FormLabel>
                    <Input type="text" placeholder="Input your residential city" {...register("addrCity")} />
                    <FormErrorMessage>{errors?.addrCity?.message}</FormErrorMessage>
                </FormControl>
                <FormControl
                    isInvalid={!!errors?.addrCountry?.message}
                    errortext={errors?.addrCountry?.message}
                    isRequired
                >
                    <FormLabel color={primaryColor}>Country</FormLabel>
                    <Input type="text" placeholder="Input your country name" {...register("addrCountry")} />
                    <FormErrorMessage>{errors?.addrCountry?.message}</FormErrorMessage>
                </FormControl>
                <Button
                    variant="outline"
                    width="full"
                    colorScheme="blue"
                    onClick={handleSubmit(sendToAPI)}
                    disabled={!formState.isDirty || (formState.isDirty && !formState.isValid)}
                >
                    Sign up
                </Button>
            </VStack>
        </>
    );
};

export default SignupFormCustomer;
