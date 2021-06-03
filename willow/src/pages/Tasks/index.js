import React, { useEffect } from "react";
import { Badge, Button, Box, Heading, Stack } from "@chakra-ui/react";
import { withSnackbar } from "notistack";
import { ViewIcon, CheckCircleIcon, QuestionIcon } from '@chakra-ui/icons';
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useAsync } from "react-use";
import { fetchTasks } from "../../requests/tasks";
import Header from "../../components/Header";
import "./Tasks.css";
import useStyles from "../../assets/mainStyles";
import TaskView from "../../components/TaskView";
import AddTaskForm from "../../components/AddTaskForm";


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

  let new_Path = "/tasks/";
  if (task.tid || task.tid === 0) {
    new_Path = "/tasks/" + task.tid + "/";
  }

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
// get all the task 
export function Tasks({ enqueueSnackbar }) {
  const tasks = useAsync(fetchTasks, []);
  useEffect(() => {
    if (tasks.error) {
      console.log(tasks.error)
      enqueueSnackbar("Failed fetching tasks", { variant: "error" });
    }
  }, [tasks, enqueueSnackbar]);
  let botsRunning = 1;
  let totalCarts = 2;
  let totalCheckout = 4;

  const classes = useStyles();
  return (
    <div>
      <Header />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Stack w="100%" direction="row" mt={10} ml={20}>
          <Box w="15%" borderWidth="1.5px" borderRadius="lg" >
            {/* Total amount of bots running */}
            <Box as="button" borderRadius="md" mt={3} px={4} h={8}>
              <ViewIcon w={30} h={30} ml={-50} mr={50} color="#5e43fb" />
              {" "}{botsRunning} {" "}
                Total Money Invested
              </Box>
          </Box>
          <Box w="15%" h={59} borderWidth="1.5px" borderRadius="lg" >
            {/* Total carts */}
            <Box as="button" borderRadius="md" mt={3} px={4} h={8}>
              <QuestionIcon w={30} h={30} ml={-50} mr={50} color="#f0a278" />
              {" "}{totalCarts} {" "}
                Total Dividend this Month
              </Box>
          </Box>
          <Box w="15%" h={59} borderWidth="1.5px" borderRadius="lg" >
            {/* Total number of items bought */}
            <Box as="button" borderRadius="md" mt={3} px={4} h={8}>
              <CheckCircleIcon w={30} h={30} ml={-50} mr={50} color="LightGreen" />
              {" "}{totalCheckout} {" "}
                Total Dividend this Year
              </Box>
          </Box>

          <Box w="49.5%" h={59} borderWidth="1.5px" borderRadius="lg" >
            {/* Start a new Bot */}
            <AddTaskForm/>
        
          </Box>
        </Stack>
        <Stack ml={20}>
          <Box w="100%" mt={5} borderWidth="1.5px" borderRadius="lg" overflow="hidden">
            {/* Information about the Automated system */}
            <TaskView />

          </Box>
        </Stack>
      </main>
    </div>
  );
}

export default withSnackbar(Tasks);
