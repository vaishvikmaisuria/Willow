import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, chakra } from "@chakra-ui/react"
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons"
import { useTable, useSortBy } from "react-table"
import { withSnackbar } from "notistack";

function TaskView({ fieldName, fieldValue }) {
  const data = React.useMemo(
    () => [
      {
        Stock: "APPL",
        QuantityValue: "100",
        PriceValue: "68",
        CurrentPrice: "130",
        DividendValue: "10",
      },
      {
        Stock: "BCE",
        QuantityValue: "100",
        PriceValue: "65",
        CurrentPrice: "55",
        DividendValue: "10",
      },
      {
        Stock: "ENB",
        QuantityValue: "100",
        PriceValue: "35",
        CurrentPrice: "45",
        DividendValue: "10",
      },
      {
        Stock: "TD",
        QuantityValue: "50",
        PriceValue: "55",
        CurrentPrice: "78",
        DividendValue: "10",
      },
    ],
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
        accessor: "PriceValue",
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