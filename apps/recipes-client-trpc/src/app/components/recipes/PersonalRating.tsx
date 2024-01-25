import { useEffect, useState } from 'react';
import { trpc } from '../../utils/trpc';
import { useAtomValue } from 'jotai';
import { userAtom } from '../../utils/atoms';

interface Props {
  id: string;
  rating: number | undefined;
  comment: string | undefined;
}

const PersonalRating = ({ id, rating, comment }: Props) => {
  const [personalRating, setPersonalRating] = useState(0);
  const [newcomment, setNewComment] = useState<string>('');
  const user = useAtomValue(userAtom);

  // const addRating = async (star: number) => {
  //   if (user.email && user.userName) {
  //     // setPersonalRating(star + 1);
  //     try {
  //       const res = await trpc.recipes.addRating.mutate({
  //         id,
  //         email: user.email,
  //         user_name: user.userName,
  //         rating: star + 1,
  //         comment: comment
  //       });
  //       if (res) console.log(res);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // };

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
        if (res) console.log(res);
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
    <div className="grid min-h-[140px] w-full overflow-x-scroll rounded-lg p-6 lg:overflow-visible text-center">
      ספר לנו מה דעתך
      <div className="flex items-center gap-2 font-bold text-blue-gray-500">
        <div className="inline-flex items-center">
          <div className="inline-flex items-center">
            {[0, 1, 2, 3, 4].map((star) => (
              <span onClick={() => setPersonalRating(star + 1)}>
                {/* <span onClick={() => addRating(star)}> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={
                    star < personalRating
                      ? 'w-6 h-6 cursor-pointer text-yellow-700 '
                      : 'w-6 h-6 cursor-pointer text-blue-gray-500'
                  }
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            ))}
          </div>
          <button className="" type="button" onClick={addRating}>
            שלח
          </button>
        </div>
        {/* ספר לנו מה דעתך */}
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
    </div>
  );
};
export default PersonalRating;
