import { useAtomValue, useSetAtom } from 'jotai';
import { classNames } from '../../css/classes';
import { formatDateTime } from '../../utils/date';
import { trpc } from '../../utils/trpc';
import { allRecipesAtom, loadingAtom } from '../../utils/atoms';
import { toast } from 'react-toastify';
import AlertSecces from '../../utils/AlertSecces';
import { useState } from 'react';
import { FavoriteBack } from '../../interfaces/favorites';
import { useNavigate } from 'react-router-dom';
import StarsRating from '../rating/StarsRating';

const RowReview = ({ review }: { review: FavoriteBack }) => {
  const setLoadingGlobal = useSetAtom(loadingAtom);
  const [errorFromServer, setErrorFromServer] = useState<string>('');
  const allRecipes = useAtomValue(allRecipesAtom);
  const navigate = useNavigate();

  const notify = () => {
    toast.success('!הביקורת נמחקה', {
      theme: 'colored',
    });
  };
  const deleteReview = async () => {
    try {
      setLoadingGlobal(true);
      const res = await trpc.favorites.deleteFavorite.mutate(
        review.favorite_id
      );
      if (res && typeof res !== 'string') {
        setLoadingGlobal(false);
        console.log(res);
        notify();
      }
      if (res && typeof res === 'string') {
        console.log(res);
        setLoadingGlobal(false);
        setErrorFromServer(res);
      }
    } catch (err) {
      console.error(err);
      setLoadingGlobal(false);
    }
  };
  const cake = allRecipes.find((r) => r.recipe_id === review.recipe_id);
  return (
    <>
      <tr className="border-b border-dashed last:border-b-0">
        <td className="p-3 pl-0">
          <div className="flex items-center">
            <div className="relative inline-block shrink-0 rounded-2xl me-3">
              <img
                src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/img-49-new.jpg"
                className="w-[50px] h-[50px] inline-block shrink-0 rounded-2xl"
                alt=""
              />
            </div>
            <div className="flex flex-col justify-start">
              <p className="mb-1 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse hover:text-primary">
                {review.user_email}
              </p>
            </div>
          </div>
        </td>
        <td className="p-3 pr-0 text-center">
          <span className="mb-1 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse hover:text-primary">
            {review.user_name}
          </span>
        </td>
        <td className="p-3 pr-0 text-center">
          <span
            className="mb-1 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse text-blue-500 cursor-pointer"
            onClick={() => navigate(`/recipe/${cake?.recipe_id}`)}
          >
            {cake?.title}
          </span>
        </td>
        <td className="p-3 pr-12 text-center">
          <span  className="mb-1 transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse">
            {review.comment}
          </span>
        </td>
        <td className="p-3 pr-12 text-center">
          <StarsRating numRating={review.stars} />
        </td>
        <td className="pr-0 text-center">
          <span className="font-semibold text-light-inverse text-md/normal">
            {formatDateTime(review.createdAt ? review.createdAt : new Date())}
          </span>
        </td>
        <td className="pr-0 flex justify-center">
          <button
            className={classNames(
              'bg-gray-200 text-gray-500 hover:bg-gray-700 hover:text-white',
              'block rounded-md px-3 py-2 text-base font-medium mt-5'
            )}
            onClick={deleteReview}
            type="button"
          >
            מחק ביקורת
          </button>
        </td>
      </tr>
      <AlertSecces />
      {errorFromServer && <p>{errorFromServer}</p>}
    </>
  );
};
export default RowReview;
