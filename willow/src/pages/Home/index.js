import { Center, Text } from "@chakra-ui/react";
import React from "react";
import Header from "../../components/Header";
import useStyles from "../../assets/mainStyles";
import StockGraph from "../../components/StockGraph";
import AssetsGraph from "../../components/AssetsGraph";

// landing page for the application 
export function HomePage() {
  const classes = useStyles();
  return (
    <div>
      <Header />
      <main className={classes.content}>
        <div className={classes.toolbar} />
          <Center>
            <Text>
              This page will show the price history
            </Text>
          </Center>
          <Center>
            <Text>
              This page will show the price history
            </Text>
          </Center>
          <Center>
            <StockGraph/>
            <AssetsGraph/>
          </Center>
      </main>
    </div>
  );
}
export default HomePage;
