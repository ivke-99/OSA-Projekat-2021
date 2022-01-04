import { Center, Heading, SimpleGrid, Input } from "@chakra-ui/react";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { ProductDTO } from ".";
import ProductInfoCard from "./ProductInfoCard";

const UpdateProductTabPanel: React.FC = () => {
    const [products, setProducts] = useState<ProductDTO[]>([]);
    const [fetchIt, setFetchIt] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState('');
    const reFetchIt = () => setFetchIt(!fetchIt);

    const fetchAndSetProducts = useCallback(() => {
        axios
            .get("products",
                {
                    params: {
                        searchTerm: searchTerm
                    }
                })
            .then(({ data }) => setProducts(data))
            .catch((err) => console.log(err));
    }, [setProducts, searchTerm]);

    useEffect(() => fetchAndSetProducts(), [fetchAndSetProducts, fetchIt]);


    return (
        <>
            <Input mt={1} mb={4} width={250} onChange={(e) => setSearchTerm(e.target.value)} placeholder='Search' />
            {products.length === 0 ? <Center>
                <Heading as="h3">No products yet!</Heading>
            </Center>
                :

                <SimpleGrid columns={[1, 4]} spacing={["10px", "20px"]}>
                    {products.map((e: any, index: number) => (
                        <ProductInfoCard product={e} key={index} fetchCallback={reFetchIt} />
                    ))}
                </SimpleGrid>}
        </>
    );
};

export default UpdateProductTabPanel;
