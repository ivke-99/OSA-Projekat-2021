import React, { useEffect, useState } from "react";
import FocusLock from "react-focus-lock";
import {
    Box,
    Popover,
    PopoverTrigger,
    IconButton,
    useDisclosure,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    HStack,
    Spacer,
    Tabs,
    Text,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
} from "@chakra-ui/react";
import axios from "axios";
import { EditIcon } from "@chakra-ui/icons";
import ProfileForm from "./ProfileForm";
import PasswordForm from "./PasswordForm";

const ProfileEditContainer: React.FC<CancelProps> = (props) => {
    const [firstName, setFirstName] = useState("");
    const [surname, setSurname] = useState("");
    const [username, setUsername] = useState("");

    const { onOpen, onClose, isOpen } = useDisclosure({
        onClose: () => props.onCancel(),
    });

    useEffect(() => {
        axios
            .get("/user/me")
            .then(({ data }) => {
                setFirstName(data.firstName);
                setSurname(data.surname);
                setUsername(data.username);
            })
            .catch((e) => console.log(e));
    }, [firstName, surname, username]);

    return (
        <>
            <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose} placement="right" closeOnBlur={true}>
                <PopoverTrigger>
                    <HStack spacing={2} flex="justify-content-center" justify="center" align="center">
                        <Box d="inline-block" ml={1} maxWidth="200px">
                            <Text isTruncated>{`${firstName} ${surname}`}</Text>
                        </Box>
                        <Spacer />
                        <Box d="inline-block">
                            <IconButton size="md" aria-label="Edit" icon={<EditIcon />} />
                        </Box>
                    </HStack>
                </PopoverTrigger>
                <PopoverContent p={5}>
                    <FocusLock returnFocus persistentFocus={false}>
                        <PopoverArrow />
                        <PopoverCloseButton />

                        <Tabs>
                            <TabList>
                                <Tab>My profile</Tab>
                                <Tab>Change password</Tab>
                            </TabList>

                            <TabPanels>
                                <TabPanel>
                                    <ProfileForm
                                        onCancel={onClose}
                                        person={{
                                            firstName,
                                            surname,
                                            username,
                                            setFirstName,
                                            setSurname,
                                        }}
                                    />
                                </TabPanel>
                                <TabPanel>
                                    <PasswordForm onCancel={onClose} />
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </FocusLock>
                </PopoverContent>
            </Popover>
        </>
    );
};

export default ProfileEditContainer;
