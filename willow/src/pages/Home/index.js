import { Center } from "@chakra-ui/react";
import React, {useState} from "react";
import Header from "../../components/Header";
import useStyles from "../../assets/mainStyles";
import StockGraph from "../../components/StockGraph";
import AssetsGraph from "../../components/AssetsGraph";
import AddStockForm from "../../components/AddStockForm";

// landing page for the application 
export function HomePage() {
  const classes = useStyles();
  
  const [PortfolioData, setPortfolioData] = useState({});
  

  return (
    <div>
      <Header />
      <main className={classes.content}>
        <div className={classes.toolbar} />
          <Center mt={2}>
            <AddStockForm type="Portfolio" setPortfolioData={setPortfolioData} />
          </Center>
          <Center mt={3}>
            <StockGraph stockData={PortfolioData} />
            <AssetsGraph assetData={PortfolioData} />
          </Center>
      </main>
    </div>
  );
}
export default HomePage;
