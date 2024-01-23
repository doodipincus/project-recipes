import { Recipes, RecipesInput } from "./recipes";

export type Props = {
    props: {
      recipe: Recipes;
      setRecipe: (recipes: Recipes) => void;
    };
  };

  export type PropsInput = {
    props: {
      recipe: RecipesInput;
      setRecipe: (recipes: RecipesInput) => void;
    };
  };