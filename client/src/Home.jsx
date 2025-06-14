import { useAuth } from "./auth/AuthContext";
import { Link } from "react-router-dom";
import { TextField, Button, Container, Typography, Box } from '@mui/material'; // Using Material UI for styling
import { styled } from '@mui/material/styles';

export default function Home() {
  const { user } = useAuth();
  return (
    <div className="flex flex-col items-center gap-5">
      <Typography variant="h5" align="center" gutterBottom>
          Welcome {user ? user.email : "Guest"}
        </Typography>
      {user ? (
        <Link to="/logout">Logout</Link>
      ) : (
        <div>
          <Link className="border border-gray-600 rounded py-3 p-5" to="/login">Login</Link> | <Link className="border border-gray-600 rounded py-3 p-5" to="/register">Register</Link>
        </div>
      )}
    </div>
  );
}
