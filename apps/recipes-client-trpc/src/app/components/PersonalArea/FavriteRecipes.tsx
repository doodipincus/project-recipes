import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { RecipeBack, Recipes } from '../../interfaces/recipes';
import CardRecipe from '../recipes/CardRecipe';
import Skeleton from '../loading/Skeleton';
import Title from '../recipes/Title';
import { useAtom, useAtomValue } from 'jotai';
import { allRecipesAtom, loadingAtom, userAtom } from '../../utils/atoms';
import { trpc } from '../../utils/trpc';
import { FavoriteBack } from '../../interfaces/favorites';

const FavoriteRecipes = () => {
  const [favoritesRecipes, setFavoritesRecipes] = useState<FavoriteBack[]>([]);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [errorFromServer, setErrorFromServer] = useState<string>('');
  const user = useAtomValue(userAtom);
  const allRecipes = useAtomValue(allRecipesAtom);

  const getFavoriteRecipes = async () => {
    try {
      if (user.email) {
        setLoading(true);
        const res = await trpc.favorites.getFavoritesByUser.query(user.email);
        if (res?.length && typeof res !== 'string') {
          console.log(res);
          setFavoritesRecipes(res);
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
    getFavoriteRecipes();
  }, []);

  console.log(favoritesRecipes);

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
            {favoritesRecipes.length > 0 &&
              favoritesRecipes?.map((favoriteRecipe) => {
                const recipe = allRecipes.find(
                  (r) => r.recipe_id === favoriteRecipe.recipe_id
                );
                return recipe ? (
                  <CardRecipe
                    recipe={recipe}
                    key={favoriteRecipe.favorite_id}
                  />
                ) : (
                  <></>
                );
              })}
          </div>
        )}
      </div>
      {errorFromServer && <p>{errorFromServer}</p>}
    </div>
  );
};

export default FavoriteRecipes;
