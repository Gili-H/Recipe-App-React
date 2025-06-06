import { Box, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar";
import User from "../user/User";
import userReducer, { initialState, UserContext } from "../user/userReducer";
import { useReducer } from "react";
import background from "../../images/background.jpeg";


const Layout = () => {
    const [user, dispatchUser] = useReducer(userReducer, initialState);
    return (
      <UserContext.Provider value={{ state: user, dispatch: dispatchUser }}>
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Image at the Top */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              backgroundColor: "rgb(255, 209, 128)",
            }}
          >
            <img
              src={background} // Replace with your image path
              alt="Top Banner"
              style={{
                width: "100%",
                maxHeight: "200px", // Adjust the height as needed
                objectFit: "cover", // Ensures the image maintains its aspect ratio
              }}
            />
          </Box>
  
          {/* חלק עליון - כותרת */}
          <Box
            sx={{
              width: "100%",
              backgroundColor: "rgb(196, 107, 23)",
              color: "#fff",
              padding: 2,
            }}
          >
            <br />
            <br />
            <Typography variant="h4" align="center" sx={{fontFamily: "'Rubik', sans-serif",}}>
              "במטבח נולדות יצירות, בטעמים נרקמים זיכרונות"
            </Typography>
            <Typography
              variant="h6"
              align="center"
              sx={{
                color: "rgb(114, 103, 85)",
                fontFamily: "'Varela Round', sans-serif",
              }}
            >
              שף משה יחזקאל
            </Typography>
  
            <br />
            <br />
          </Box>
  
          {/* ה-NavBar */}
          <NavBar />
  
          {/* תצוגת המשתמש */}
          <User />
  
          {/* אזור שבו יוצג התוכן של כל Route */}
          <Box sx={{ paddingTop: 2, width: "100%" }}>
            <Outlet /> {/* זה יטעין את התוכן של כל Route */}
          </Box>
        </Box>
      </UserContext.Provider>
    );
  };
  

export default Layout;