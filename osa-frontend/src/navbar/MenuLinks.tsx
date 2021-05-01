import React from "react";
import { Box, Stack } from "@chakra-ui/react";
import Items from "./Items";

interface MenuLinksProps {
    isOpen: boolean;
}

const MenuLinks: React.FC<MenuLinksProps> = ({ isOpen }) => {
    return (
        <Box display={{ base: isOpen ? "block" : "none", md: "block" }} flexBasis={{ base: "100%", md: "auto" }}>
            <Stack
                spacing={8}
                align="center"
                justify={["center", "space-between", "flex-end", "flex-end"]}
                direction={["column", "row", "row", "row"]}
                pt={[4, 4, 0, 0]}
            >
                <Items />
            </Stack>
        </Box>
    );
};

export default MenuLinks;
