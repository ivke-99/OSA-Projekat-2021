import React from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link, Text } from "@chakra-ui/react";

interface MenuItemProps {
    isLast?: boolean;
    to: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ children, isLast = false, to = "/", ...rest }) => {
    return (
        <Link href={to} as={ReactRouterLink} to={to}>
            <Text display="block" {...rest}>
                {children}
            </Text>
        </Link>
    );
};

export default MenuItem;
