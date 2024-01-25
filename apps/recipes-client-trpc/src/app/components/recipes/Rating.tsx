import { trpc } from '../../utils/trpc';

interface Props {
  rating: number | undefined;
  reviews: number | undefined;
  id: string | undefined;
}

const Rating = ({ props }: { props: Props }) => {
  const { rating, reviews, id } = props;

  const getReviews =async () => {
    if (id) {
      try {
        const reviews =await trpc.favorites.getFavoritesByRecipe.query(id);
        if (reviews && typeof reviews !== 'string') {
          console.log(reviews);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="grid min-h-[140px] w-full overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
      <div className="flex items-center gap-2 font-bold text-blue-gray-500">
        {typeof rating === 'number' && rating.toFixed(1)}
        <div className="inline-flex items-center">
          {[0, 1, 2, 3, 4].map((star) => (
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={
                  rating && star < rating
                    ? 'w-6 h-6 text-yellow-700 cursor-pointer'
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
        <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-500">
          מתוך {reviews} דירוגים
        </p>
      </div>
      <button
        type="button"
        onClick={getReviews}
        className="block font-sans text-base antialiased"
      >
        לרשימת הממליצים
      </button>
    </div>
  );
};
export default Rating;
