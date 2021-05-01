import React from "react";
import { useRecoilValue } from "recoil";
import ColorModeSwitcher from "../components/colorModeSwitcher/ColorModeSwitcher";
import LogoutButton from "../components/logoutButton/LogoutButton";
import LoginModal from "../components/modals/LoginModal";
import ProfileMenuPopover from "../components/popovers/profileMenuPopover/ProfileMenuPopover";
import { accessTokenIsAuthenticated } from "../recoil/tokens";
import MenuItemButton from "./MenuItemButton";

const Items: React.FC = () => {
    const isAuth = useRecoilValue(accessTokenIsAuthenticated);

    return (
        <>
            <MenuItemButton to="/" size="sm" rounded="md" colorScheme="gray">
                Home
            </MenuItemButton>
            {!isAuth && <LoginModal />}
            {isAuth && <LogoutButton />}
            {isAuth && <ProfileMenuPopover />}
            <ColorModeSwitcher />
        </>
    );
};

export default Items;
