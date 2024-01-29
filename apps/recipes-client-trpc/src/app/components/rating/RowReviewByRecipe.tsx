import { FavoriteBack } from '../../interfaces/favorites';
import { formatDateTime } from '../../utils/date';
import StarsRating from './StarsRating';

const RowReviewByRecipe = ({ review }: { review: FavoriteBack }) => {
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
              <span className="mb-1 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse hover:text-primary">
                {review.user_name}
              </span>
            </div>
          </div>
        </td>

        <td className="p-3 pr-12 text-end">
          <span className="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-primary bg-primary-light rounded-lg">
            {review.comment}
          </span>
        </td>
        <td className="p-3 pr-12 text-end">
          <StarsRating numRating={review.stars} />
        </td>
        <td className="pr-0 text-start">
          <span className="font-semibold text-light-inverse text-md/normal">
            {review.createdAt && formatDateTime(review.createdAt)}
          </span>
        </td>
      </tr>
      {/* {errorFromServer && <p>{errorFromServer}</p>} */}
    </>
  );
};
export default RowReviewByRecipe;
