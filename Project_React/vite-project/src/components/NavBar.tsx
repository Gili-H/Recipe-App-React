import React from "react";
import { Box } from "@mui/material";
// Import Link from react-router-dom
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <Box
    sx={{
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      position: "absolute",
      top: 0,
      right: 15,
      padding: 2,
      gap: 2, // Adjust the gap between items
      fontSize: 15
    }}
  >
    {/* Links to different pages */}
    <Box
  sx={{
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "absolute",
    top: 0,
    right: 15,
    padding: 2,
    gap: 2, // Space between the links
  }}
>
  <nav style={{ display: "flex", gap: "10px" }}> {/* Adjust spacing */}
      <Link
        to="/all-recipe"
        style={{
          textDecoration: "none",
          color: "rgb(255, 255, 255)",
          border: "2px solid orange",
          borderRadius: "5px",
          padding: "5px 10px",
          boxSizing: "border-box",
          display: "inline-block",
          textAlign: "center",
        }}
      >
        כל המתכונים
      </Link>
      <Link
        to="/add-recipe"
        style={{
          textDecoration: "none",
          color: "rgb(255, 255, 255)",
          border: "2px solid orange",
          borderRadius: "5px",
          padding: "5px 10px",
          boxSizing: "border-box",
          display: "inline-block",
          textAlign: "center",
        }}
      >
        הוסף מתכון
      </Link>
    </nav>

  </Box>
  </Box>
  );
};

export default NavBar;
