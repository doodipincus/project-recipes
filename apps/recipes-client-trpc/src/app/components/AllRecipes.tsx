import { trpc } from '../utils/trpc';

export default function AllRecipes() {
  const recipes = trpc.recipeList.useQuery();

  return (
    <>
      {recipes.data?.map((recipe: any) => (
        <div>{recipe.title}</div>
      ))
      }
    </>
  )
}