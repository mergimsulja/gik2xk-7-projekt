import React, { useContext, useEffect, useReducer, useState } from "react";
import {
  Typography,
  Button,
  Box,
  Rating,
  TextField,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
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

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);

  const { slug } = params;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: "",
  });

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, cart } = state;

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        let headers = {};
        if (userInfo && userInfo.token) {
          headers = { Authorization: `Bearer ${userInfo.token}` };
        }
        const result = await axios.get(`/api/products/${slug}`, {
          headers,
        });
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        console.log(result.data);
      } catch (error) {
        console.log(error.message);
        dispatch({ type: "FETCH_FAIL", payload: error.message });
      }
    };
    fetchData();
  }, [slug]);

  const [count, setCount] = useState(0);

  const handleAddToCart = async (e) => {
    const existItem = cart.cartItems.find((prod) => prod.id === product.id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.post(
      "/api/cart/addProduct",
      {
        productId: product.id,
        amount: quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    if (data.countInStock < quantity) {
      window.alert("sorry, product is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity },
    });
    // navigate("/");
  };

  const handleRatingChange = async (event, newValue) => {
    const newRating = newValue !== null ? newValue : 0;
    setRating(newRating);
    const { data } = await axios.post(
      `/api/products/${product.id}/addRating`,
      {
        ratingValue: newRating,
      },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    console.log(data);
  };

  const handleCountChange = (event) => {
    const newCount = parseInt(event.target.value);
    setCount(newCount);
  };

  useEffect(() => {
    setRating(product?.averageRating || 0);
  }, [product]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 2,
        mt: 3,
      }}
    >
      {loading && <CircularProgress />}
      {error && (
        <Alert severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      )}

      {product && (
        <>
          <img
            src={`/${product?.imageUrl?.replace(/\\/g, "/")}`}
            alt={product?.title}
            style={{ width: 200, height: 200, marginBottom: 10 }}
          />
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            textAlign="center"
          >
            {product?.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            {product?.description}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1 }}
            textAlign="center"
          >
            Last Updated: {product?.lastUpdated}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1 }}
            textAlign="center"
          >
            Price: ${product?.price}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <Rating
              name={`product-rating-${product?.title}`}
              value={rating}
              precision={0.5}
              onChange={handleRatingChange}
            />
          </Box>
          {/* <TextField
            type="number"
            label="Quantity"
            value={count}
            onChange={handleCountChange}
            inputProps={{ min: 0 }}
            sx={{ mt: 2, width: 100, textAlign: "center" }}
            size="small"
          /> */}
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </>
      )}
    </Box>
  );
};

export default ProductDetails;
