import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";

const ViewReviews = ({ open, onClose, order = "" }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll={"paper"}
    >
      <DialogTitle sx={{ textAlign: "center" }}>
        Disliked User's Comment
      </DialogTitle>
      <Divider sx={{ backgroundColor: "black" }} />
      <DialogContent>
        <List>
          {order?.reviews && order?.reviews?.length > 0 ? (
            order?.reviews?.map((item, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemIcon>
                    <Typography color="black">{`${index + 1}.`}</Typography>
                  </ListItemIcon>
                  <ListItemText primary={`${item}`} />
                </ListItem>
                {order?.reviews?.length - 1 !== index ? <Divider /> : ""}
              </React.Fragment>
            ))
          ) : (
            <ListItem>
              <ListItemText primary={"No Reviews Found"} />
            </ListItem>
          )}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default ViewReviews;
