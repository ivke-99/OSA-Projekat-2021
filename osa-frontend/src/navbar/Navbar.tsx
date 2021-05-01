import React from "react";
import { Flex } from "@chakra-ui/react";
import Logo from "./Logo";
import MenuLinks from "./MenuLinks";
import MenuToggle from "./MenuToggle";

const NavbarContainer: React.FC = ({ children, ...props }) => {
    return (
        <Flex as="nav" align="center" justify="space-between" wrap="wrap" w="100%" mb={8} p={8} {...props}>
            {children}
        </Flex>
    );
};

const Navbar: React.FC = ({ children }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <NavbarContainer>
            <Logo />
            <MenuToggle toggle={toggle} isOpen={isOpen} />
            <MenuLinks isOpen={isOpen} children={children} />
        </NavbarContainer>
    );
};

export default Navbar;
