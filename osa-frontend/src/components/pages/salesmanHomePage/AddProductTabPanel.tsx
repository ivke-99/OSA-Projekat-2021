import {
    useDisclosure,
    useToast,
    useColorModeValue,
    Button,
    Flex,
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
    VStack,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ProductDTO } from ".";
import yup from "../../../util/yupExtended";

const AddProductTabPanel: React.FC<{ tabsHandle: (index: number) => void }> = (props) => {
    const { tabsHandle } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [modalBody, setModalBody] = useState<string[]>([]);
    const toast = useToast();

    // eslint-disable-next-line
    const [products, setProducts] = useState<ProductDTO[]>([]);
    const primaryColor = useColorModeValue("blue.800", "blue.100");

    const formSchema = yup.object().shape({
        productName: yup.string().trim().required("Product name is required."),
        price: yup.number().required("Price of product is required."),
        description: yup.string().trim().required("Product description is required."),
    });

    const { register, handleSubmit, formState, control } = useForm<ProductDTO>({
        mode: "onChange",
        resolver: yupResolver(formSchema),
    });

    const { errors } = formState;

    useEffect(() => {
        axios
            .get("/products")
            .then(({ data }) => {
                setProducts(data);
            })
            .catch(console.log);
    }, [setProducts]);

    const sendToAPI = (form: ProductDTO) => {
        axios
            .post("/products", form)
            .then((res) => {
                if (res.status !== 200) return;
                toast({
                    position: "top",
                    duration: 2000,
                    title: "Creation successful",
                    description: "Product creation successfully done.",
                    status: "success",
                    isClosable: true,
                });
                tabsHandle(1);
            })
            .catch((err) => {
                let messages: string[] =
                    err?.response?.data?.bindingResult?.map((e: { defaultMessage: string }) => e.defaultMessage) ?? [];
                messages = [...messages, err?.response?.data?.message];
                setModalBody(messages);
                onOpen();
            });
    };

    return (
        <>
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Failed to add product</ModalHeader>
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

            <Flex justifyContent="center">
                <VStack
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    mt={4}
                    p={5}
                    spacing={8}
                    width="container.md"
                >
                    <FormControl
                        isInvalid={!!errors?.productName?.message}
                        errortext={errors?.productName?.message}
                        isRequired
                    >
                        <FormLabel color={primaryColor}>Product name</FormLabel>
                        <Input type="text" placeholder="Input product name" {...register("productName")} />
                        <FormErrorMessage>{errors?.productName?.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl
                        isInvalid={!!errors?.description?.message}
                        errortext={errors?.description?.message}
                        isRequired
                    >
                        <FormLabel color={primaryColor}>Product description</FormLabel>
                        <Input type="text" placeholder="Input product description" {...register("description")} />
                        <FormErrorMessage>{errors?.description?.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors?.price?.message} errortext={errors?.price?.message} isRequired>
                        <FormLabel>Price of appointment:</FormLabel>
                        <Controller
                            control={control}
                            name="price"
                            render={({ field: { name, ...rest } }) => (
                                <NumberInput step={0.1} min={1} max={1000000} {...rest}>
                                    <NumberInputField name={name} />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            )}
                        />
                        <FormErrorMessage>{errors?.price?.message}</FormErrorMessage>
                    </FormControl>
                    <Button
                        variant="outline"
                        width="full"
                        colorScheme="blue"
                        onClick={handleSubmit(sendToAPI)}
                        disabled={!formState.isDirty || (formState.isDirty && !formState.isValid)}
                    >
                        Add product
                    </Button>
                </VStack>
            </Flex>
        </>
    );
};

export default AddProductTabPanel;
