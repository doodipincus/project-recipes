import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { RecipeBack, Recipes } from '../../interfaces/recipes';
import CardRecipe from './CardRecipe';
import Skeleton from '../loading/Skeleton';
import Title from './Title';
import { useAtom } from 'jotai';
import { loadingAtom } from '../../utils/atoms';
import { trpc } from '../../utils/trpc';

export default function RecipesByCreator() {
  const [recipesByCreator, setRecipesByCreator] = useState<RecipeBack[]>([]);
  const { id } = useParams();
  const [loading, setLoading] = useAtom(loadingAtom);
  const [errorFromServer, setErrorFromServer] = useState<string>('');

  const getRecipesByCreator = async () => {
    try {
      if (id) {
        setLoading(true);
        const res = await trpc.recipes.getRecipesByCreator.query(id);
        if (res?.length && typeof res !== 'string') {
          console.log(res);
          setRecipesByCreator(res);
          setLoading(false);
        }
        if (res && typeof res === 'string') {
          setLoading(false);
          setErrorFromServer(res);
        }
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getRecipesByCreator();
  }, []);

  return (
    <div className="bg-white py-24 sm:py-32 flex">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* <Title /> */}
        {loading ? (
          <div>
            <Skeleton />
          </div>
        ) : (
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {recipesByCreator.length > 0 &&
              recipesByCreator?.map((recipe) => (
                <CardRecipe recipe={recipe} key={recipe.recipe_id} />
              ))}
          </div>
        )}
      </div>
      {errorFromServer && <p>{errorFromServer}</p>}
    </div>
  );
}
