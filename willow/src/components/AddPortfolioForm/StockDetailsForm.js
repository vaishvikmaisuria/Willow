import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Radio,
  RadioGroup,
  Link,
  Stack,
} from "@chakra-ui/react";
import { withSnackbar } from "notistack";
import AddStocks from "./AddStocks";
import AddAssets from "./AddAssets";
import { formatFieldToTitle } from "../../helpers";

// Model of form according to information about the task 
const firstStage = [
  {
    name: "name",
    type: "string",
    title:"Portfolio Name",
    info: "",
    placeholder: "Jarvis Portfolio",
    required: true,
  },
  {
    name: "yearly_contribution_amount",
    type: "number",
    info: "",
    placeholder: "Jarvis Portfolio",
    required: true,
  },
  {
    name: "dividend_reinvestment",
    type: "radio",
    placeholder: "yes",
    info: "",
    required: true,
    options: [
      {
        label: "Yes",
        value: "yes",
      },
      {
        label: "No",
        value: "no",
      },
    ],
  },
];

// set the input fields for the form 
function InputField({
  name,
  field,
  index,
  values,
  handleChange,
}) {
  const type = field.type;
  const placeholder = field.placeholder;
  const info = field.info;
  const options = field.options ? field.options : [];
  let input;
  if (type === "number") {
    input = (
      <NumberInput
        min={0}
        defaultValue={0}
        value={ values[name]}
        onChange={(value) => handleChange(value, name, "number")}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    );
  } else if (type === "radio") {
    const value = values[name];
    input = (
      <RadioGroup
        mb={5}
        name={name}
        onChange={(e) => handleChange(e, name, "string")}
        value={value}
      >
        <Stack direction="row">
          {options.map((option, index) => {
            return (
              <Radio
                key={index}
                value={option.value}
                isChecked={value === option.value}
              >
                {option.label}
              </Radio>
            );
          })}
        </Stack>
      </RadioGroup>
    );
  } else {
    input = (
      <Input
        aria-label={name}
        name={name}
        placeholder={placeholder}
        value={values[name]}
        onChange={(e) => handleChange(e, name, "string")}
      />
    );
  }

  return (
    <FormControl key={index}  htmlFor={name}>
      <Box d="flex" justifyContent="left">
        <FormLabel htmlFor={name}>{formatFieldToTitle(name)}</FormLabel>
      </Box>
      {input}
      <Box d="flex" justifyContent="left">
        <FormHelperText>{info}</FormHelperText>
      </Box>
      <Box d="flex" justifyContent="left"></Box>
    </FormControl>
  );
}

function StockDetailsForm({
  assets,
  stocks,
  saveBtn,
  setFieldValue,
  validate,
  values,
  setClose,
  handleSubmit,
}) {
  
  // const info = connectorInfo.info;
  // const extraFields = connectorInfo.extra_fields;

  function handleChange(e, name, type) {
    let value;
 
    if (type === "number" || type === "string") {
      value = e;
    } else {
      value = e.target.value;
    }
    setFieldValue(name, value);
  
  }

  function handlebtnSubmit() {
    handleSubmit();
    setClose();
  }

  return (
    <>
      {firstStage.map((field, index) => {
        return (
          // input fields for the information about the task
          <InputField
            key={index}
            name={field.name}
            field={field}
            index={index}
            values={values}
            handleChange={handleChange}
          />
        );
      })}
        {/* add Question part of the form */}
        <AddStocks
          stocks={stocks}
          values={values}
          setFieldValue={setFieldValue}
        />
        <AddAssets
          assets={assets}
          values={values}
          setFieldValue={setFieldValue}
        />
        <Box mt={5}>
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
      </Box>
    </>
  );
}

export default withSnackbar(StockDetailsForm);
