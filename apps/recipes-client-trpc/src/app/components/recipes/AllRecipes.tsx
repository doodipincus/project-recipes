import { useEffect } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { allRecipesAtom, loadingAtom, userAtom } from '../../utils/atoms';
import CardRecipe from './CardRecipe';
import Skeleton from '../loading/Skeleton';
import Loading from '../loading/Loading';
import Title from './Title';
import { trpc } from '../../utils/trpc';

export default function AllRecipes() {
  const [allRecipes, setAllRecipes] = useAtom(allRecipesAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const user = useAtomValue(userAtom);

  const getRecipes = async () => {
    try {
      setLoading(true);
      const resipes = await trpc.recipes.getRecipes.query();
      console.log(resipes);
      
      if (resipes?.length && typeof resipes !== 'string') {
        console.log(resipes);
        setAllRecipes(resipes);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const subscribeToRecipes = async () => {
    try {
      await trpc.recipes.onAdd.subscribe(undefined, {
        onData: (data) => {
          setAllRecipes((prev) => [...prev, data]);
        },
        onError: (err) => {
          console.error('Subscription error:', err);
        },
      });
    } catch (err) {
      console.error('Error subscribing to messages:', err);
    }
  };

  useEffect(() => {
    if (!allRecipes.length) {
      getRecipes();
    }
    subscribeToRecipes();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {
    if (allRecipes.length) console.log(typeof allRecipes[0].createdAt);
  }, [allRecipes]);

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
