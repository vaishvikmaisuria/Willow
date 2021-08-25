import React from "react";
import {
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
} from "@chakra-ui/react";
import { withFormik } from "formik";
import { withSnackbar } from "notistack";
import * as Yup from "yup";
import SingleStockForm from "./SingleStockForm";
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


const CreateStockSchema = StageOneSchema;

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
        setClose(values);
    }

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
                    <SingleStockForm
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
    validationSchema: () => CreateStockSchema,
    validateOnBlur: false,
    validateOnChange: false,
})(MasterForm);

export default withSnackbar(EnhancedMasterForm);
