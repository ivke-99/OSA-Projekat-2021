import { Center, Heading, SimpleGrid } from "@chakra-ui/react";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { ProductDTO } from ".";
import ProductInfoCard from "./ProductInfoCard";

const UpdateProductTabPanel: React.FC = () => {
    const [products, setProducts] = useState<ProductDTO[]>([]);
    const [fetchIt, setFetchIt] = useState<boolean>(true);

    const reFetchIt = () => setFetchIt(!fetchIt);

    const fetchAndSetProducts = useCallback(() => {
        axios
            .get("products")
            .then(({ data }) => setProducts(data))
            .catch((err) => console.log(err));
    }, [setProducts]);

    useEffect(() => fetchAndSetProducts(), [fetchAndSetProducts, fetchIt]);

    if (products.length === 0) {
        return (
            <Center>
                <Heading as="h3">No products yet!</Heading>
            </Center>
        );
    }
    return (
        <SimpleGrid columns={[1, 4]} spacing={["10px", "20px"]}>
            {products.map((e: any, index: number) => (
                <ProductInfoCard product={e} key={index} fetchCallback={reFetchIt} />
            ))}
        </SimpleGrid>
    );
};

export default UpdateProductTabPanel;
