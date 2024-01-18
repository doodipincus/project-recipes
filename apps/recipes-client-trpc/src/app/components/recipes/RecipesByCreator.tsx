import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Recipes } from '../../interfaces/recipes';
import CardRecipe from './CardRecipe';
import Skeleton from '../loading/Skeleton';
import Loading from '../loading/Loading';
import Title from './Title';
import { useSetAtom } from 'jotai';
import { lodingAtom } from '../../utils/atoms';

export default function RecipesByCreator() {
  const [recipesByCreator, setRecipesByCreator] = useState<Recipes[]>([]);
  const { id } = useParams();
  const setLodingGlobal = useSetAtom(lodingAtom);
  
  const RECIPES_BY_CREATOR = gql`
    query MyQuery($id: UUID!) {
      recipeByRecipeId(recipeId: $id) {
        userByCreatorEmail {
          recipesByCreatorEmail {
            nodes {
              title
              category
              countyOfOrigin
              createdAt
              creatorEmail
              creatorImage
              creatorName
              difficulty
              image
              instructions
              ingredients
              numReviews
              preparationTime
              rating
              recipeId
              sensitivity
            }
          }
        }
      }
    }
  `;
  const { data, error, loading } = useQuery(RECIPES_BY_CREATOR, {
    variables: { id: id },
  });

  useEffect(() => {
    if (data) {
      console.log(data);
      console.log(
        data.recipeByRecipeId.userByCreatorEmail.recipesByCreatorEmail.nodes
      );
      setRecipesByCreator(
        data.recipeByRecipeId.userByCreatorEmail.recipesByCreatorEmail.nodes
      );
    }
    if (error) console.log(error.message);
  }, [data, error]);
  console.log(recipesByCreator);


  useEffect(() => {
setLodingGlobal(loading)
  }, [loading]);
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
            {recipesByCreator.length > 0 &&
              recipesByCreator?.map((recipe) => (
                <CardRecipe recipe={recipe} key={recipe.recipeId} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
