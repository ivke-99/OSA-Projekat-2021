import { Center, Heading, SimpleGrid, Input } from "@chakra-ui/react";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { OrderDTO } from ".";
import OrderInfoCard from "./OrderInfoCard";

const UpdateProductTabPanel: React.FC = () => {
    const [orders, setOrders] = useState<OrderDTO[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchAndSetOrders = useCallback(() => {
        axios
            .get("orders/comments",
                {
                    params: {
                        searchTerm: searchTerm
                    }
                })
            .then(({ data }) => setOrders(data))
            .catch((err) => console.log(err));
    }, [setOrders, searchTerm]);

    useEffect(() => fetchAndSetOrders(), [fetchAndSetOrders]);


    return (
        <>
            <Input mt={1} mb={4} width={250} onChange={(e) => setSearchTerm(e.target.value)} placeholder='Search' />
            {orders.length === 0 ? <Center>
                <Heading as="h3">No orders yet!</Heading>
            </Center>
                :

                <SimpleGrid columns={[1, 4]} spacing={["10px", "20px"]}>
                    {orders.map((e: any, index: number) => (
                        <OrderInfoCard order={e} key={index} />
                    ))}
                </SimpleGrid>}
        </>
    );
};

export default UpdateProductTabPanel;