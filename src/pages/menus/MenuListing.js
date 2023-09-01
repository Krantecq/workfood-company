import { TableBody, TableCell, TableRow, Stack, Chip } from "@mui/material";
import { MuiTable, TableLoader, NoDataFound } from "../../components";
import { WEEK_DAYS } from "../../constants/keywords";

const CustomChip = ({ item, onView }) => (
  <Chip
    variant="outlined"
    key={item?.id}
    label={item?.itemName}
    color="success"
    onClick={() => onView(item.id)}
  />
);

export const MenuListing = (props) => {
  const { data, isLoading, headingItems, onView } = props;

  return (
    <MuiTable {...props}>
      <TableBody>
        {isLoading ? (
          <TableLoader colSpan={headingItems.length} />
        ) : data && data.length > 0 ? (
          data?.map(({ day, breakFast, lunch, dinner, liveCounter }) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={day}>
                <TableCell>{WEEK_DAYS[day]}</TableCell>
                <TableCell>
                  <Stack direction="row" gap={2} flexWrap={"wrap"}>
                    {breakFast && breakFast?.length > 0
                      ? breakFast.map((item) => (
                          <CustomChip
                            key={item?.id}
                            item={item}
                            onView={() => onView(item.id)}
                          />
                        ))
                      : ""}
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack direction="row" gap={2} flexWrap={"wrap"}>
                    {lunch && lunch?.length > 0
                      ? lunch.map((item) => (
                          <CustomChip
                            key={item?.id}
                            item={item}
                            onView={() => onView(item.id)}
                          />
                        ))
                      : ""}
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack direction="row" gap={2} flexWrap={"wrap"}>
                    {dinner && dinner?.length > 0
                      ? dinner.map((item) => (
                          <CustomChip
                            key={item?.id}
                            item={item}
                            onView={() => onView(item.id)}
                          />
                        ))
                      : ""}
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack direction="row" gap={2} flexWrap={"wrap"}>
                    {liveCounter && liveCounter?.length > 0
                      ? liveCounter.map((item) => (
                          <CustomChip
                            key={item?.id}
                            item={item}
                            onView={() => onView(item.id)}
                          />
                        ))
                      : ""}
                  </Stack>
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
