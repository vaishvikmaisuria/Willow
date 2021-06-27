import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Link,
} from "@chakra-ui/react";

import { withSnackbar } from "notistack";
import { InputField } from "../InputFieldForm";

// Model of form according to information about the task 
const firstStage = [
  {
    name: "name",
    type: "string",
    info: "",
    placeholder: "AAPL",
    required: true,
  },
  {
    name: "quantity",
    type: "string",
    placeholder: "10",
    info: "",
    required: true,
  },
  {
    name: "price",
    type: "string",
    placeholder: "100",
    info: "",
    required: true,
  },
];

// First form for adding task containing option of connector, preloaded configuration, questions 
function TaskDetailsForm({
  enqueueSnackbar,
  resetForm,
  setFieldValue,
  saveBtn,
  validate,
  setValues,
  setClose,
  handleSubmit,
  values,
}) {

  function handleChange(e, name, type, isExtraField) {
    let value;
    if (type === "number") value = e;
    else value = e.target.value;
    setFieldValue(name, value);
  }

  function handlebtnSubmit() {
    handleSubmit();
    setClose();
  }

  return (
    <form>
      <Box mt={-10}>
        {firstStage.map((field, index) => {
          return (
            // input fields for the information about the task
            <InputField
              key={index}
              name={field.name}
              field={field}
              index={index}
              isExtraField={false}
              values={values}
              handleChange={handleChange}
            />
          );
        })}
      </Box>
      <FormControl mt={2}>
        <Box d="flex" justifyContent="left">
          <FormLabel htmlFor="config">Configuration (Optional)</FormLabel>
        </Box>
        <Box d="flex" justifyContent="left">
          <input
            type="file"
            onChange={(e) => {
              const fileReader = new FileReader();
              const fileName = e.target.files[0].name;
              if (!fileName.endsWith(".json")) {
                resetForm();
                enqueueSnackbar("Config file uploaded must be a .json", {
                  variant: "error",
                });
                return;
              }
              fileReader.readAsText(e.target.files[0], "UTF-8");
              fileReader.onload = (e) => {
                try {
                  const obj = JSON.parse(e.target.result);
                  setValues(obj);
                } catch (e) {
                  resetForm();
                  enqueueSnackbar("Provided file is incorrectly formatted", {
                    variant: "error",
                  });
                }
              };
            }}
          />
        </Box>
        <Box d="flex" justifyContent="left">
          <FormHelperText>
            Upload a task configuration json file for quick form completion
          </FormHelperText>
        </Box>
      </FormControl>
      
      <Button
        disabled={validate()}
        m={3}
        style={{ float: "right" }}
        variantcolor="blue"
        onClick={()=> handlebtnSubmit()}
      >
        <Link to="/">Submit</Link>
      </Button>
      {saveBtn}
    </form>
  );
}

export default withSnackbar(TaskDetailsForm);
