import { useContext, useRef, useState } from "react";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { UserContext } from "../user/userReducer";

const AddRecipe = () => {
  const { state: user } = useContext(UserContext);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const detailsRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleAddRecipe = async () => {
    setError(null);
    setSuccess(null);
    if (!user.id) {
      setError("עליך להתחבר כדי להוסיף מתכון.");
      console.log("Current User:", user);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/recipes/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "access-control-allow-origin": "*",
        },
        body: JSON.stringify({
          id: user.id,
          title: titleRef.current?.value,
          description: descriptionRef.current?.value,
          details: detailsRef.current?.value,
          authorId: user.id,
        }),
      });

      if (!response.ok) {
        throw new Error("הוספת המתכון נכשלה.");
      }

      setSuccess("המתכון נוסף בהצלחה!");
      titleRef.current!.value = "";
      descriptionRef.current!.value = "";
      detailsRef.current!.value = "";
    } catch (err) {
      console.error(err);
      setError("שגיאה בהוספת המתכון.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full height of the viewport
        width: "100vw", // Full width of the viewport
        backgroundColor: "#f0f0f0",
        padding: 2,
        boxSizing: "border-box", // Ensures padding doesn't affect the size
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          padding: 4,
          maxWidth: 600, // Maximum width for the form
          width: "100%", // Full width for smaller screens
          backgroundColor: "#f4f4f4", // Light gray card background
          borderRadius: 3,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)", // Shadow for depth
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          gutterBottom
          sx={{ color: "#ff9800" }} // Orange title text
        >
          הוסף מתכון חדש
        </Typography>

        {/* Error Alert */}
        {error && <Alert severity="error">{error}</Alert>}

        {/* Success Alert */}
        {success && <Alert severity="success">{success}</Alert>}

        {/* Recipe Title Input */}
        <TextField
          inputRef={titleRef}
          label="שם המתכון"
          variant="outlined"
          fullWidth
          margin="normal"
          sx={{
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            "&:hover": { borderColor: "#ff9800" },
          }}
        />

        {/* Recipe Description Input */}
        <TextField
          inputRef={descriptionRef}
          label="תיאור המתכון"
          variant="outlined"
          fullWidth
          margin="normal"
          sx={{
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            
            "&:hover": { borderColor: "#ff9800" },
          }}
        />

        {/* Additional Details Input */}
        <TextField
          inputRef={detailsRef}
          label="פרטים נוספים"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          sx={{
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            "&:hover": { borderColor: "#ff9800" },
          }}
        />

        {/* Submit Button */}
        <Button
          variant="contained"
          onClick={handleAddRecipe}
          sx={{
            backgroundColor: "#ff9800",
            color: "#fff",
            padding: "10px 20px",
            fontSize: "16px",
            "&:hover": { backgroundColor: "#e68900" },
          }}
        >
          הוסף מתכון
        </Button>
      </Box>
    </Box>
  );
};

export default AddRecipe;
