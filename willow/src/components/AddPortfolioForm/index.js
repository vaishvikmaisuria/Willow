import React, { useState } from "react";
import {
    Button,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
} from "@chakra-ui/react";
import { withFormik } from "formik";
import { withSnackbar } from "notistack";
import * as Yup from "yup";
import FileUploadForm from "./FileUploadForm";
import StockDetailsForm from "./StockDetailsForm"
import { saveAs } from "file-saver";

// Error message for fields in the form 
const ERROR_MSGS = {
    nameMissing: "Name is required",
    fileMissing: "file upload is required",
    pricePerStockMissing: "Price per stock is required",
};

// Scheme of the connector
const StageOneSchema = Yup.object().shape({
    name: Yup.string().min(1).required(ERROR_MSGS.nameMissing), // STAGE 1
    key: Yup.string().min(1).required(ERROR_MSGS.fileMissing),
});

// Scheme of Stage two of the form 
export const StageTwoSchema = Yup.object().shape({
    name: Yup.string().min(1).required(ERROR_MSGS.nameMissing), // STAGE 2
    key: Yup.string().min(1).required(ERROR_MSGS.fileMissing),
    symbol_per_stock: Yup.array()
      .of(Yup.string())
      .required(ERROR_MSGS.questionNamesMissing),
    price_per_stock: Yup.array()
      .of(Yup.number().min(1))
      .min(1)
      .required(ERROR_MSGS.pricePerStockMissing),
    quantity_per_stock: Yup.array()
      .of(Yup.number().min(1))
      .min(1)
      .required(ERROR_MSGS.pricePerStockMissing),
    name_per_asset: Yup.array()
      .of(Yup.string())
      .required(ERROR_MSGS.questionNamesMissing),
    value_per_asset: Yup.array()
      .of(Yup.number().min(1))
      .min(1)
      .required(ERROR_MSGS.pricePerStockMissing),
});

const CreateTaskSchema = StageOneSchema.concat(StageTwoSchema);

// Check input of stage two of add task form using StageTwoSchema
function validateStageOne(values) {
    console.log(values)
    try {
        StageOneSchema.validateSync({
            name: values.name,
            key: values.key,
        });
        return false;
    } catch (e) {
        return true;
    }
}

// Check input of stage two of add task form using StageTwoSchema
function validateStageTwo(values) {
    console.log(values)
    try {
      StageTwoSchema.validateSync({
        name: values.name,
        key: values.key,
        symbol_per_stock: values.symbol_per_stock,
        price_per_stock: values.price_per_stock,
        quantity_per_stock: values.quantity_per_stock,
        name_per_asset: values.question_names,
        value_per_asset: values.submission_file_name,
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
    const [fileState, setFileState] = useState(false);
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
    const closeModel = () => {
        setClose();
    }

    return (
        <Tabs
            isFitted
            variant="soft-rounded"
            colorScheme="green"
            align="center"
            index={stage - 1}
        >
            <TabList style={{ paddingBottom: "2vw" }}>
                <Tab  onClick={() => setStage(1)}>Upload Portfolio</Tab>
                <Tab isDisabled={fileState} onClick={() => setStage(2)}> Stock Details </Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    <FileUploadForm
                        setFieldValue={setFieldValue}
                        handleSubmit={handleSubmit}
                        setClose={() => closeModel()}
                        resetForm={resetForm}
                        setStage={setStage}
                        setFileState = {setFileState}
                        setValues={setValues}
                        validate={() => validateStageOne(values)}
                        values={values}
                    />
                </TabPanel>
                <TabPanel>
                    <StockDetailsForm
                        saveBtn={saveBtn}
                        handleSubmit={handleSubmit}
                        setClose={() => closeModel()}
                        setFieldValue={setFieldValue}
                        setStage={setStage}
                        validate={() => validateStageTwo(values)}
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
        key: "",
        symbol_per_stock: [],
        price_per_stock: [],
        quantity_per_stock: [],
        name_per_asset: [],
        value_per_asset:[],
    }),
    handleSubmit: async (values, { setSubmitting }) => {  
        try{
            console.log(values)
        } catch (e){
            console.log(e)
        }
       
    },
    validationSchema: () => CreateTaskSchema,
    validateOnBlur: false,
    validateOnChange: false,
})(MasterForm);

export default withSnackbar(EnhancedMasterForm);
