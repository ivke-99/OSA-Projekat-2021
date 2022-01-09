import {
    Box,
    Flex,
    Text,
} from "@chakra-ui/react";
import React, {  } from "react";
import { OrderInfoProps } from ".";

const OrderInfoCard: React.FC<OrderInfoProps> = (props) => {
    const { order } = props;
    console.log(order.isAnonComment)
    return (
        <>
            <Box p={2} borderWidth={1} height={250} borderRadius="lg">
                <Flex
                    direction="column"
                    alignItems="flex-start"
                    wrap="nowrap"
                    p={2}
                    fontSize={["sm", "sm", "md", "lg"]}
                >
                    <Box width="95%">
                        <Text isTruncated>
                            <Text as="b">Is anonymous comment: </Text>
                            {order.isAnonComment.toString()}
                        </Text>
                        <Text isTruncated>
                            <Text as="b">Time of order: </Text>
                            {new Date(order.timeOfOrder).toLocaleDateString('sr-RS')}
                        </Text>
                        <Text>
                            <Text as="b">Order comment: </Text>
                            {order.comment}
                        </Text>
                    </Box>
                </Flex>
            </Box>
        </>
    );
};

export default OrderInfoCard;