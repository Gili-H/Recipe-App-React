import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import KitchenIcon from "@mui/icons-material/Kitchen"

interface Recipe {
  id: number;
  title: string;
  description: string;
  details: string;
}

const AllRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:3000/api/recipes");
        if (!response.ok) {
          throw new Error(`Error fetching recipes: ${response.status}`);
        }
        const data = await response.json();
        setRecipes(data);
      } catch (err) {
        setError("Error fetching recipes");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>{error}</Typography>;

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
      }}
    >
     

      {/* צד ימני להצגת רשימת המתכונים */}
      {/* Right side for displaying the recipe list */}
      <Box
  sx={{
    display: "flex", // Flexbox to split the screen
    height: "100vh", // Full-screen height
    width: "100vw", // Full-screen width to avoid extra white space
    overflow: "hidden", // Prevents scrolling caused by unnecessary content
  }}
>
  {/* Left side for displaying the selected recipe */}
  <Box
    sx={{
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 3,
      backgroundColor: "ffffff",
      overflowY: "auto", // Scroll for overflow
    }}
  >
    
    {selectedRecipe ? (
      <Card
        sx={{
          maxWidth: 400,
          width: "100%",
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "#ffffff",
          textAlign: "center",
        }}
      >
        <KitchenIcon
          sx={{
            fontSize: 60,
            color: "orange",
            marginBottom: 2,
          }}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {selectedRecipe.title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {selectedRecipe.details}
          </Typography>
        </CardContent>
      </Card>
    ) : (
      <Typography variant="h5" color="text.secondary">
        בחר מתכון להצגה
      </Typography>
    )}
  </Box>

  {/* Right side for displaying the recipe list */}
  
  <Box
    sx={{
      flex: 1,
      padding: 10,
      backgroundColor: "#e8e8e8",
      overflowY: "auto",
    }}
  >
      {/* Add a title */}
  <Typography
    variant="h4" 
    sx={{
      textAlign: "center",
      marginBottom: 4, 
      color: "rgb(175, 83, 8)", 
    }}
  >
    רשימת מתכונים
  </Typography>
    {recipes.map((recipe) => (
      <Card
        key={recipe.id}
        sx={{
          width: "100%",
          padding: 2,
          marginBottom: 2,
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#f5f5f5",
          },
          textAlign: "center",
          boxShadow: 1,
          borderRadius: 2,
        }}
        onClick={() => handleRecipeClick(recipe)}
      >
        <Typography variant="h6">{recipe.title}</Typography>
      </Card>
    ))}
  </Box>
</Box>

    </Box>
  );
};

export default AllRecipes;
