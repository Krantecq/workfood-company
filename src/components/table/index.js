import { useState } from "react";
import { visuallyHidden } from "@mui/utils";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Checkbox,
  Box,
} from "@mui/material";

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headingItems,
    isCheckBox,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {isCheckBox && (
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts",
              }}
              disabled={!rowCount}
            />
          </TableCell>
        )}
        {headingItems.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const MuiTable = ({
  data,
  headingItems,
  children,
  selectedItems = [],
  onSelectItems = () => {},
  isCheckBox = true,
}) => {
  const handleSelectAllClick = (event) =>
    onSelectItems(event.target.checked, true, "");

  return (
    <TableContainer>
      <Table aria-labelledby="tableTitle" size={"medium"}>
        <EnhancedTableHead
          numSelected={selectedItems?.length}
          order={"asc"}
          orderBy={"calories"}
          onSelectAllClick={handleSelectAllClick}
          rowCount={data?.length || 0}
          headingItems={headingItems}
          isCheckBox={isCheckBox}
        />
        {children}
      </Table>
    </TableContainer>
  );
};

export default MuiTable;
