import {
  TableBody,
  TableCell,
  TableRow,
  Checkbox,
  Button,
  Chip,
} from "@mui/material";
import { MuiTable, TableLoader, NoDataFound } from "../../../../components";
import { formateFireStoreDate } from "../../../../utils/helper";

export const ListingTable = (props) => {
  const {
    data,
    isLoading,
    headingItems,
    selectedItems = [],
    onSelectItems = () => {},
    isCheckBox = true,
    onChangeStatus = () => {},
  } = props;

  const isSelected = (id) => selectedItems.indexOf(id) !== -1;

  return (
    <MuiTable {...props}>
      <TableBody>
        {isLoading ? (
          <TableLoader colSpan={headingItems.length} />
        ) : data && data.length > 0 ? (
          data.map(
            (
              {
                phoneno,
                date,
                id,
                selectedCategory,
                selectedSubcategory,
                min,
                max,
                status,
                marketProductId,
              },
              index
            ) => {
              const isItemSelected = isSelected(id);
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                <TableRow
                  hover
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={id}
                  selected={isItemSelected}
                >
                  {isCheckBox && (
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                        onChange={({ target }) =>
                          onSelectItems(target.checked, false, id)
                        }
                      />
                    </TableCell>
                  )}
                  <TableCell
                    component="th"
                    id={labelId}
                    scope="row"
                    padding="none"
                  >
                    {phoneno ? `+91${phoneno}` : ""}
                  </TableCell>
                  <TableCell>{selectedCategory || ""}</TableCell>
                  <TableCell>{formateFireStoreDate(date)}</TableCell>
                  <TableCell>
                    {selectedSubcategory ? (
                      <Chip
                        label={selectedSubcategory.toUpperCase()}
                        color="primary"
                        size="small"
                        variant="outlined"
                      />
                    ) : (
                      ""
                    )}
                  </TableCell>
                  <TableCell>{`${min}-${max}`}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => onChangeStatus(marketProductId, status)}
                    >
                      {["p"].includes(status) ? "ACTIVE" : "PENDING"}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            }
          )
        ) : (
          <NoDataFound colSpan={headingItems.length} />
        )}
      </TableBody>
    </MuiTable>
  );
};
