import { gql, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { allRecipesAtom, lodingAtom } from '../../utils/atoms';
import CardRecipe from './CardRecipe';
import Skeleton from '../loading/Skeleton';
import Loading from '../loading/Loading';
import { useNavigate } from 'react-router-dom';
import Title from './Title';

export default function AllRecipes() {
  const [allRecipes, setAllRecipes] = useAtom(allRecipesAtom);
const setLodingGlobal = useSetAtom(lodingAtom)

  const GET_ALL_RECIPES = gql`
    query MyQuery {
      allRecipes {
        nodes {
          category
          countyOfOrigin
          createdAt
          creatorEmail
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
  `;
  const { data, loading } = useQuery(GET_ALL_RECIPES);

  useEffect(() => {
    if (data) {
      console.log(data.allRecipes.nodes);
      setAllRecipes(data.allRecipes.nodes);
    }
  }, [data]);

  useEffect(()=>{
    setLodingGlobal(loading)
  },[loading])

  return (
    <div className="bg-white py-24 sm:py-32 flex">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Title />
        {loading ? (
          <div>
            <Skeleton />
            {/* <Loading /> */}
          </div>
        ) : (
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {allRecipes.length > 0 &&
              allRecipes?.map((recipe) => <CardRecipe recipe={recipe} />)}
          </div>
        )}
      </div>
    </div>
  );
}
