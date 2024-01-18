import { useParams, useNavigate } from 'react-router-dom';
import { allRecipesAtom } from '../../utils/atoms';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Recipes } from '../../interfaces/recipes';
import { formatDateTime } from '../../utils/date';
// import Map from '../maps/borderMapBing';

// export default function RecipesById() {
//   const { id } = useParams();
//   const [allRecipes] = useAtom(allRecipesAtom);
//   const [recipe, setRecipe] = useState<Recipes | undefined>();
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (id) {
//       console.log(allRecipes);

//       const newRecipe = allRecipes.find((r) => r.recipeId === id);
//       console.log(newRecipe);
//       setRecipe(newRecipe);
//     }
//   }, []);

//   return recipe ? (
//     <div className="flex">
//       {/* <Map country={recipe.countyOfOrigin} /> */}
//       <article
//         key={recipe.recipeId}
//         className="flex max-w-xl flex-col items-start justify-between"
//       >
//         <div>
//           <img src={recipe.creatorImage} alt="תמונה של המתכון" />
//         </div>

//         <div className="group relative">
//           <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
//             {/* <a href={recipe.href}> */}
//             <span className="absolute inset-0" />
//             {recipe.title}
//             {/* </a> */}
//           </h3>
//           <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
//             {recipe.category}
//           </p>
//         </div>
//         <div className="relative mt-8 flex items-center gap-x-4">
//           <div onClick={() => navigate(`/recipes/creator/${recipe.recipeId}`)}>
//             <img
//               src={recipe.creatorImage}
//               alt=""
//               className="h-10 w-10 rounded-full bg-gray-50"
//             />
//             <div className="text-sm leading-6">
//               <p className="font-semibold text-gray-900">
//                 <span className="absolute inset-0" />
//                 {recipe.creatorName}
//               </p>
//             </div>
//           </div>
//           <div className="flex items-center gap-x-4 text-xs">
//             <time dateTime={recipe.createdAt} className="text-gray-500">
//               {formatDateTime(recipe.createdAt)}
//             </time>
//             <p className="font-semibold text-">נוצר ב </p>
//           </div>
//         </div>
//       </article>
//     </div>
//   ) : (
//     <div>אין כזה מתכון</div>
//   );
// }

import { StarIcon } from '@heroicons/react/20/solid';

const product = {
  name: 'Basic Tee 6-Pack',
  price: '$192',
  href: '#',
  breadcrumbs: [
    { id: 1, name: 'Men', href: '#' },
    { id: 2, name: 'Clothing', href: '#' },
  ],
  images: [
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
      alt: 'Two each of gray, white, and black shirts laying flat.',
    },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    'Hand cut and sewn locally',
    'Dyed with our proprietary colors',
    'Pre-washed & pre-shrunk',
    'Ultra-soft 100% cotton',
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};
const reviews = { href: '#', average: 4, totalCount: 117 };

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Example() {
  const { id } = useParams();
  const [allRecipes] = useAtom(allRecipesAtom);
  const [recipe, setRecipe] = useState<Recipes | undefined>();
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      console.log(allRecipes);

      const newRecipe = allRecipes.find((r) => r.recipeId === id);
      console.log(newRecipe);
      setRecipe(newRecipe);
    }
  }, []);

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
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              {product.price}
            </p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating
                          ? 'text-gray-900'
                          : 'text-gray-200',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                {/* <p className="sr-only">{reviews.average} out of 5 stars</p> */}
                <div className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  {reviews.totalCount} reviews
                </div>
              </div>
            </div>
          </div>

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

            <div className="mt-10">
              <div className="relative mt-8 flex items-center gap-x-4">
                <div
                  onClick={() =>
                    navigate(`/recipes/creator/${recipe?.recipeId}`)
                  }
                >
                  <img
                    src={recipe?.creatorImage}
                    alt=""
                    className="h-10 w-10 rounded-full bg-gray-50"
                  />
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      <span className="absolute inset-0" />
                      {recipe?.creatorName}
                    </p>
                  </div>
                </div>
                {recipe?.createdAt && (
                  <div className="flex items-center gap-x-4 text-xs">
                    <time dateTime={recipe.createdAt} className="text-gray-500">
                      {formatDateTime(recipe.createdAt)}
                    </time>
                    <p className="font-semibold text-">נוצר ב </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
