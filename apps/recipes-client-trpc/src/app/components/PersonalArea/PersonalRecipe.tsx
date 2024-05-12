import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { RecipeBack, Recipes } from '../../interfaces/recipes';
import CardRecipe from '../recipes/CardRecipe';
import { loadingAtom, userAtom } from '../../utils/atoms';
import { useAtom, useSetAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import Skeleton from '../loading/Skeleton';
import Title from '../recipes/Title';
import { classNames } from '../../css/classes';
import { trpc } from '../../utils/trpc';
import { toast } from 'react-toastify';
import AlertSecces from '../../utils/AlertSecces';

const PersonalRecipe = () => {
  const [personalRecipe, setPersonalRecipe] = useState<RecipeBack[]>([]);
  const [user] = useAtom(userAtom);
  const navigate = useNavigate();
  const [loading, setLoading] = useAtom(loadingAtom);
  const [errorFromServer, setErrorFromServer] = useState<string>('') 



  const notifyRemove = () => {
    toast.success('המתכון נמחק בהצלחה!', {
      theme: 'colored',
    });
  };

  const deleteRecipe = async (id: string) => {
    try {
      setLoading(true);
      const res = await trpc.recipes.deleteRecipe.mutate(id);
      if (res && typeof res !== 'string') {
        console.log(res);
        setLoading(false);
        notifyRemove();
      }
      if(res && typeof res === 'string') {
        setLoading(false);
        setErrorFromServer(res);
      }
      setLoading(false);

    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const getRecipesByCreator = async () => {
    try {
      if (user.email) {
        setLoading(true);
        const resipes = await trpc.recipes.getRecipesByCreator.query(
          user.email
        );
        if (resipes?.length && typeof resipes !== 'string') {
          console.log(resipes);
          setPersonalRecipe(resipes);
          setLoading(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRecipesByCreator();
  }, []);

  return (
    <div className="bg-white py-24 sm:py-32 flex">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="flex justify-center">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-lg font-bold tracking-tight text-gray-900 sm:text-3xl flex justify-center">
              מסיבת הטעמים
            </h2>
            <h4 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-xl flex justify-center">
              אתר המתכונים הגדול בישראל
            </h4>
            <p className="mt-2 text-4xl leading-8 text-gray-600 flex justify-center">
              {`המתכונים של ${user.userName}`}{' '}
            </p>
          </div>
        </div>   
        {loading ? (
          <div>
            <Skeleton />
          </div>
        ) : (
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {personalRecipe.length > 0 &&
              personalRecipe?.map((recipe) => (
                <div>
                  <CardRecipe recipe={recipe} />
                  <div className="flex justify-around mt-4">
                    <button
                      className={classNames(
                        'bg-gray-200 text-gray-500 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium'
                      )}
                      onClick={() => deleteRecipe(recipe.recipe_id)}
                    >
                      מחק מתכון
                    </button>
                    <button
                      className={classNames(
                        'bg-gray-200 text-gray-500 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium'
                      )}
                      onClick={() =>
                        navigate(`/editRecipe/${recipe.recipe_id}`)
                      }
                    >
                      ערוך מתכון
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
      <AlertSecces />
      {errorFromServer && <p>{errorFromServer}</p>}
    </div>
  );
};

export default PersonalRecipe;
