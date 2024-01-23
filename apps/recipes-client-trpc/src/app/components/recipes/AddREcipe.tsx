import { useEffect, useState } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { lodingAtom, userAtom } from '../../utils/atoms';
import { RecipesInput, Recipes } from '../../interfaces/recipes';
import FormRecipe from './FormRecipe';
import { trpc } from '../../utils/trpc';
import { toast } from 'react-toastify';
import AlertSecces from '../../utils/AlertSecces';

export default function AddRecipe() {
  const [user] = useAtom(userAtom);
  const [newRecipe, setNewRecipe] = useState<RecipesInput>({
    title: '',
    category: '',
    image: '',
    creator_name: '',
    creator_email: '',
    sensitivity: '',
    country_of_origin: '',
    difficulty: '',
    ingredients: ['lkjd', 'skjdhf'],
    instructions: '',
    preparation_time: '',
  });
  const [loading, setLoading] = useAtom(lodingAtom);

  const notify = () => {
    toast.success('הוספת את המתכון בהצלחה!', {
      theme: 'colored',
    });
  };

  const addRecipe = async () => {
    if (newRecipe.creator_email) {
      try {
        console.log('add', newRecipe);
        setLoading(true);
        const res = trpc.recipes.addRecipe.mutate(newRecipe);
        if (res) {
          console.log(res);
          setLoading(false);
          notify();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const addCrator = () => {
    if (user.email && user.userName) {
      setNewRecipe({
        ...newRecipe,
        creator_name: user.userName,
        creator_email: user.email,
      });
    }
  };

  useEffect(() => {
    addCrator();
  }, []);
  const hasEmpty = Object.values(newRecipe).includes('');
  console.log(hasEmpty);

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <FormRecipe props={{ recipe: newRecipe, setRecipe: setNewRecipe }} />
      <div className="mx-auto max-w-xl ">
        <button
          className={
            hasEmpty
              ? 'block w-full rounded-md bg-gray-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              : 'block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          }
          onClick={addRecipe}
          disabled={hasEmpty}
        >
          שלח מתכון
        </button>
      </div>
<AlertSecces/>
    </div>
  );
}
