import { DeleteRounded, Edit } from "@mui/icons-material";
import {
  Chip,
  IconButton,
  Stack,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import React from "react";
import { NoDataFound, TableLoader } from "../../components";
import MuiTable from "../../components/table";
import { productCategoriesHeadings } from "../../constants/metaData";

const ProductCategories = ({ data, isFetching, onEdit, onDelete }) => {
  return (
    <MuiTable
      data={data}
      headingItems={productCategoriesHeadings}
      isCheckBox={false}
    >
      <TableBody>
        {isFetching ? (
          <TableLoader colSpan={productCategoriesHeadings.length} />
        ) : data && data.length > 0 ? (
          data.map(({ categoryName, subCategories, id }, index) => {
            const labelId = `enhanced-table-checkbox-${index}`;
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={id}>
                <TableCell
                  component="th"
                  id={labelId}
                  scope="row"
                  padding="none"
                  style={{ paddingLeft: "16px" }}
                >
                  {categoryName}
                </TableCell>
                <TableCell>
                  <Stack direction="row" gap={1}>
                    {subCategories && subCategories.length > 0
                      ? subCategories.map(({ id, name }) => (
                          <Chip
                            label={name}
                            key={id}
                            color="success"
                            variant="outlined"
                          />
                        ))
                      : ""}
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack direction="row" gap={1}>
                    <IconButton onClick={() => onEdit(id)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => onDelete(id)}>
                      <DeleteRounded />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            );
          })
        ) : (
          <NoDataFound colSpan={productCategoriesHeadings.length} />
        )}
      </TableBody>
    </MuiTable>
  );
};

export default ProductCategories;
