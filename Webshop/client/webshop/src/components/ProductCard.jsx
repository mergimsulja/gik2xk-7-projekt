import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Rating,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProductCard = ({
  id,
  image,
  title,
  price,
  description,
  initialRating,
}) => {
  const navigate = useNavigate();
  const handleAddToCart = () => {
    console.log("Add to cart clicked");
  };

  return (
    <Card
      sx={{ maxWidth: 345, marginBottom: 2 }}
      onClick={() => {
        navigate(`/products/${id}`);
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={`/${image?.replace(/\\/g, "/")}`}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Typography variant="body1" color="text.primary">
            ${price}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <Rating
              name={`product-rating-${title}`}
              value={initialRating}
              precision={0.5}
              readOnly
            />
            <Box sx={{ flexGrow: 1 }} />
          </Box>
          <Button
            component="span"
            variant="outlined"
            color="primary"
            sx={{ mt: 3 }}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
