import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, chakra } from "@chakra-ui/react"
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons"
import { useTable, useSortBy } from "react-table"
import { withSnackbar } from "notistack";

function TaskView({ fieldName, fieldValue }) {
  const data = React.useMemo(
    () => [
      {
        Image: "PS5",
        SiteName: "amazon",
        ProductURL: "https://www.amazon.ca/PlayStation-5-Console/dp/B08GSC5D9G/ref=sr_1_2?dchild=1&keywords=ps5&qid=1619988349&sr=8-2",
        status: "Working",
        action: "  tid",
      },
      {
        Image: "PS5",
        SiteName: "bestbuy",
        ProductURL: "https://www.bestbuy.ca/en-ca/product/playstation-5-digital-edition-console-online-only/14962184",
        status: "Working",
        action: "  tid",
      },
      {
        Image: "ASUS ROG Strix NVIDIA GeForce RTX 3080 10GB GDDR6X Video Card",
        SiteName: "bestbuy",
        ProductURL: "https://www.bestbuy.ca/en-ca/product/asus-rog-strix-nvidia-geforce-rtx-3080-10gb-gddr6x-video-card/14954116",
        status: "Working",
        action: "  tid",
      },
      {
        Image: "Nintendo Switch",
        SiteName: "walmart",
        ProductURL: "https://www.walmart.ca/en/ip/nintendo-switch-with-neon-blue-and-neon-red-joycon-nintendo-switch/6000200280557",
        status: "Working",
        action: "  tid",
      },
    ],
    [],
  )

  const columns = React.useMemo(
    () => [
      {
        Header: "Product Name",
        accessor: "Image",
      },
      {
        Header: "Site",
        accessor: "SiteName",
      },
      {
        Header: "Product",
        accessor: "ProductURL",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Action",
        accessor: "action",
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