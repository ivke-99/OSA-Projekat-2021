import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import ProfileEditContainer from "./ProfileEditContainer";

const ProfileMenuComponents: React.FC<CancelProps> = (props) => {
    return (
        <Flex direction="column">
            <MenuBox>
                <ProfileEditContainer onCancel={props.onCancel} />
            </MenuBox>
        </Flex>
    );
};

const MenuBox: React.FC = (props) => <Box w="100%">{props.children}</Box>;

export default ProfileMenuComponents;
