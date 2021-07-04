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
function StockInput({
  index,
  stock,
  handleNameChange,
  handlePriceChange,
  handleQtyChange,
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
        aria-label={`stock-${index}-input`}
        name={`stock_names,${index}`}
        placeholder="Stock Name"
        value={stock[0]}
        onChange={(e) => {
          handleNameChange(index, e.target.value);
        }}
        key={`input-${index}`}
        width="40%"
      />
      <Tooltip label="Quantity of Stock" fontSize="md">      
        <NumberInput
          m={2}
          min={0}
          name={`quantity_per_stock,${index}`}
          defaultValue={0}
          value={parseInt(stock[2])}
          width="40%"
          onChange={(value) => {
            handleQtyChange(index, parseInt(value));
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
      <Tooltip label="Price of Stock" fontSize="md">
      <NumberInput
          m={2}
          min={0}
          name={`price_per_stock,${index}`}
          defaultValue={0}
          value={parseInt(stock[1])}
          width="40%"
          onChange={(value) => {
            handlePriceChange(index, parseInt(value));
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
        aria-label="Delete stock"
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

// Add Stock mechanism for stage 2 of add task form -> to configure number of stocks
function AddStocks({ values, setFieldValue }) {
  
  let stock_names = values.symbol_per_stock;
  let price_per_stock = values.price_per_stock;
  let quantity_per_stock = values.quantity_per_stock;
  
  const handleAddition = () => {
    stock_names.push(`Stock ${stock_names.length + 1}`);
    price_per_stock.push(0);
    quantity_per_stock.push(0);
    setFieldValue("stock_names", stock_names);
    setFieldValue("price_per_stock", price_per_stock);
    setFieldValue("quantity_per_stock", quantity_per_stock);
  };

  const handleNameChange = (index, value) => {
    if (index >= 0 && index < stock_names.length) {
      stock_names[index] = value;
      setFieldValue("stock_names", stock_names);
    }
  };

  const handleQtyChange  = (index, value) => {
    if (index >= 0 && index < quantity_per_stock.length) {
      quantity_per_stock[index] = value;
      setFieldValue("quantity_per_stock", quantity_per_stock);
    }
  };

  const handlePriceChange = (index, value) => {
    if (index >= 0 && index < price_per_stock.length) {
      price_per_stock[index] = value;
      setFieldValue("price_per_stock", price_per_stock);
    }
  };

  const handleDelete = (index) => {
    if (index >= 0 && index < stock_names.length) {
      stock_names.splice(index, 1);
      price_per_stock.splice(index, 1);
      setFieldValue("stock_names", stock_names);
      setFieldValue("price_per_stock", price_per_stock);
    }
  };

  let i = 0;
  let stocks = [];
  for (i = 0; i < stock_names.length; i++) {
    stocks.push([stock_names[i], price_per_stock[i], quantity_per_stock[i]]);
  }
  
  return (
    <>
        <Button mt={2} onClick={handleAddition} >
          Add Stock
        </Button>
        {stocks.length > 0 &&
          stocks.map((stock, index) => {
            return (
              <StockInput
                key={index}
                index={index}
                stock={stock}
                handleNameChange={handleNameChange}
                handlePriceChange={handlePriceChange}
                handleQtyChange={handleQtyChange}
                handleDelete={handleDelete}
              />
            );
          })
        }
    </>
  );
}

export default AddStocks;
