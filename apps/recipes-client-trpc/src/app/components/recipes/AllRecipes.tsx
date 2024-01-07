import { useNavigate } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { allRecipesAtom } from '../../utils/atoms';

export default function AllRecipes() {
  const [allRecipes, setAllRecipes] = useAtom(allRecipesAtom);
  const navigate = useNavigate();

  const GET_ALL_RECIPES = gql`
    query MyQuery {
      allRecipes {
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
  `;
  const { data } = useQuery(GET_ALL_RECIPES);

  useEffect(() => {
    if (data) {
      console.log(data.allRecipes.nodes);
      setAllRecipes(data.allRecipes.nodes);
    }
  }, [data]);


  return (
    <div className="bg-white py-24 sm:py-32 flex">
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
          {allRecipes.length > 0 &&
            allRecipes?.map((recipe) => (
                <div onClick={()=>navigate(`/recipe/${recipe.recipeId}`)} className="flex min-h-screen items-center justify-center bg-gray-100">
                  <div className="mx-auto px-5">
                    <div className="max-w-xs cursor-pointer rounded-lg bg-white p-2 shadow duration-150 hover:scale-105 hover:shadow-md">
                      <img
                        className="w-full rounded-lg object-cover object-center"
                        src="https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="product"
                      />
                      <p className="my-4 pl-4 font-bold text-gray-500">
                        {recipe.title}
                      </p>
                      <p className="mb-4 ml-4 text-xl font-semibold text-gray-800">
                        {recipe.category}
                      </p>
                      <div className="relative mt-8 flex items-center gap-x-4">
                        <img
                          src={recipe.creatorImage}
                          alt=""
                          className="h-10 w-10 rounded-full bg-gray-50"
                        />
                        <div className="text-sm leading-6">
                          <p className="font-semibold text-gray-900">
                            {/* <a href={'/'}> */}
                            <span className="absolute inset-0" />
                            {recipe.creatorName}
                            {/* </a> */}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
