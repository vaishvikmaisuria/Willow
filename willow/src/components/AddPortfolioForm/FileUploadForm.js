import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/react";

import { withSnackbar } from "notistack";
import { InputField } from "../InputFieldForm";

// Model of form according to information about the task
const firstStage = [
  {
    name: "name",
    type: "string",
    info: "",
    placeholder: "Jarvis Crypto",
    required: true,
  },
];

// First form for adding task containing option of connector, preloaded configuration, questions
function FileUploadForm({
  enqueueSnackbar,
  resetForm,
  setFieldValue,
  validate,
  setStage,
  setFileState,
  setValues,
  values,
}) {
  function handleChange(e, name, type, isExtraField) {
    let value;
    if (type === "number") value = e;
    else value = e.target.value;
    setFieldValue(name, value);
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
          <FormLabel htmlFor="config">Configuration</FormLabel>
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
                  setFileState(false);
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
            Upload a Portfolio configuration json file for quick form completion
          </FormHelperText>
        </Box>
      </FormControl>
      <Button
        disabled={validate()}
        isLoading={false}
        m={3}
        style={{ float: "right" }}
        variantcolor="blue"
        onClick={() => {
          setStage(2);
        }}
      >
        Continue
      </Button>
    </form>
  );
}

export default withSnackbar(FileUploadForm);
