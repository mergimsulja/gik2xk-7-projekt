import React, { useContext, useEffect, useState } from "react";
import {
  TextField,
  Button,
  Link,
  Paper,
  Typography,
  Container,
  Alert,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Store } from "../Store";
import axios from "axios";

const Register = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/register", {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
      // console.log(data);
    } catch (error) {
      // console.log(error);
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} style={{ padding: 20, marginTop: 50 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Register
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          size="small"
        />
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          size="small"
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          size="small"
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          size="small"
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleRegister}
          size="small"
          disabled={!firstName || !lastName || !email || !password}
        >
          Register
        </Button>
        {/* <Typography variant="body2" style={{ marginTop: 10 }}>
          Already have an account? <Link href="/login">Log In</Link>
        </Typography> */}
      </Paper>
    </Container>
  );
};

export default Register;
