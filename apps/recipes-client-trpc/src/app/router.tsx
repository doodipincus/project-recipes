import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AllRecipes from './components/recipes/AllRecipes';
import RecipesById from './components/recipes/RecipeById';
import RecipesByCreator from './components/recipes/RecipesByCreator';
import PersonalRecipe from './components/PersonalArea/PersonalRecipe';
import ShowDetails from './components/PersonalArea/ShowDetails';
import GetUsers from './components/AdminArea/GetUsers';
import AddRecipe from './components/recipes/AddRecipe';
import FavoriteRecipes from './components/PersonalArea/FavriteRecipes';
import EditRecipe from './components/PersonalArea/EditRecipe';
import FoodFestivals from './components/festivals/FoodFestivals';
import Graphs from './components/charts/Graphs';
import Layout from './components/Layout';
import Redirect from './components/Redirect';
import GetReviews from './components/AdminArea/GetReviews';
import PersonalReviews from './components/PersonalArea/PersonalReveiws';
import PageNotFound from './components/PageNotFound';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="*" element={<PageNotFound />} />
          <Route index element={<Redirect />} />
          <Route path="home" element={<Home />} />
          <Route path="recipes" element={<AllRecipes />} />
          <Route path="recipe/:id" element={<RecipesById />} />
          <Route path="recipes/creator/:id" element={<RecipesByCreator />} />
          <Route path="personalRecipe/:id" element={<PersonalRecipe />} />
          <Route path="editRecipe/:id" element={<EditRecipe />} />
          <Route path="favoriteRecipes/:id" element={<FavoriteRecipes />} />
          <Route path="personalReviews" element={<PersonalReviews />} />
          <Route path="showDetails/:id" element={<ShowDetails />} />
          <Route path="allUsers" element={<GetUsers />} />
          <Route path="allReviews" element={<GetReviews />} />
          <Route path="graphs" element={<Graphs />} />
          <Route path="addRecipe" element={<AddRecipe />} />
          <Route path="foodFestival" element={<FoodFestivals />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
