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

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", address: "", phone: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (

    <Container maxWidth="sm">
      <StyledForm onSubmit={handleSubmit}>
        <Typography variant="h5" align="center" gutterBottom>
          Registration
        </Typography>
        <TextField label="Name" className="p-2" fullWidth required variant="outlined" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <TextField label="Email" className="p-2" fullWidth required variant="outlined" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <TextField label="Password" className="p-2" fullWidth required variant="outlined" placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <TextField label="Address" className="p-2" fullWidth required variant="outlined" placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        <TextField label="Phone" className="p-2" fullWidth required variant="outlined" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
        <p onClick={() => navigate('/login')}
          style={{ cursor: 'pointer', color: 'black', textDecoration: 'underline' }}>Already have an account? <span style={{ color: "blue" }} >Login</span> </p>

      </StyledForm>
    </Container>
  );
}
