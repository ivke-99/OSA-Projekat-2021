import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Flex, Heading, Image, Stack, useColorModeValue } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { accessTokenIsAuthenticated } from "../../recoil/tokens";

interface LandingSectionProps {
    title: string;
    subtitle: string;
    image: any;
    createAccCustomerLink: string;
    createAccSalesmanLink: string;
    createAccCustomerText: string;
    createAccSalesmanText: string;
}

const LandingSection: React.FC<LandingSectionProps> = ({
    title,
    subtitle,
    image,
    createAccCustomerLink,
    createAccSalesmanLink,
    createAccSalesmanText,
    createAccCustomerText,
    ...rest
}) => {
    const isAuth = useRecoilValue(accessTokenIsAuthenticated);

    const primaryColor = useColorModeValue("blue.700", "blue.100");
    return (
        <Flex
            align="center"
            justify={{ base: "center", md: "space-around", xl: "space-between" }}
            direction={{ base: "column-reverse", md: "row" }}
            flexWrap="nowrap"
            minH="70vh"
            px={8}
            mb={16}
            {...rest}
        >
            <Stack spacing={4} w={{ base: "80%", md: "40%" }} align={["center", "center", "flex-start", "flex-start"]}>
                <Heading
                    as="h1"
                    size="xl"
                    fontWeight="bold"
                    color={primaryColor}
                    textAlign={["center", "center", "left", "left"]}
                >
                    {title}
                </Heading>
                <Heading
                    as="h2"
                    size="md"
                    color={primaryColor}
                    opacity="0.8"
                    fontWeight="normal"
                    lineHeight={1.5}
                    textAlign={["center", "center", "left", "left"]}
                >
                    {subtitle}
                </Heading>
                {!isAuth && (
                    <Link to={createAccCustomerLink}>
                        <Button colorScheme="blue" borderRadius="8px" py="4" px="4" lineHeight="1" size="md">
                            {createAccCustomerText}
                        </Button>
                    </Link>
                )}
                {!isAuth && (
                    <Link to={createAccSalesmanLink}>
                        <Button colorScheme="blue" borderRadius="8px" py="4" px="4" lineHeight="1" size="md">
                            {createAccSalesmanText}
                        </Button>
                    </Link>
                )}
            </Stack>
            <Box w={{ base: "80%", sm: "60%", md: "50%" }} mb={{ base: 12, md: 0 }}>
                <Image src={image} size="100%" rounded="1rem" shadow="2xl" />
            </Box>
        </Flex>
    );
};

export default LandingSection;
