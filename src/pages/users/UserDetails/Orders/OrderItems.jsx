import React from "react";
import {
  Avatar,
  Stack,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const OrderItems = ({ rows = [] }) => {
  const TAX_RATE = 0.0;

  function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }

  function subtotal(items) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
  }

  const invoiceSubtotal = subtotal(rows);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  return (
    <TableContainer component={Paper} style={{ marginTop: "47px" }}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="left" colSpan={3}>
              Orders(#145324)
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Sku</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Unit Price</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows && rows.length > 0
            ? rows.map((row) => (
                <TableRow key={row.name}>
                  <Stack direction="row" spacing={2}>
                    <Avatar
                      style={{ margin: "5px -16px 0px 4px" }}
                      alt="image"
                      src={row?.images[0]?.url}
                    />
                    <TableCell>{row.name}</TableCell>
                  </Stack>
                  <TableCell align="right">{row.sku}</TableCell>
                  <TableCell align="right">{row.totalQuantity}</TableCell>
                  <TableCell align="right">
                    {ccyFormat(+row?.selectedVariation?.price)}
                  </TableCell>
                  <TableCell align="right">
                    {ccyFormat(+row.totalQuantity)}
                  </TableCell>
                </TableRow>
              ))
            : ""}

          <TableRow>
            <TableCell rowSpan={4} />
            <TableCell colSpan={2}>Grand Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderItems;
