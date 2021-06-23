import { Center } from "@chakra-ui/react";
import React from "react";
import Header from "../../components/Header";
import useStyles from "../../assets/mainStyles";
import StockGraph from "../../components/StockGraph";
import AssetsGraph from "../../components/AssetsGraph";
import AddTaskForm from "../../components/AddTaskForm";

// landing page for the application 
export function HomePage() {
  const classes = useStyles();
  return (
    <div>
      <Header />
      <main className={classes.content}>
        <div className={classes.toolbar} />
          <Center mt={2}>
            <AddTaskForm type="Portfolio"/>
          </Center>
          <Center mt={3}>
            <StockGraph/>
            <AssetsGraph/>
          </Center>
      </main>
    </div>
  );
}
export default HomePage;
