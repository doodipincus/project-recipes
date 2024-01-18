import { Recipes } from "./recipes";

export type Prop = {
    props: {
      recipe: Partial<Recipes>;
      setRecipe: (recipes: Partial<Recipes>) => void;
    };
  };