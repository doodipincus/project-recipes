import { FavoriteBack } from '../../interfaces/favorites';
import { formatDateTime } from '../../utils/date';
import StarsRating from './StarsRating';

const RowReviewByRecipe = ({ review }: { review: FavoriteBack }) => {
  return (
    <>
      <tr className="border-b border-dashed last:border-b-0">
        <td className="p-3 pl-0 text-center">
          <span className="mb-1 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse hover:text-primary">
            {review.user_name}
          </span>
        </td>

        <td className="p-3 pr-12 text-center">
          <span className="mb-1 transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse">
            {review.comment}
          </span>
        </td>
        <td className="p-3 pr-12 text-center">
          <StarsRating numRating={review.stars} />
        </td>
        <td className="pr-0 text-center">
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
