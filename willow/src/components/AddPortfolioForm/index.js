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
import StockDetailsForm from "./StockDetailsForm";
import { saveAs } from "file-saver";

// Error message for fields in the form
const ERROR_MSGS = {
  nameMissing: "Name is required",
  fileMissing: "file upload is required",
  yearlyContributionAmountMissing: "Yearly contribution amount is required",
  dividendReinvestmentMissing: "Dividend reinvestment is required",
  symbolPerStockMissing: "Symbol per stock array is required ",
  pricePerStockMissing: "Price per stock array is required",
  quantityPerStockMissing: "Quantity per stock array is required",
  namePerAssetMissing: "name per asset array is required",
  valuePerAssetMissing: "value_per_asset array is required",
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
  yearly_contribution_amount: Yup.number()
    .min(0)
    .required(ERROR_MSGS.yearlyContributionAmountMissing),
  dividend_reinvestment: Yup.string().required(
    ERROR_MSGS.dividendReinvestmentMissing
  ),
  stock_names: Yup.array()
    .of(Yup.string())
    .required(ERROR_MSGS.symbolPerStockMissing),
  price_per_stock: Yup.array()
    .of(Yup.number().min(1))
    .min(1)
    .required(ERROR_MSGS.pricePerStockMissing),
  quantity_per_stock: Yup.array()
    .of(Yup.number().min(1))
    .min(1)
    .required(ERROR_MSGS.quantityPerStockMissing),
  name_per_asset: Yup.array()
    .of(Yup.string())
    .required(ERROR_MSGS.namePerAssetMissing),
  value_per_asset: Yup.array()
    .of(Yup.number().min(1))
    .min(1)
    .required(ERROR_MSGS.valuePerAssetMissing),
});

const CreatePortfolioSchema = StageOneSchema.concat(StageTwoSchema);

// Check input of stage two of add task form using StageTwoSchema
function validateStageOne(values) {
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
  try {
    StageTwoSchema.validateSync({
      name: values.name,
      key: values.key,
      yearly_contribution_amount: values.yearly_contribution_amount,
      dividend_reinvestment: values.dividend_reinvestment,
      stock_names: values.stock_names,
      price_per_stock: values.price_per_stock,
      quantity_per_stock: values.quantity_per_stock,
      name_per_asset: values.name_per_asset,
      value_per_asset: values.value_per_asset,
    });
    return false;
  } catch (e) {
    // console.log(e)
    return true;
  }
}

export function MasterForm({
  enqueueSnackbar,
  handleSubmit,
  setClose,
  resetForm,
  setFieldValue,
  setPortfolioStage,
  setStage,
  setValues,
  stage,
  values,
}) {
  const [fileState, setFileState] = useState(true);
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
    setClose(values);
    setFileState(true);
    setStage(1);
    // setPortfolioStage(values);
  };

  return (
    <Tabs
      isFitted
      variant="soft-rounded"
      colorScheme="green"
      align="center"
      index={stage - 1}
    >
      <TabList style={{ paddingBottom: "2vw" }}>
        <Tab onClick={() => setStage(1)}>Upload Portfolio</Tab>
        <Tab isDisabled={fileState} onClick={() => setStage(2)}>
          {" "}
          Stock Details{" "}
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <FileUploadForm
            setFieldValue={setFieldValue}
            handleSubmit={handleSubmit}
            setClose={() => closeModel()}
            resetForm={resetForm}
            setStage={setStage}
            setFileState={setFileState}
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
    yearly_contribution_amount: 0,
    dividend_reinvestment: "yes",
    stock_names: [],
    price_per_stock: [],
    quantity_per_stock: [],
    name_per_asset: [],
    value_per_asset: [],
  }),
  handleSubmit: async (values, { setSubmitting }) => {
    // setPortfolioStage(values);
    // console.log("Got here without error")
    try {
      // console.log(values)
    } catch (e) {
      console.log(e);
    }
  },
  validationSchema: () => CreatePortfolioSchema,
  validateOnBlur: false,
  validateOnChange: false,
})(MasterForm);

export default withSnackbar(EnhancedMasterForm);
