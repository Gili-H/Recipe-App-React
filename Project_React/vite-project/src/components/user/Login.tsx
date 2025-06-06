import { useContext, useRef, useState, useEffect } from "react";
import { UserContext } from "./userReducer";
import {
  Box,
  Button,
  TextField,
  createTheme,
  ThemeProvider,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import LoginIcon from "@mui/icons-material/Login";

// Custom theme for black and orange
const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(255, 255, 255)", // Orange
    },
    secondary: {
      main: "rgba(50, 56, 58, 0.29)", // Black
    },
  },
});

// Styling for the form container
const StyledBox = styled(Box)({
  position: "absolute",
  top: "20px",
  left: "20px",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  backgroundColor: "#fff", // White background
  border: "2px solid rgba(50, 56, 58, 0.29)", // Black border
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
});

// Styling for the login button
const StyledIconButton = styled(IconButton)({
  position: "absolute",
  top: "10px",
  left: "10px",
  width: "50px", // Adjust width
  height: "50px", // Adjust height
  fontSize: "100px", // Adjust icon size (optional)
  "&:focus": {
    border: "0.1px solid rgba(50, 56, 58, 0.29)", // Thinner black border on focus
  },
});

const Login = () => {
  const { dispatch: userDispatch } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false); // Controls visibility of the form
  const [isLogin, setIsLogin] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoggedIn,setIsLoggedIn] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLDivElement>(null); // Reference to the login form container

  useEffect(() => {
    // Close the form when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogin = async () => {
    const url = isLogin
      ? "http://localhost:3000/api/user/login"
      : "http://localhost:3000/api/user/register";
    try {
      console.log(url)
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "access-control-allow-origin": "*",
        },
        body: JSON.stringify({
          email: emailRef.current?.value,
          password: passwordRef.current?.value,
        }),
      });

      if (response.status === 401) {
        alert("משתמש לא מוכר נסה להרשם");
      } else if (!response.ok) {
        throw new Error(`fetch error ${response.status}`);
      } else {
        if (isSignUp) {
          const {userId} = await response.json();
          userDispatch({
            type: "SIGNUP",
            data: {
              id: userId,
              email: emailRef.current?.value || "",
              password: emailRef.current?.value || "",
            },
          });
          setIsLoggedIn(true);
        } else if (isLogin) {
          const {user} = await response.json();
          userDispatch({
            type: "LOGIN",
            data: user,
          });
          setIsLoggedIn(true);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      emailRef.current!.value = "";
      passwordRef.current!.value = "";
      isLogin && setIsLogin(false);
      isSignUp && setIsSignUp(false);
      setIsOpen(false); // Close the form after submission
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {/* Login button with thin border on focus */}
      <StyledIconButton
        color="primary"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <LoginIcon />
      </StyledIconButton>

      {isOpen && (
        <StyledBox ref={formRef}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsLogin(true)}
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsSignUp(true)}
          >
            SignUp
          </Button>
          {(isLogin || isSignUp) && (
            <Box display="flex" flexDirection="column" gap="10px">
              <TextField
                label="Email"
                variant="outlined"
                inputRef={emailRef}
                color="primary"
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                inputRef={passwordRef}
                color="primary"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleLogin}
              >
                Send
              </Button>
            </Box>
          )}
        </StyledBox>
      )}
    </ThemeProvider>
  );
};

export default Login;
