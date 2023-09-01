import React from "react";
import { useParams } from "react-router-dom";
import { useFireStore } from "../../../hooks";
import { collections } from "../../../firebase/collections";
import { Button, Paper, Stack } from "@mui/material";
import { companiesWalletTableHeaders } from "../../../constants/metaData";
import WalletBalanceListing from "./WalletBalanceListing";
import { useState } from "react";
import AddBalance from "./AddBalance";
import { Loader } from "../../../components";
import { colors } from "../../../constants";

const WalletBalance = () => {
  // States
  const [isRechargeWalletOpen, setIsRechargeWalletOpen] = useState(false);

  // Hooks
  const { id } = useParams();
  const { data, isFetching } = useFireStore(
    `${collections.companies}/${id}/Employee`
  );
  if (isFetching) return <Loader />;

  const onAddBalance = (id) => {
    if (!id) return;
    setIsRechargeWalletOpen(id);
  };

  return (
    <Stack gap={2}>
      <Stack justifyContent={"end"}>
        <Button
          variant="contained"
          onClick={() => setIsRechargeWalletOpen(true)}
          alignSelf="flex-end"
          sx={{
            alignSelf: "flex-end",
            backgroundColor: colors.yellow,
            color: "#000",
          }}
        >
          Credit Company Wallet
        </Button>
        <AddBalance
          open={isRechargeWalletOpen}
          onClose={() => setIsRechargeWalletOpen(false)}
          data={data}
          companyId={id}
        />
      </Stack>

      <Paper>
        <WalletBalanceListing
          data={data && data?.length > 0 ? data : []}
          headingItems={companiesWalletTableHeaders}
          isLoading={isFetching}
          isCheckBox={false}
          onAddBalance={onAddBalance}
        />
      </Paper>
    </Stack>
  );
};

export default WalletBalance;
