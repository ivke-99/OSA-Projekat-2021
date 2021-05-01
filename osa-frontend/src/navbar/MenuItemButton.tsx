import React from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Button, ButtonProps, Link } from "@chakra-ui/react";

interface MenuItemProps extends ButtonProps {
    isLast?: boolean;
    to: string;
}

const MenuItemButton: React.FC<MenuItemProps> = ({ children, isLast = false, to = "/", ...rest }) => {
    return (
        <Link href={to} as={ReactRouterLink} to={to}>
            <Button {...rest}>{children}</Button>
        </Link>
    );
};

export default MenuItemButton;
