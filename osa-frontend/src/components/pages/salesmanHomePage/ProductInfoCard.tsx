import {
    Box,
    Button,
    Flex,
    useDisclosure,
    Text,
    useToast,
    Modal,
    Center,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Spinner,
    useColorModeValue,
    VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { ProductDTO, ProductFormModalProps, ProductInfoProps } from ".";
import yup from "../../../util/yupExtended";

const ProductInfoCard: React.FC<ProductInfoProps> = (props) => {
    const { product, fetchCallback } = props;
    const { isOpen, onOpen, onClose } = useDisclosure({
        onClose() {
            fetchCallback();
        },
    });
    const toast = useToast();

    const deleteProduct = (productName: string) => {
        axios
            .delete(`/products/${productName}`)
            .then(fetchCallback)
            .catch((_) => {
                toast({
                    position: "top",
                    title: "Error occured.",
                    duration: 3000,
                    isClosable: true,
                    status: "error",
                });
            });
    };

    return (
        <>
            <FormModal isOpen={isOpen} onClose={onClose} productName={product.productName} />
            <Box borderWidth={1} borderRadius="lg" pt={3} pl={4} pr={2} pb={3}>
                <Flex
                    direction="column"
                    alignItems="flex-start"
                    wrap="nowrap"
                    mb={2}
                    padding={3}
                    fontSize={["sm", "sm", "md", "lg"]}
                >
                    <Box width="95%">
                        <Text isTruncated>
                            <Text as="i">Product name: </Text>
                            {product.productName}
                        </Text>
                        <Text isTruncated>
                            <Text as="i">Product price: </Text>
                            {product.price}
                        </Text>
                        <Text isTruncated>
                            <Text as="i">Product description: </Text>
                            {product.description}
                        </Text>
                    </Box>
                </Flex>
                {<Button onClick={onOpen}>Edit product</Button>}
                <Button onClick={(_) => deleteProduct(product.productName)}>Delete product</Button>
            </Box>
        </>
    );
};

const FormModal: React.FC<ProductFormModalProps> = (props) => {
    const { isOpen, onClose, productName } = props;

    const [loaded, setLoaded] = useState<boolean>(false);
    // eslint-disable-next-line
    const [products, setProducts] = useState<[ProductDTO][]>([]);

    const primaryColor = useColorModeValue("blue.800", "blue.100");

    let oldName = props.productName;

    const toast = useToast();

    const formSchema = yup.object().shape({
        productName: yup.string().trim().required("Product name is required."),
        price: yup.number().required("Price of product is required."),
        description: yup.string().trim().required("Product description is required."),
    });
    const { register, handleSubmit, formState, reset, control } = useForm<ProductDTO>({
        mode: "onChange",
        resolver: yupResolver(formSchema),
    });

    const { errors } = formState;

    useEffect(() => {
        if (!isOpen) return;
        axios
            .get("/products")
            .then(({ data }) => {
                setProducts(data);
                setLoaded(true);
            })
            .catch(console.log);
    }, [setProducts, setLoaded, isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        axios
            .get(`/products/${productName}`)
            .then(({ data }) => reset(data))
            .catch(console.log);
    }, [productName, reset, isOpen]);

    const sendToAPI = (data: ProductDTO) => {
        axios
            .put(`/products/${oldName}`, { ...data })
            .then((_) => {
                toast({
                    title: "Product updated!",
                    status: "success",
                    duration: 2000,
                    position: "top",
                    isClosable: true,
                });
                setLoaded(false);
                onClose();
            })
            .catch((_) =>
                toast({
                    title: "Product update failed!",
                    status: "error",
                    duration: 3000,
                    position: "top",
                    isClosable: true,
                })
            );
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit user</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {loaded ? (
                        <VStack
                            borderWidth="1px"
                            borderRadius="lg"
                            overflow="hidden"
                            mt={4}
                            width="full"
                            p={5}
                            spacing={8}
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
                                <Input
                                    type="text"
                                    placeholder="Input product description"
                                    {...register("description")}
                                />
                                <FormErrorMessage>{errors?.description?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl
                                isInvalid={!!errors?.price?.message}
                                errortext={errors?.price?.message}
                                isRequired
                            >
                                <FormLabel color={primaryColor}>Product price:</FormLabel>
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
                        </VStack>
                    ) : (
                        <Center>
                            <Spinner size="xl" />
                        </Center>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="gray" mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button
                        colorScheme="blue"
                        variant="outline"
                        onClick={handleSubmit(sendToAPI)}
                        disabled={!formState.isDirty || (formState.isDirty && !formState.isValid)}
                    >
                        Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
export default ProductInfoCard;
