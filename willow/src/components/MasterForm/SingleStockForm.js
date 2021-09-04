import React from "react";
import { Box, Button, Link } from "@chakra-ui/react";
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
function SingleStockForm({
  enqueueSnackbar,
  resetForm,
  setFieldValue,
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

      <Button
        disabled={validate()}
        m={3}
        style={{ float: "right" }}
        variantcolor="blue"
        onClick={() => handlebtnSubmit()}
      >
        <Link to="/">Submit</Link>
      </Button>
    </form>
  );
}

export default withSnackbar(SingleStockForm);
