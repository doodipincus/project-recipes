import { useParams, useNavigate } from 'react-router-dom';
import {
  allRecipesAtom,
  userAtom,
  userIsLoggedInAtom,
} from '../../utils/atoms';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { RecipeBack, Recipes } from '../../interfaces/recipes';
import { formatDateTime } from '../../utils/date';
import Rating from '../rating/Rating';
import PersonalRating from '../rating/PersonalRating';
import { trpc } from '../../utils/trpc';
import { FavoriteBack } from '../../interfaces/favorites';
import MapRecipeById from './MapRecipeById';

export default function Example() {
  const [allRecipes] = useAtom(allRecipesAtom);
  const [recipe, setRecipe] = useState<RecipeBack | undefined>();
  const userIsLoggedIn = useAtomValue(userIsLoggedInAtom);
  const user = useAtomValue(userAtom);
  const [oldPersonalRating, setOldPersonalRating] = useState<FavoriteBack>();
  const navigate = useNavigate();
  const { id } = useParams();
  const [errorFromServer, setErrorFromServer] = useState('');

  const getPersonalRating = async () => {
    if (user.email && id) {
      try {
        const res = await trpc.favorites.getFavoritesByUserAndRecipe.query({
          email: user.email,
          recipe_id: id,
        });
        if (res && typeof res !== 'string') {
          setOldPersonalRating(res);
          console.log('res', res);
        } else if (res && typeof res === 'string') {
          setErrorFromServer(res);
          console.log('res', res);
        }
      } catch (error) {}
    }
  };

  useEffect(() => {
    if (id) {
      // console.log(allRecipes);
      const newRecipe = allRecipes.find((r) => r.recipe_id === id);
      // console.log(newRecipe);
      setRecipe(newRecipe);
    }
    getPersonalRating();
  }, []);

  // console.log(errorFromServer);

  return (
    <div className="bg-white">
      <div className="pt-6">
        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            <img
              src={recipe?.image}
              alt={recipe?.title}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {recipe?.title}
            </h1>
          </div>




          {/* Options */}
          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">
                  {recipe?.instructions}
                </p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">חומרים</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {recipe?.ingredients.map((ingredient) => (
                    <li key={ingredient} className="text-gray-400">
                      <span className="text-gray-600">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Reviews */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <Rating
                props={{
                  rating: recipe?.rating,
                  reviews: recipe?.num_reviews,
                  id: recipe?.recipe_id,
                }}
              />
              {id && userIsLoggedIn && (
                <PersonalRating
                  id={id}
                  rating={oldPersonalRating?.stars}
                  comment={oldPersonalRating?.comment}
                />
              )}
            </div>
            <div className="mt-10">
              <div className="relative mt-8 flex items-center gap-x-4">
                <button
                  onClick={() =>
                    navigate(`/recipes/creator/${recipe?.creator_email}`)
                  }
                  className="hover:scale-110 overflow-hidden flex items-center"
                >
                  <div className="flex flex-shrink-0 self-start cursor-pointer">
                    <div className="h-8 w-8 rounded-full bg-gray-500 flex items-center justify-center m-2">
                      <p className="text-xl text-white">
                        {recipe?.creator_name[0]}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900 text-base">
                      <span className="absolute inset-0" />
                      {recipe?.creator_name}
                    </p>
                  </div>
                </button>
                {recipe?.createdAt && (
                  <div className="flex items-center gap-x-4 text-lg">
                    <div className="text-gray-500">
                      {formatDateTime(recipe.createdAt)}
                    </div>
                    <p className="font-semibold text-">נוצר ב </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <MapRecipeById country={recipe?.country_of_origin}/>
        </div>
      </div>
    </div>
  );
}
