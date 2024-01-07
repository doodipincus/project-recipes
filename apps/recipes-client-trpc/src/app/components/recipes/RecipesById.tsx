import { useParams } from 'react-router-dom';
import { allRecipesAtom } from '../../utils/atoms';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Recipes } from '../interfaces/recipes';

export default function RecipesById() {
  const { id } = useParams();
  const [allRecipes] = useAtom(allRecipesAtom);
  const [recipe, setRecipe] = useState<Recipes | undefined>();

  useEffect(() => {
    if (id) {
      console.log(allRecipes);

      const newRecipe = allRecipes.find((r) => r.recipeId === id);
      console.log(newRecipe);
      setRecipe(newRecipe);
    }
  }, []);

  return recipe ? (
    <article
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
        <a href={`/recipes/creator/${recipe.creatorId ? recipe.creatorId: 1}`}>
          <img
            src={recipe.creatorImage}
            alt=""
            className="h-10 w-10 rounded-full bg-gray-50"
          />
          <div className="text-sm leading-6">
            <p className="font-semibold text-gray-900">
              <span className="absolute inset-0" />
              {recipe.creatorName}
            </p>
          </div>
        </a>
        <div className="flex items-center gap-x-4 text-xs">
          <time dateTime={recipe.createdAt} className="text-gray-500">
            {recipe.createdAt}
          </time>
          <p className="font-semibold text-">נוצר ב </p>
        </div>
      </div>
    </article>
  ) : (
    <div>אין כזה מתכון</div>
  );
}
