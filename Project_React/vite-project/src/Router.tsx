import { createBrowserRouter } from "react-router";
import Layout from "./components/recipes/Layout";
import AddRecipe from "./components/recipes/AddRecipe";
import AllRecipes from "./components/recipes/AllRecipes";
import { Login } from "@mui/icons-material";
import UpdateUser from "./components/user/UpdateUser";

const router = createBrowserRouter([
  {
    path: "/", // דף הבית
    element: <Layout />, // Layout כולל את ה-NavBar ומרכז את התוכן
    children: [
      { path: "", element: <AllRecipes /> }, // הצגת המתכונים בדף הבית
      { path: "all-recipe", element: <AllRecipes /> }, // הצגת המתכונים
      { path: "add-recipe", element: <AddRecipe /> }, // הוספת מתכון
      { path: "login", element: <Login /> }, // דף כניסה
      { path: "updateUser", element: <UpdateUser /> }, // דף עדכון משתמש
    ],
  },
]);

export default router;



