import { useNavigate, useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Recipes } from '../interfaces/recipes';

export default function RecipesByCreator() {
const [recipesByCreator, setRecipesByCreator] = useState<Recipes[]>([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const RECIPES_BY_CREATOR = gql`
    query MyQuery {
      recipeByRecipeId(recipeId:${id}) {
        userByCreatorId {
          recipesByCreatorId {
            nodes {
                category
                countyOfOrigin
                createdAt
                creatorId
                creatorImage
                creatorName
                image
                title
                recipeId
                sensitivity
                rating
                preparationTime
                ingredients
                instructions
                difficulty
            }
          }
        }
      }
    }
  `;
  const { data, error } = useQuery(RECIPES_BY_CREATOR);

  useEffect(() => {
    if (data) {
      console.log(data.allRecipes.nodes);
      setRecipesByCreator(data.allRecipes.nodes);
    }
    if(error) console.log(error);
    
  }, [data, error]);
  console.log(recipesByCreator);

  const goToRecipe = (id: string) => {
    navigate(`/recipe/${id}`);
  };

  return (
    <div className="bg-white py-24 sm:py-32 flex">
      <div>סינון מוצרים וכו'</div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            שם האתר
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            בחר את המתכון האהוב עליך, באפשרותך לבצע סינון ולקבל רק את המתכונים
            המועדפים עליך
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {recipesByCreator.length > 0 &&
            recipesByCreator?.map((recipe) => (
              <article
                onClick={() => goToRecipe(recipe.recipeId.toString())}
                key={recipe.creatorId}
                className="flex max-w-xl flex-col items-start justify-between"
              >
                <div>
                  <img src={recipe.creatorImage} alt="תמונה של המתכון" />
                </div>

                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    {/* <a href={recipe.href}> */}
                    <span className="absolute inset-0" />
                    {recipe.title}
                    {/* </a> */}
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                    {recipe.category}
                  </p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <img
                    src={recipe.creatorImage}
                    alt=""
                    className="h-10 w-10 rounded-full bg-gray-50"
                  />
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      <a href={'/'}>
                        <span className="absolute inset-0" />
                        {recipe.creatorName}
                      </a>
                    </p>
                    {/* <p className="text-gray-600">{recipe.author.role}</p> */}
                  </div>
                  <div className="flex items-center gap-x-4 text-xs">
                    <time dateTime={recipe.createdAt} className="text-gray-500">
                      {recipe.createdAt}
                    </time>
                    <p className="font-semibold text-">נוצר ב </p>
                  </div>
                </div>
              </article>
            ))}
        </div>
      </div>
    </div>
  );
}
