import React, { useContext, useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
} from "@mui/material";
import CartDialog from "./CartDialog";
import { Store } from "../Store";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, cart } = state;

  const isAdmin = userInfo && userInfo.role === "admin";

  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart]);

  const handleCartOpen = () => {
    setCartOpen(true);
  };

  const handleCartClose = () => {
    setCartOpen(false);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <>
      <AppBar position="static" variant="elevation">
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6" component="div">
              WebShop
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                color="inherit"
                onClick={() => {
                  navigate("/login");
                }}
              >
                All Products
              </Button>
              <Button
                color="inherit"
                onClick={() => {
                  navigate("/createProduct");
                }}
                sx={{ display: isAdmin ? "block" : "none", marginLeft: 2 }}
              >
                Create Product
              </Button>
            </Box>
            <Button color="inherit" onClick={handleCartOpen}>
              Cart
            </Button>
            {userInfo ? (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <>
                <Button color="inherit" onClick={handleLogin}>
                  Login
                </Button>
                <Button color="inherit" onClick={handleRegister}>
                  Register
                </Button>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <CartDialog
        open={cartOpen}
        handleClose={handleCartClose}
        cartItems={cartItems}
      />
    </>
  );
};

export default Navbar;
