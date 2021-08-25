import React, {useEffect} from "react";
import { Table, Thead, Tbody, Tr, Th, Td, chakra } from "@chakra-ui/react"
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons"
import { useTable, useSortBy } from "react-table"
import { withSnackbar } from "notistack";

function TaskView(props) {
  let {stockData} = props
  let rowData = []
  let stockName = stockData.stock_names;
  useEffect(()=> {
    stockName.forEach(function (value, i) {
      let stock = {
        "Stock": value,
        "QuantityValue": stockData.quantity_per_stock[i],
        "BoughtValue": stockData.price_per_stock[i],
        "CurrentPrice": stockData.price_per_stock[i],
        "DividendValue": "Unknown",
      }
      rowData.push(stock)
    });
  
  }, [stockData]);

  if (stockName) {
    stockName.forEach(function (value, i) {
      let stock = {
        "Stock": value,
        "QuantityValue": stockData.quantity_per_stock[i],
        "BoughtValue": stockData.price_per_stock[i],
        "CurrentPrice": stockData.price_per_stock[i],
        "DividendValue": "Unknown",
      }
      rowData.push(stock)
    });
    
  }
  
  const data = React.useMemo(
    () => rowData,
    [],
  )

  const columns = React.useMemo(
    () => [
      {
        Header: "Stock Name",
        accessor: "Stock",
      },
      {
        Header: "Quantity",
        accessor: "QuantityValue",
      },
      {
        Header: "Bought Price",
        accessor: "BoughtValue",
      },
      {
        Header: "Current Price",
        accessor: "CurrentPrice",
      },
      {
        Header: "Dividends",
        accessor: "DividendValue",
      },
    ],
    [],
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy)

  return (
    <Table {...getTableProps()}>
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                isNumeric={column.isNumeric}
              >
                {column.render("Header")}
                <chakra.span pl="4">
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <TriangleDownIcon aria-label="sorted descending" />
                    ) : (
                      <TriangleUpIcon aria-label="sorted ascending" />
                    )
                  ) : null}
                </chakra.span>
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row)
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <Td {...cell.getCellProps()} isNumeric={cell.column.isNumeric}>
                  {cell.render("Cell")}
                </Td>
              ))}
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  )
}
export default withSnackbar(TaskView);