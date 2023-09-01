import {
  TableBody,
  TableCell,
  TableRow,
  Checkbox,
  Button,
  Chip,
} from "@mui/material";
import { MuiTable, TableLoader, NoDataFound } from "../../components";
import { toastMessages, toastTypes } from "../../constants/keywords";
import { collections } from "../../firebase/collections";
import { updateDocument } from "../../firebase/services/updateServices";
import { useToaster } from "../../hooks";
import { formateFireStoreDate } from "../../utils/helper";
import { MEAL_TIME } from "../../constants/metaData";

export const ItemListing = (props) => {
  const {
    data,
    isLoading,
    headingItems,
    selectedItems = [],
    onSelectItems = () => {},
    isCheckBox = true,
  } = props;

  const { toaster } = useToaster();

  const isSelected = (id) => selectedItems.indexOf(id) !== -1;

  const onChangeStatus = async (id, currentStatus) => {
    try {
      const res = await updateDocument(
        { id, status: currentStatus === "A" ? "D" : "A" },
        collections.listing
      );
      if (!res.status) {
        return toaster(
          toastTypes.ERROR,
          res.error?.message || toastMessages.GENERAL_ERROR
        );
      }
      if (res.status) {
        toaster(
          toastTypes.SUCCESS,
          toastMessages.UPDATE_STATUS_LISTING_SUCCESS
        );
      }
    } catch (error) {
      toaster(toastTypes.ERROR, toastMessages.GENERAL_ERROR);
    }
  };

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <MuiTable {...props}>
      <TableBody>
        {isLoading ? (
          <TableLoader colSpan={headingItems.length} />
        ) : data && data.length > 0 ? (
          data.map(
            (
              {
                id,
                customerName,
                companyname,
                day,
                orderNo,
                orderTiming,
                status,
                totalQuantity,
                orderDate,
              },
              index
            ) => {
              const isItemSelected = isSelected(id);
              const labelId = `enhanced-table-checkbox-${index}`;
              const formattedDate = formatDate(orderDate);
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
                    {orderNo || " "}
                  </TableCell>
                  <TableCell>{companyname || ""}</TableCell>
                  <TableCell>
                    {formattedDate || ""}, {day || ""}
                  </TableCell>
                  <TableCell> {customerName ? customerName : ""}</TableCell>
                  <TableCell>
                    {orderTiming
                      ? MEAL_TIME?.find(({ value }) => value === orderTiming)
                          ?.label
                      : "" || " "}
                  </TableCell>
                  <TableCell>{status || " "}</TableCell>
                  <TableCell>₹ {totalQuantity || " "}</TableCell>
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
