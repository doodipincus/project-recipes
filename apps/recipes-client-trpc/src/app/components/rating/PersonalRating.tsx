import { useEffect, useState } from 'react';
import { trpc } from '../../utils/trpc';
import { useAtomValue } from 'jotai';
import { userAtom } from '../../utils/atoms';
import AlertSecces from '../../utils/AlertSecces';
import { toast } from 'react-toastify';
import StarsRating from './StarsRating';

interface Props {
  id: string;
  rating: number | undefined;
  comment: string | undefined;
}

const PersonalRating = ({ id, rating, comment }: Props) => {
  const [personalRating, setPersonalRating] = useState(0);
  const [newcomment, setNewComment] = useState<string>('');
  const user = useAtomValue(userAtom);

  const notify = () => {
    toast.success('הביקורת נוספה', {
      theme: 'colored',
    });
  };

  const addRating = async () => {
    if (user.email && user.userName) {
      try {
        const res = await trpc.recipes.addRating.mutate({
          id,
          email: user.email,
          user_name: user.userName,
          rating: personalRating,
          comment: newcomment,
        });
        if (res && typeof res !== 'string') {
          notify();
          console.log(res);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  useEffect(() => {
    if (rating) setPersonalRating(rating);
    if (comment) setNewComment(comment);
  }, [rating, comment]);

  return (
    <div className="grid min-h-[140px] w-full overflow-x-scroll rounded-lg p-6 lg:overflow-visible text-center border">
      ספר לנו מה דעתך
      <div className="flex  items-center justify-between gap-2 font-bold text-blue-gray-500 pl-14 pr-10">
        <div className="flex  flex-col items-center justify-between gap-4 ">
          <h2 className="">דרג</h2>
          <StarsRating numRating={personalRating} />
        </div>
        <div className="">
          <div className="items-center gap-2 text-center">
            הוסף תגובה
            <div className="mt-2.5">
              <textarea
                name="instructions"
                id="instructions"
                rows={4}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={''}
                onChange={(e) => setNewComment(e.target.value)}
                value={newcomment}
              />
            </div>
          </div>
        </div>
      </div>
      <button
        className="mt-3 min-h-full rounded-xl border-2 bg-gray-400 hover:ease-in"
        type="button"
        onClick={addRating}
      >
        שלח
      </button>
      <AlertSecces />
    </div>
  );
};
export default PersonalRating;
