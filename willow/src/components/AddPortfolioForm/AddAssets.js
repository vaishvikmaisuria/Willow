import React from "react";
import {
  Button,
  Flex,
  Input,
  NumberInput,
  NumberInputField,
  Tooltip,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

// Single row of Stock input containing stock name and quantity,price and delete symbol 
function AssetsInput({
  index,
  asset,
  handleNameChange,
  handleNumChange,
  handleDelete,
}) {

  return (
    <Flex
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      pb={2}
      key={index}
      mt={2}
    >
      <Input
        m={2}
        aria-label={`asset-${index}-input`}
        name={`name_per_asset,${index}`}
        placeholder="Asset Name"
        value={asset[0]}
        onChange={(e) => {
          handleNameChange(index, e.target.value);
        }}
        key={`input-${index}`}
        width="40%"
      />
      <Tooltip label="Value of Asset" fontSize="md"> 
        <NumberInput
          m={2}
          min={0}
          name={`value_per_asset,${index}`}
          defaultValue={0}
          value={parseInt(asset[1])}
          width="40%"
          onChange={(value) => {
            handleNumChange(index, parseInt(value));
          }}
          key={`numinput-${index}`}
        >
          <NumberInputField aria-label={`num-${index}-input`} />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Tooltip>
      <Button
        aria-label="Delete asset"
        data-testid={`delete-btn-${index}`}
        onClick={() => {
          handleDelete(index);
        }}
      >
        <DeleteIcon />
      </Button>
    </Flex>
  );
}

// Add Stock mechanism for stage 2 of add task form -> to configure number of Assets
function AddAssets({ values, setFieldValue }) {
  
  let asset_names = values.name_per_asset || [];
  let value_per_asset = values.value_per_asset || [];
  
  const handleAddition = () => {
    asset_names.push(`Asset ${asset_names.length + 1}`);
    value_per_asset.push(0);
    setFieldValue("asset_names", asset_names);
    setFieldValue("value_per_asset", value_per_asset);
  };

  const handleNameChange = (index, value) => {
    if (index >= 0 && index < asset_names.length) {
        asset_names[index] = value;
        setFieldValue("asset_names", asset_names);
    }
  };

  const handleNumChange = (index, value) => {
    if (index >= 0 && index < value_per_asset.length) {
        value_per_asset[index] = value;
      setFieldValue("value_per_asset", value_per_asset);
    }
  };

  const handleDelete = (index) => {
    if (index >= 0 && index < asset_names.length) {
        asset_names.splice(index, 1);
        value_per_asset.splice(index, 1);
        setFieldValue("asset_names", asset_names);
        setFieldValue("value_per_asset", value_per_asset);
    }
  };

  let i = 0;
  let assets = [];
  for (i = 0; i < asset_names.length; i++) {
    assets.push([asset_names[i], value_per_asset[i]]);
  }
  
  return (
    <>
        <Button mt={2} onClick={handleAddition} >
          Add Assets
        </Button>
        {assets.length > 0 &&
          assets.map((asset, index) => {
            return (
              <AssetsInput
                key={index}
                index={index}
                asset={asset}
                handleNameChange={handleNameChange}
                handleNumChange={handleNumChange}
                handleDelete={handleDelete}
              />
            );
          })
        }
    </>
  );
}

export default AddAssets;
