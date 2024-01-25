import { useNavigate } from 'react-router-dom';
import { RecipeBack } from '../../interfaces/recipes';

const CardRecipe = ({ recipe }: { recipe: RecipeBack }) => {
  const navigate = useNavigate();
  return (
    // <div

    //   className="flex min-h-screen items-center justify-center bg-gray-100"
    // >
    <div
      className="mx-auto px-5"
      onClick={() => navigate(`/recipe/${recipe.recipe_id}`)}
    >
      <div className="max-w-xs cursor-pointer rounded-lg bg-white p-2 shadow duration-150 hover:scale-105 hover:shadow-md">
        <div className="w-72 h-full">
          {recipe.image ? (
            <img
              className="w-full rounded-lg object-cover object-center min-w-full"
              src={recipe.image}
              alt={recipe.image}
            />
          ) : (
            <div className="relative grid h-56 mx-4 mt-4 overflow-hidden text-gray-700 bg-gray-300 bg-clip-border rounded-xl place-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-12 h-12 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                ></path>
              </svg>
            </div>
          )}
        </div>
        <p className="my-4 pl-4 font-bold text-gray-500">{recipe.title}</p>
        <p className="mb-4 ml-4 text-xl font-semibold text-gray-800">
          {recipe.category}
        </p>
        <div className="relative mt-8 flex items-center gap-x-4">
          {/* <img src="kj" alt="" className="h-10 w-10 rounded-full bg-gray-50" /> */}
          <div className="flex flex-shrink-0 self-start cursor-pointer">
                            <div className="h-8 w-8 rounded-full bg-gray-500 flex items-center justify-center">
                              <p className="text-xl text-white">
                                {recipe.creator_name[0]}
                              </p>
                            </div>
                          </div>
          <div className="text-sm leading-6">
            <p className="font-semibold text-gray-900">
              <span className="absolute inset-0" />
              {recipe.creator_name}
            </p>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};
export default CardRecipe;
