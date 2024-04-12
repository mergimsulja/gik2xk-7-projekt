import React, { useContext, useEffect, useReducer } from "react";
import { Grid, Container, CircularProgress, Alert } from "@mui/material";
import ProductCard from "./ProductCard";
import axios from "axios";
import { Store } from "../Store";
import { useNavigate } from "react-router-dom";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const ProductList = () => {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: "",
  });

  const navigate = useNavigate();

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        let headers = {};
        if (userInfo && userInfo.token) {
          headers = { Authorization: `Bearer ${userInfo.token}` };
        }
        const result = await axios.get("/api/products", { headers });
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        console.log(result.data);
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: error.message });
        // navigate to login if 401
        console.log("Error: ", error.response)
        if (error.response && error.response.status === 401) {
          navigate("/login");
        }
      }
    };
    fetchData();
  }, [userInfo]);

  return (
    <Container
      maxWidth="lg"
      sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}
    >
      {loading && <CircularProgress />}
      {error && (
        <Alert severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      )}
      <Grid container spacing={2} justifyContent="center">
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard
              id={product.id}
              image={product.imageUrl}
              title={product.title}
              description={product.description}
              initialRating={product.averageRating}
              price={product.price}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;
