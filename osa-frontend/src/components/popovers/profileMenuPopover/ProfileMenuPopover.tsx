import React from "react";
import {
    Button,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import ProfileMenuComponents from "./ProfileMenuComponents";

const ProfileMenuPopover: React.FC = () => {
    const { onClose } = useDisclosure();

    return (
        <Popover placement="auto">
            <PopoverTrigger>
                <Button size="sm" rounded="md" colorScheme="gray">
                    Profile
                </Button>
            </PopoverTrigger>
            <PopoverContent maxW="350px">
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader textAlign="center">
                    <Text fontSize="lg">My profile</Text>
                </PopoverHeader>
                <PopoverBody padding="0">
                    <ProfileMenuComponents onCancel={onClose} />
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};

export default ProfileMenuPopover;
