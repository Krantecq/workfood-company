import { Edit } from "@mui/icons-material";
import {
  TableBody,
  TableCell,
  TableRow,
  Checkbox,
  IconButton,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { MuiTable, TableLoader, NoDataFound } from "../../../../components";
import { formateFireStoreDate } from "../../../../utils/helper";

const OrdersListing = (props) => {
  const { data, isLoading, headingItems, selectedItems, onSelectItems } = props;

  const navigate = useNavigate();
  const { userId } = useParams();

  const isSelected = (id) => selectedItems.indexOf(id) !== -1;

  const onEditOrder = (orderId) => {
    if (!orderId) return;
    navigate(`/dashboard/users/${userId}/${orderId}`);
  };

  return (
    <MuiTable {...props}>
      <TableBody>
        {isLoading ? (
          <TableLoader colSpan={headingItems.length} />
        ) : data && data.length > 0 ? (
          data.map(
            (
              { userMobile, paymentId, id, orderTotal, order_Id, order_date },
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
                  <TableCell
                    component="th"
                    id={labelId}
                    scope="row"
                    padding="none"
                  >
                    {userMobile ? `+91${userMobile}` : ""}
                  </TableCell>
                  <TableCell>{paymentId}</TableCell>
                  <TableCell>
                    {order_date ? formateFireStoreDate(order_date) : ""}
                  </TableCell>
                  <TableCell>{order_Id}</TableCell>
                  <TableCell>{orderTotal}</TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <IconButton onClick={() => onEditOrder(order_Id)}>
                      <Edit />
                    </IconButton>
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
export default OrdersListing;
