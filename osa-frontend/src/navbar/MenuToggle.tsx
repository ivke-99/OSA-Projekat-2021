import React from "react";
import { CloseIcon, MenuIcon } from "./Icons";
import { Box } from "@chakra-ui/react";

interface MenuToggleProps {
    toggle: (event: React.MouseEvent<HTMLElement>) => void;
    isOpen: boolean;
}

const MenuToggle: React.FC<MenuToggleProps> = ({ toggle, isOpen }: MenuToggleProps) => {
    return (
        <Box display={{ base: "block", md: "none" }} onClick={toggle}>
            {isOpen ? <CloseIcon /> : <MenuIcon />}
        </Box>
    );
};

export default MenuToggle;
