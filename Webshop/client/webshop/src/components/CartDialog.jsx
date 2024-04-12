import React, { useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
} from "@mui/material";
import { Store } from "../Store";
import axios from "axios";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const CartDialog = ({ open, handleClose, cartItems }) => {
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  const handlePayNow = async (e) => {
    e.preventDefault();
    const userId = userInfo.userId;
    try {
      const { data } = await axios.put(
        `/api/users/${userId}/updateCart`,
        {
          payed: true,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      console.log(data);
      dispatch({ type: "CART_CLEAR" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Cart</DialogTitle>
      <DialogContent>
        <List>
          {cartItems.map((item) => (
            <ListItem key={item.id}>
              <ListItemText
                primary={item.title}
                secondary={`Qty: ${item.quantity}, Price: $${item.price.toFixed(
                  2
                )}`}
              />
            </ListItem>
          ))}
        </List>
        <Typography variant="h6" align="right" gutterBottom>
          Total: ${totalAmount.toFixed(2)}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handlePayNow}
        >
          Pay Now
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CartDialog;
