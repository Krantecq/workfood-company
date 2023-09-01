import {
  TableBody,
  TableCell,
  TableRow,
  Checkbox,
  Stack,
  IconButton,
  Link,
} from "@mui/material";
import { MuiTable, TableLoader, NoDataFound } from "../../components";
import { NavLink } from "react-router-dom";
import { PATH_DASHBOARD } from "../../routes/paths";

export const CompaniesListing = (props) => {
  const {
    data,
    isLoading,
    headingItems,
    selectedItems = [],
    onSelectItems = () => {},
    onEdit = () => {},
    onDelete = () => {},
    isCheckBox = true,
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
                id,
                CompanyName,
                DomainName,
                Email,
                ContactPerson,
                CompanyAddress,
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
                  <TableCell>
                    <Link
                      component={NavLink}
                      to={PATH_DASHBOARD.companies.view(id)}
                    >
                      {CompanyName}
                    </Link>
                  </TableCell>
                  <TableCell>{DomainName}</TableCell>
                  <TableCell>{CompanyAddress}</TableCell>
                  <TableCell>{Email}</TableCell>
                  <TableCell>{ContactPerson}</TableCell>
                  <TableCell>
                    <Stack direction="row">
                      <IconButton onClick={() => onEdit(id)}>
                        <i class="bx bx-edit-alt"></i>
                      </IconButton>
                      <IconButton onClick={() => onDelete(id)}>
                        <i class="bx bx-trash"></i>
                      </IconButton>
                    </Stack>
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
