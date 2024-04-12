import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const ProductListPage = () => {
  // Example state for products, replace with actual product data
  const [products, setProducts] = useState([]);

  // Example function to fetch product data from backend, replace with actual fetch call
  useEffect(() => {
    // Fetch product data here and set state
    const fetchedProducts = [
      { id: 1, title: "Product 1", price: 10.99 },
      { id: 2, title: "Product 2", price: 19.99 },
      { id: 3, title: "Product 3", price: 29.99 },
    ];
    setProducts(fetchedProducts);
  }, []);

  const handleEdit = (productId) => {
    // Handle edit action for product with productId
    console.log("Edit product with ID:", productId);
  };

  const handleDelete = (productId) => {
    // Handle delete action for product with productId
    console.log("Delete product with ID:", productId);
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "0 auto", padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Product List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} sx={{ cursor: "pointer" }}>
                <TableCell>{product.title}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(product.id)}
                    sx={{ marginRight: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductListPage;
