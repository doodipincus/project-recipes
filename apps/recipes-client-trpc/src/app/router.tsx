import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import  AllRecipes  from "./components/AllRecipes";
import  RecipesById  from "./components/RecipesById";

const Router = ()=>{
    return (
        <>
          <BrowserRouter>
              <Routes>
                  <Route path="*" element={<Home/>} />
                  <Route path="/recipes" element={<AllRecipes/>} />
                  <Route path="/recipe/:id" element={<RecipesById/>} />
              </Routes>
          </BrowserRouter>
        </>
      );
}
export default Router