import React from 'react'
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import {
    Button,
  
    Avatar,
  } from "@mui/material";
  import AddCircleIcon from "@mui/icons-material/AddCircle";
  import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";


const headCells = [
    {
      id: "products",
      numeric: false,
      disablePadding: true,
      label: "Products",
    },
    {
      id: "last_modified",
      numeric: true,
      disablePadding: false,
      label: "Last Modified",
    },
    {
      id: "product_id",
      numeric: true,
      disablePadding: false,
      label: "Product ID",
    },
    {
      id: "price",
      numeric: true,
      disablePadding: false,
      label: "Price",
    },
    {
      id: "categories",
      numeric: true,
      disablePadding: false,
      label: "Categories",
    },
    {
      id: "action",
      numeric: true,
      disablePadding: false,
      label: "Action",
    },
  ];

function table() {
  return (
    <>
    <Box>
    <Paper
          sx={{
            p: 2,
            color: "primary",
            mb: 2,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>Products({""})</Box>
          <Button onClick={''}>
            Add Commodity <AddCircleIcon />
          </Button>
        </Paper>


        <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            // indeterminate={numSelected > 0 && numSelected < rowCount}
            // checked={rowCount > 0 && numSelected === rowCount}
            // onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            // sortDirection={orderBy === headCell.id ? order : false}
          >
            {/* <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            > */}
              {/* {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null} */}
            {/* </TableSortLabel> */}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>

        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table
            //   sx={{ minWidth: 750 }}
            //   aria-labelledby="tableTitle"
            //   size={dense ? "small" : "medium"}
            >
              {/* <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                rowCount={products.length}
              /> */}
              <TableBody>
                {/* {products.map(({ data, id }, index) => {
                  const isItemSelected = isSelected(data?.name);
                  const labelId = `enhanced-table-checkbox-${index}`; */}

                  {/* return ( */}
                    <TableRow
                      hover
                      // onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                    //   aria-checked={isItemSelected}
                    //   tabIndex={-1}
                    //   key={id}
                    //   selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                        //   color="primary"
                        //   checked={isItemSelected}
                        //   inputProps={{
                        //     "aria-labelledby": labelId,
                        //   }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        // id={labelId}
                        scope="row"
                        padding="none"
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Avatar
                            alt="product image"
                            // src={data?.imageurl}
                            sx={{ width: 34, height: 34 }}
                          />
                          {/* {data?.name} */}
                        </Box>
                      </TableCell>
                      <TableCell align="right">{""}</TableCell>
                      <TableCell align="right">{""}</TableCell>
                      <TableCell align="right">{""}</TableCell>
                      <TableCell align="right">{""}</TableCell>
                      <TableCell align="right">
                        <EditIcon
                          color="primary"
                        //   onClick={() => handleEditProduct(data, id)}
                        />{" "}
                        <DeleteForeverIcon
                          color="error"
                        //   onClick={() => handleDeleteProduct(id)}
                        />
                      </TableCell>
                    </TableRow>
                  {/* ); */}
                {/* })} */}
                {/* {emptyRows > 0 && ( */}
                  <TableRow
                    // style={{
                    //   height: (dense ? 33 : 53) * emptyRows,
                    // }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                {/* )} */}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
    </Box>
    </>
  )
}

export default table