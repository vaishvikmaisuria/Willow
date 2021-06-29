import React, { useEffect, useState } from "react";
import { Badge, Box, Heading, Stack } from "@chakra-ui/react";
import { withSnackbar } from "notistack";
import { Link } from "react-router-dom";
import { useAsync } from "react-use";
import { fetchDividend } from "../../requests/stocks";
import Header from "../../components/Header";
import "./StockInfo.css";
import useStyles from "../../assets/mainStyles";
import TaskView from "../../components/TaskView";
import AddStockForm from "../../components/AddStockForm";


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
  const tasks = useAsync(fetchDividend, []);
  useEffect(() => {
    if (tasks.error) {
      console.log(tasks.error)
      enqueueSnackbar("Failed fetching tasks", { variant: "error" });
    }
  }, [tasks, enqueueSnackbar]);
  
  const [stockData, setStockData] = useState({});

  let moneyInvested = 1000;
  let totalDividendM = 0;
  let totalDividendY = 0;
  if (tasks.value !== 0){
    totalDividendY = tasks.value;
  }
 

  const classes = useStyles();
  return (
    <div>
      <Header />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Stack w="100%" direction="row" mt={10} ml={20}>
          <Box w="15%" borderWidth="1.5px" borderRadius="lg" >
            <Box as="button" borderRadius="md" mt={3} px={4} h={8}>
              Total Money Invested : {" "}{moneyInvested} {" "}
            </Box>
          </Box>
          <Box w="15%" h={59} borderWidth="1.5px" borderRadius="lg" >
            <Box as="button" borderRadius="md" mt={3} px={4} h={8}>
                Total Dividend this Month : {" "}{totalDividendM} {" "}
            </Box>
          </Box>
          <Box w="15%" h={59} borderWidth="1.5px" borderRadius="lg" >
            <Box as="button" borderRadius="md" mt={3} px={4} h={8}>
                Total Dividend this Year : {" "}{totalDividendY} {" "}
            </Box>
          </Box>

          <Box w="49.5%" h={59} borderWidth="1.5px" borderRadius="lg" >
            {/* Add new Stock form */}
            <AddStockForm type="Stock" setStockData={setStockData} />
        
          </Box>
        </Stack>
        <Stack ml={20}>
          <Box w="100%" mt={5} borderWidth="1.5px" borderRadius="lg" overflow="hidden">
            {/* Information about the Stocks */}
            <TaskView stockData={stockData} />

          </Box>
        </Stack>
      </main>
    </div>
  );
}

export default withSnackbar(StockInfo);
