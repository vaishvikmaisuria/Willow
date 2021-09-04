import React, { useEffect, useContext, useState } from "react";
import { Badge, Box, Heading, Stack, Button } from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { withSnackbar } from "notistack";
import { Link } from "react-router-dom";
import { useAsync } from "react-use";
import { fetchDividend } from "../../requests/stocks";
import Header from "../../components/Header";
import "./StockInfo.css";
import useStyles from "../../assets/mainStyles";
import TaskView from "../../components/TaskView";
import AddStockForm from "../../components/AddStockForm";
import StocksContext from "../../store/stocks-context";

// Individual task items tags
export function TaskItem({ task }) {
  const taskColor = (status) => {
    switch (status) {
      case "Complete":
        return "green";
      case "Pending":
        return "yellow";
      case "Error":
        return "red";
      case "Marking":
        return "red";
      default:
        return "";
    }
  };

  let new_Path = "/stocks/";

  return (
    <Link to={new_Path}>
      <Box p={5} mb={4} shadow="md" borderWidth="1px">
        <Heading fontSize="xl">
          {task.name}{" "}
          <Badge colorScheme={taskColor(task.status)}>{task.status}</Badge>
        </Heading>
      </Box>
    </Link>
  );
}

// get all the Stocks and their info
export function StockInfo({ enqueueSnackbar }) {
  const stocksCtx = useContext(StocksContext);
  let moneyInvested = 0;
  let totalDividendY = 0;
  let stockCTXData = stocksCtx.stocks;
  let rowData = [];

  if (stockCTXData.stock_names) {
    stockCTXData.stock_names.forEach(function (value, i) {
      let stock = {
        Stock: value,
        QuantityValue: stockCTXData.quantity_per_stock[i],
        BoughtValue: stockCTXData.price_per_stock[i],
        CurrentPrice: stockCTXData.price_per_stock[i],
        DividendValue: "Unknown",
      };
      moneyInvested =
        moneyInvested +
        stockCTXData.price_per_stock[i] * stockCTXData.quantity_per_stock[i];
      rowData.push(stock);
    });
  }
  const [stockData, setStockData] = useState(rowData);
  const tasks = useAsync(fetchDividend, []);

  useEffect(() => {
    if (tasks.error) {
      console.log(tasks.error);
      enqueueSnackbar("Failed fetching tasks", { variant: "error" });
    }
  }, [tasks, enqueueSnackbar]);

  const classes = useStyles();
  function updateDividendHandler() {
    console.log("call Api here!");
  }

  function updateStockHandler(stock) {
    let data = {
      Stock: stock.name,
      QuantityValue: stock.quantity,
      BoughtValue: stock.price,
      CurrentPrice: stock.price,
      DividendValue: "Unknown",
    };
    stocksCtx.addStock(stock);
    setStockData((stockData) => [...stockData, data]);
  }

  return (
    <div>
      <Header />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Stack w="100%" direction="row" mt={10} ml={20}>
          <Box w="20%" h={78} borderWidth="1.5px" borderRadius="lg">
            <Box as="button" borderRadius="md" mt={2} px={4} h={8}>
              Total Invested: {moneyInvested}{" "}
            </Box>
          </Box>
          <Box w="20%" h={78} borderWidth="1.5px" borderRadius="lg">
            <Box as="button" borderRadius="md" mt={2} px={4} h={8}>
              Dividend this Year: {totalDividendY}{" "}
            </Box>
          </Box>

          <Box w="53%" h={78} borderWidth="1.5px" borderRadius="lg">
            {/* Add new Stock form */}
            <AddStockForm type="Stock" setStockData={updateStockHandler} />
            <Button onClick={updateDividendHandler} m={4} ml={5} bg="#826dff">
              <Box d="flex" justify="center">
                <PlusSquareIcon style={{ size: "2em", marginTop: "2px" }} />{" "}
                Update Info
              </Box>
            </Button>
          </Box>
        </Stack>
        <Stack ml={20}>
          <Box
            w="100%"
            mt={5}
            borderWidth="1.5px"
            borderRadius="lg"
            overflow="hidden"
          >
            {/* Information about the Stocks */}
            <TaskView stockData={stockData} />
          </Box>
        </Stack>
      </main>
    </div>
  );
}

export default withSnackbar(StockInfo);
