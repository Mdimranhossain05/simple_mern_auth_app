import { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box } from '@mui/material'; // Using Material UI for styling
import { styled } from '@mui/material/styles';


const StyledForm = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  maxWidth: '400px',
  margin: 'auto',
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  backgroundColor: theme.palette.background.paper,
}));

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };



  return (
    <Container maxWidth="sm">
      <StyledForm onSubmit={handleSubmit}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <TextField className="p-2" fullWidth required label="Username"
           value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <TextField className="p-2" label="Password"
          type="password"
          variant="outlined" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} fullWidth required />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
        <p onClick={() => navigate('/register')}
      style={{ cursor: 'pointer', color: 'black', textDecoration: 'underline' }}>Dont have an account? <span style={{color: "blue"}} >Register</span> </p>
      </StyledForm>
    </Container>
  );
}
