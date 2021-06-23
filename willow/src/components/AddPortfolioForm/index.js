import React from "react";
import {
    Button,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
} from "@chakra-ui/react";
import { saveAs } from "file-saver";
import { withFormik } from "formik";
import { withSnackbar } from "notistack";
import * as Yup from "yup";
import FileUploadForm from "./FileUploadForm";
import { addStock } from "../../requests/stocks";

// Error message for fields in the form 
const ERROR_MSGS = {
    nameMissing: "Name is required",
    quantityMissing: "quantity of Stock is required",
    priceMissing: "Stock price is required",
};

// Scheme of the connector
const StageOneSchema = Yup.object().shape({
    name: Yup.string().min(1).required(ERROR_MSGS.nameMissing), // STAGE 1
    quantity: Yup.string().min(1).required(ERROR_MSGS.quantityMissing),
    price: Yup.string().min(1).required(ERROR_MSGS.priceMissing),
});


const CreateTaskSchema = StageOneSchema;

// Check input of stage two of add task form using StageTwoSchema
function validateStageOne(values) {
    try {
        StageOneSchema.validateSync({
            name: values.name,
            quantity: values.quantity,
            price: values.price,
        });
        return false;
    } catch (e) {
        return true;
    }
}

export function MasterForm({
    enqueueSnackbar,
    handleSubmit,
    setClose,
    resetForm,
    setFieldValue,
    setStage,
    setValues,
    stage,
    values,
}) {

    const closeModel = () => {
        setClose();
    }

    const saveBtn = (
        <Button
            m={3}
            style={{ float: "right" }}
            variant="outline"
            onClick={() => {
                let { files, ...valuesObj } = values;
                var file = new File(
                    [JSON.stringify(valuesObj)],
                    `task_${new Date()}.json`,
                    {
                        type: "text/plain;charset=utf-8",
                    }
                );
                saveAs(file);
            }}
        >
            Save
        </Button>
    );
    
    return (
        <Tabs
            isFitted
            variant="soft-rounded"
            colorScheme="green"
            align="center"
            index={stage -1}
        >
            <TabList style={{ paddingBottom: "2vw" }}>
                <Tab  onClick={() => setStage(1)}>Stock Details</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    <FileUploadForm
                        saveBtn={saveBtn}
                        setFieldValue={setFieldValue}
                        handleSubmit={handleSubmit}
                        setClose={() => closeModel()}
                        setValues={setValues}
                        validate={() => validateStageOne(values)}
                        values={values}
                    />
                </TabPanel>
                
            </TabPanels>
        </Tabs>
    );
}

export const EnhancedMasterForm = withFormik({
    enableReinitialize: false,
    mapPropsToValues: (props) => ({
        name: "",
        quantity: "",
        price: "",
    }),
    handleSubmit: async (values, { setSubmitting, resetForm }) => {  
        try{
            const taskRes = await addStock({
                values
            });
            console.log(taskRes)
        } catch (e){
            console.log(e)
        }
       
    },
    validationSchema: () => CreateTaskSchema,
    validateOnBlur: false,
    validateOnChange: false,
})(MasterForm);

export default withSnackbar(EnhancedMasterForm);
