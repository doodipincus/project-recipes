import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AllRecipes from './components/recipes/AllRecipes';
import RecipesById from './components/recipes/RecipesById';
import Test from './components/test/Test';
import RecipesByCreator from './components/recipes/RecipesByCreator';
import PersonalRecipe from './components/PersonalArea/PersonalRecipe';
import EditUser from './components/PersonalArea/EditUser';
import SignIn from './components/users/SignIn';
import Register from './components/users/Register';
import PersonalArea from './components/PersonalArea/PersonalArea';
import GetUsers from './components/AdminArea/GetUsers';
import AdminArea from './components/AdminArea/AdminArea';
import AddRecipe from './components/recipes/AddREcipe';
import FavoriteRecipes from './components/PersonalArea/FavriteRecipes';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/recipes" element={<AllRecipes />} />
        <Route path="/recipe/:id" element={<RecipesById />} />
        <Route path="/recipes/creator/:id" element={<RecipesByCreator />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/adminArea" element={<AdminArea />} />
        <Route path="/personalArea/:id" element={<PersonalArea />} />
        <Route path="/personalRecipe/:id" element={<PersonalRecipe />} />
        <Route path="/favoriteRecipes/:id" element={<FavoriteRecipes />} />
        <Route path="/editUser/:id" element={<EditUser />} />
        <Route path="/allUsers" element={<GetUsers />} />
        <Route path="/graphs" element={<Test />} />
        <Route path="/addRecipe" element={<AddRecipe />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
