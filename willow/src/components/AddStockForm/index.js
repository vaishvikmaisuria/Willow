import { React, useState } from "react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import MasterForm from "../MasterForm";
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
} from "@chakra-ui/react";
import AddPortfolioForm from "../AddPortfolioForm";

function AddStockForm({ type, setStockData, setPortfolioData }) {
  const [stockStage, setStockStage] = useState(1);
  const [portfolioStage, setPortfolioStage] = useState(1);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const closeModel = (values) => {
    onClose();
    if (type === "Portfolio") {
      setPortfolioData(values);
    } else {
      setStockData(values);
    }
  };

  let buttonText = "Add Stock";
  if (type === "Portfolio") {
    buttonText = "Add Portfolio";
  }

  return (
    <>
      <Button onClick={onOpen} m={2} ml={5} bg="#826dff">
        <Box d="flex" justify="center">
          <PlusSquareIcon style={{ size: "2em", marginTop: "2px" }} />{" "}
          {buttonText}
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
          <ModalHeader>Please fill all fields.</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {type === "Stock" ? (
              <MasterForm
                stage={stockStage}
                setStockData={setStockData}
                setClose={(values) => closeModel(values)}
                setStage={setStockStage}
              />
            ) : (
              <AddPortfolioForm
                stage={portfolioStage}
                setPortfolioData={setPortfolioData}
                setClose={(values) => closeModel(values)}
                setStage={setPortfolioStage}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddStockForm;
