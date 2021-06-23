import React from "react";
import { formatFieldToTitle } from "../../helpers";
import {
    Box,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Select,
  } from "@chakra-ui/react";

// set the input fields for the form 
export function InputField({
    name,
    field,
    index,
    isExtraField,
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
          value={
            isExtraField && values.extra_fields
              ? values.extra_fields[name]
              : values[name]
          }
          onChange={(value) => handleChange(value, name, "number", isExtraField)}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      );
    } else if (type === "dropdown") {
      const value =
        isExtraField && values.extra_fields
          ? values.extra_fields[name]
          : values[name];
      input = (
  
        <Select
          placeholder="Select option"
          name={name}
          onChange={(e) => handleChange(e, name, "string", isExtraField)}
          value={value}
        >
          {options.map((option, index) => {
            return (
              <option
                key={index}
                value={option.value}
              >
                {option.label}
              </option>
            );
          })}
        </Select>
      );
    } else {
      input = (
        <Input
          aria-label={name}
          name={name}
          placeholder={placeholder}
          value={
            isExtraField && values.extra_fields
              ? values.extra_fields[name]
              : values[name]
          }
          onChange={(e) => handleChange(e, name, "string", isExtraField)}
        />
      );
    }
  
    return (
      <FormControl key={index} mt={4} htmlFor={name}>
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