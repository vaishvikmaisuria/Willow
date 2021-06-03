import { React, useState } from "react";
import { PlusSquareIcon } from '@chakra-ui/icons'
import MasterForm from "../MasterForm"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Box,
} from "@chakra-ui/react"

function AddTaskForm() {
    const [stage, setStage] = useState(1);
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    const closeModel = () => {
        onClose();
    }

    return (
        <>
            <Button onClick={onOpen} m={2} ml={5} bg="#826dff">
                <Box d="flex" justify="center">
                    <PlusSquareIcon
                        style={{ size: "2em", marginTop: "2px" }}
                    />{" "}
                  Add Stock
                </Box>
            </Button>
            <Modal
                closeOnOverlayClick={false}
                scrollBehavior={"inside"}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create your account</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <MasterForm
                            stage={stage}
                            setClose ={() => closeModel()}
                            setStage={setStage}
                        />
                    </ModalBody>
                    
                </ModalContent>
                
            </Modal>
        </>
    )
}

export default AddTaskForm;