import React from "react";
import {
    Button,
    Modal,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Spacer,
    useDisclosure,
} from "@chakra-ui/react";
import SignIn from "./login/SignIn";

const LoginModal: React.FC = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button colorScheme="gray" size="sm" rounded="md" onClick={onOpen}>
                Sign in
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Spacer />
                        <ModalCloseButton />
                    </ModalHeader>
                    <SignIn onOpen={onOpen} onClose={onClose} isOpen={isOpen} />
                </ModalContent>
            </Modal>
        </>
    );
};
export default LoginModal;
