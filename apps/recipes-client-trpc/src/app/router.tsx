import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AllRecipes from './components/recipes/AllRecipes';
import RecipesById from './components/recipes/RecipeById';
// import Test from './components/test/Test';
import RecipesByCreator from './components/recipes/RecipesByCreator';
import PersonalRecipe from './components/PersonalArea/PersonalRecipe';
import ShowDetails from './components/PersonalArea/ShowDetails';
import PersonalArea from './components/PersonalArea/PersonalArea';
import GetUsers from './components/AdminArea/GetUsers';
import AdminArea from './components/AdminArea/AdminArea';
import AddRecipe from './components/recipes/AddREcipe';
import FavoriteRecipes from './components/PersonalArea/FavriteRecipes';
import EditRecipe from './components/PersonalArea/EditRecipe';
import FoodFestivals from './components/festivals/FoodFestivals';
import Graphs from './components/AdminArea/Graphs';
import Layout from './components/Layout';
import Redirect from './components/Redirect';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="*" element={<Home />} /> */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Redirect />} />
          <Route path="home" element={<Home />} />
          <Route path="recipes" element={<AllRecipes />} />
          <Route path="recipe/:id" element={<RecipesById />} />
          <Route path="recipes/creator/:id" element={<RecipesByCreator />} />
          <Route path="adminArea" element={<AdminArea />} />
          <Route path="personalArea/:id" element={<PersonalArea />} />
          <Route path="personalRecipe/:id" element={<PersonalRecipe />} />
          <Route path="editRecipe/:id" element={<EditRecipe />} />
          <Route path="favoriteRecipes/:id" element={<FavoriteRecipes />} />
          <Route path="showDetails/:id" element={<ShowDetails />} />
          <Route path="allUsers" element={<GetUsers />} />
          <Route path="graphs" element={<Graphs />} />
          <Route path="addRecipe" element={<AddRecipe />} />
          {/* <Route path="test" element={<Test />} /> */}
          <Route path="foodFestival" element={<FoodFestivals />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
