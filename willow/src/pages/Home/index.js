import { Center } from "@chakra-ui/react";
import React, { useContext } from "react";
import Header from "../../components/Header";
import useStyles from "../../assets/mainStyles";
import StockGraph from "../../components/StockGraph";
import AssetsGraph from "../../components/AssetsGraph";
import AddStockForm from "../../components/AddStockForm";
import StocksContext from "../../store/stocks-context";

// landing page for the application
export function HomePage() {
  const stocksCtx = useContext(StocksContext);

  const classes = useStyles();

  // const [PortfolioData, setPortfolioData] = useState({});

  return (
    <div>
      <Header />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Center mt={2}>
          <AddStockForm
            type="Portfolio"
            setPortfolioData={stocksCtx.updateStocks}
          />
        </Center>
        <Center mt={3}>
          <StockGraph stockData={stocksCtx.stocks} />
          <AssetsGraph assetData={stocksCtx.stocks} />
        </Center>
      </main>
    </div>
  );
}
export default HomePage;
