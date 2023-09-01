import { Edit } from "@mui/icons-material";
import {
  TableBody,
  TableCell,
  TableRow,
  Checkbox,
  IconButton,
} from "@mui/material";
import { MuiTable, TableLoader, NoDataFound } from "../../../../components";

const StorageRequestListing = (props) => {
  const { data, isLoading, headingItems, selectedItems, onSelectItems } = props;

  const isSelected = (id) => selectedItems.indexOf(id) !== -1;

  return (
    <MuiTable {...props}>
      <TableBody>
        {isLoading ? (
          <TableLoader colSpan={headingItems.length} />
        ) : data && data.length > 0 ? (
          data.map(({ date, dateTo, id, remarks }, index) => {
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
                  {date}
                </TableCell>
                <TableCell>{dateTo}</TableCell>
                <TableCell>{dateTo}</TableCell>
                <TableCell>{dateTo}</TableCell>
                <TableCell>{remarks}</TableCell>
                <TableCell>{remarks}</TableCell>
                <TableCell>
                  <IconButton>
                    <Edit />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })
        ) : (
          <NoDataFound colSpan={headingItems.length} />
        )}
      </TableBody>
    </MuiTable>
  );
};
export default StorageRequestListing;
