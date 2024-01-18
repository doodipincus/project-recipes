import { useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useAtom, useSetAtom } from 'jotai';
import { allRecipesAtom, lodingAtom, userAtom } from '../../utils/atoms';
import { Recipes } from '../../interfaces/recipes';
import { useParams } from 'react-router-dom';
import FormRecipe from '../recipes/FormRecipe';

export default function EditRecipe() {

  const [recipeEdited, setRecipeEdited] = useState<Partial<Recipes>>({});
  const [allRecipes] = useAtom(allRecipesAtom);
  const { id } = useParams();
  const setLodingGlobal = useSetAtom(lodingAtom);

  console.log(id);

  const x = allRecipes.find((recipe: Recipes) => recipe.recipeId === id);

  useEffect(() => {
    console.log(x);

    setRecipeEdited(x ?? {});
  }, [x]);

  const EDIT_RECIPE = gql`
    mutation MyMutation($input: UpdateRecipeByRecipeIdInput!) {
      updateRecipeByRecipeId(input: $input) {
        clientMutationId
      }
    }
  `;

  const [editRecipe, { error, data, loading }] = useMutation(EDIT_RECIPE);

  const send = () => {
    const allValuesDefined = Object.values(recipeEdited).every(
      (value) => value !== undefined
    );
    if (recipeEdited && allValuesDefined) {
      const newRecipeEdited: Recipes = {
        recipeId: recipeEdited.recipeId || '',
        title: recipeEdited.title || '',
        ingredients: recipeEdited.ingredients || [],
        creatorEmail: recipeEdited.creatorEmail || '',
        creatorName: recipeEdited.creatorName || '',
        category: recipeEdited.category || '',
        image: recipeEdited.image || '',
        preparationTime: recipeEdited.preparationTime || '',
        countyOfOrigin: recipeEdited.countyOfOrigin || '',
        creatorImage: recipeEdited.creatorImage || '',
        sensitivity: recipeEdited.sensitivity || '',
        difficulty: recipeEdited.difficulty || '',
        instructions: recipeEdited.instructions || '',
        createdAt: recipeEdited.createdAt || '',
        rating: recipeEdited.rating || 0,
      };

      console.log(recipeEdited);

      editRecipe({
        variables: { input: { recipePatch: newRecipeEdited, recipeId: id } },
      });
    }
  };

  console.log(recipeEdited);

  useEffect(() => {
    if (data) console.log('data', data);
    if (error) console.log('error', error);
  }, [data, error]);

  useEffect(() => {
   setLodingGlobal(loading)
  }, [loading]);

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <FormRecipe
        props={{ recipe: recipeEdited, setRecipe: setRecipeEdited }}
      />
      <div className="cursor-pointer mx-auto mt-16 max-w-xl sm:mt-20">
        <div
          className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={send}
        >
          שלח מתכון
        </div>
      </div>
    </div>
  ) 
}
