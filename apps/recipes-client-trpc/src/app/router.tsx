import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import  AllRecipes  from "./components/AllRecipes";
import  RecipesById  from "./components/RecipesById";
import Register from "./components/Register";

const Router = ()=>{
    return (
        <>
          <BrowserRouter>
              <Routes>
                  <Route path="*" element={<Home/>} />
                  <Route path="/recipes" element={<AllRecipes/>} />
                  <Route path="/recipe/:id" element={<RecipesById/>} />
                  <Route path="/register" element={<Register/>} />
              </Routes>
          </BrowserRouter>
        </>
      );
}
export default Router