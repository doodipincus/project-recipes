import { useEffect, useState } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { allRecipesAtom, loadingAtom } from '../../utils/atoms';
import { RecipesInput, Recipes, RecipeBack } from '../../interfaces/recipes';
import { useParams } from 'react-router-dom';
import FormRecipe from '../recipes/FormRecipe';
import { trpc } from '../../utils/trpc';
import { toast } from 'react-toastify';
import AlertSecces from '../../utils/AlertSecces';

const initialState: RecipesInput = {
  title: '',
  category: '',
  image: '',
  creator_name: '',
  creator_email: '',
  sensitivity: '',
  country_of_origin: '',
  difficulty: '',
  ingredients: ['lkjd', 'skjdhf'],
  instructions: '',
  preparation_time: '',
};

export default function EditRecipe() {
  const [recipeEdited, setRecipeEdited] = useState<RecipesInput>(initialState);
  const [allRecipes] = useAtom(allRecipesAtom);
  const setLoadingGlobal = useSetAtom(loadingAtom);
  const [errorFromServer, setErrorFromServer] = useState<string>('');

  const { id } = useParams();

  const notifyEdit = () => {
    toast.success('המתכון עודכן בהצלחה!', {
      theme: 'colored',
    });
  };
  console.log(id);

  const recipeById = allRecipes.find(
    (recipe: RecipeBack) => recipe.recipe_id === id
  );

  useEffect(() => {
    console.log(recipeById);
    setRecipeEdited(recipeById ?? initialState);
  }, [recipeById]);

  const editRecipe = async (newRecipeEdited: RecipesInput) => {
    if (id) {
      try {
        setLoadingGlobal(true);
        const res = await trpc.recipes.updateRecipe.mutate({
          id: id,
          update: newRecipeEdited,
        });
        if (res && typeof res !== 'string') {
          console.log(res);
          setLoadingGlobal(false);
          notifyEdit();
        }
        if (res && typeof res === 'string') {
          setLoadingGlobal(false);
          setErrorFromServer(res);
        }
      } catch (error) {
        console.error(error);
        setLoadingGlobal(false);
      }
    }
  };

  const send = () => {
    if (recipeEdited) {
      const newRecipeEdited: RecipesInput = {
        title: recipeEdited.title || '',
        ingredients: recipeEdited.ingredients || [],
        creator_email: recipeEdited.creator_email || '',
        creator_name: recipeEdited.creator_name || '',
        category: recipeEdited.category || '',
        image: recipeEdited.image || '',
        preparation_time: recipeEdited.preparation_time || '',
        country_of_origin: recipeEdited.country_of_origin || '',
        sensitivity: recipeEdited.sensitivity || '',
        difficulty: recipeEdited.difficulty || '',
        instructions: recipeEdited.instructions || '',
      };
      console.log(recipeEdited);
      editRecipe(newRecipeEdited);
    }
  };

  console.log(recipeEdited);

  const hasEmpty = Object.values(recipeEdited).includes('');
  console.log(hasEmpty);

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <FormRecipe
        props={{ recipe: recipeEdited, setRecipe: setRecipeEdited }}
      />
      <div className="cursor-pointer mx-auto mt-16 max-w-xl sm:mt-20">
        <button
          type="submit"
          onClick={send}
          disabled={hasEmpty}
          className={
            hasEmpty
              ? 'cursor-not-allowed block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              : 'cursor-pointerblock w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          }
        >
          עדכן מתכון
        </button>
      </div>
      <AlertSecces />
      {errorFromServer && <p>{errorFromServer}</p>}
    </div>
  );
}
