import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Recipes } from '../../interfaces/recipes';
import CardRecipe from '../recipes/CardRecipe';
import { lodingAtom, userAtom } from '../../utils/atoms';
import { useAtom, useSetAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { DELETE_RECIPE } from '../../mutations/deleteResipe';
import Skeleton from '../loading/Skeleton';
import Title from '../recipes/Title';
import { classNames } from '../../css/classes';
import { RECIPES_BY_CREATOR } from '../../mutations/recipeByCreator';

const PersonalRecipe = () => {
  const [personalRecipe, setPersonalRecipe] = useState<Recipes[]>([]);
  const [user] = useAtom(userAtom);
  const navigate = useNavigate();
  const setLodingGlobal = useSetAtom(lodingAtom);

  const { data, error, loading } = useQuery(RECIPES_BY_CREATOR, {
    variables: { email: user.email },
  });

  const [
    deleteResipe,
    { data: dataDelete, error: errorDelete, loading: loadingDelete },
  ] = useMutation(DELETE_RECIPE);

  useEffect(() => {
    if (data) {
      console.log(data);
      setPersonalRecipe(data.userByEmail.recipesByCreatorEmail.nodes);
    }
    if (error) console.log(error);
  }, [data, error]);

  useEffect(() => {
    if (dataDelete) {
      console.log('dataDelete', dataDelete);
      setPersonalRecipe(
        dataDelete.deleteRecipeByRecipeId.query.userByEmail
          .recipesByCreatorEmail.nodes
      );
    }
    if (errorDelete) console.log(errorDelete);
  }, [dataDelete, errorDelete]);

  console.log(personalRecipe);

  const handleDelete = async (id: string) => {
    deleteResipe({
      variables: {
        input: {
          clientMutationId: user.email,
          recipeId: id,
        },
        email: user.email,
      },
    });
  };

  useEffect(() => {
    setLodingGlobal(loading);
  }, [loading]);

  useEffect(() => {
    setLodingGlobal(loadingDelete);
  }, [loadingDelete]);

  return (
    <div className="bg-white py-24 sm:py-32 flex">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Title />
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
                  <div className="flex justify-around">
                    <button
                      className={classNames(
                        'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium'
                      )}
                      onClick={() => handleDelete(recipe.recipeId)}
                    >
                      מחק מתכון
                    </button>
                    <button
                      className={classNames(
                        'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium'
                      )}
                      onClick={() => navigate(`/editRecipe/${recipe.recipeId}`)}
                    >
                      ערוך מתכון
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalRecipe;
