import { createContext, useState } from "react";

// react component parameter is initial state
const StocksContext = createContext({
  stocks: {},
  addStock: (newStock) => {},
  updateStocks: (newStocks) => {},
  removeStock: (StockSymbol) => {},
});

export function StockContextProvider(props) {
  const [userStocks, setUserStocks] = useState({
    stock_names: [],
    price_per_stock: [],
    quantity_per_stock: [],
  });

  function addStockHandler(newStock) {
    setUserStocks((prevUserStocks) => ({
      stock_names: [...prevUserStocks.stock_names, newStock.name],
      price_per_stock: [...prevUserStocks.price_per_stock, newStock.price],
      quantity_per_stock: [
        ...prevUserStocks.quantity_per_stock,
        newStock.quantity,
      ],
    }));
  }

  function updateAllStocksHandler(newStocks) {
    setUserStocks(newStocks);
  }

  function removeStocksHandler(StockSymbol) {
    setUserStocks((prevUserStocks) => {
      return prevUserStocks;
    });
  }

  const context = {
    stocks: userStocks,
    addStock: addStockHandler,
    updateStocks: updateAllStocksHandler,
    removeStock: removeStocksHandler,
  };

  return (
    <StocksContext.Provider value={context}>
      {props.children}
    </StocksContext.Provider>
  );
}

export default StocksContext;
