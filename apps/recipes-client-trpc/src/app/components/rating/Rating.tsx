import ShowReviewsModal from './ShowReviewsModal';
import StarsRating from './StarsRating';

interface Props {
  rating: number | undefined;
  reviews: number | undefined;
  id: string | undefined;
}

const Rating = ({ props }: { props: Props }) => {
  const { rating, reviews, id } = props;

  return (
    <div className="flex justify-between min-h-[140px] w-full overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
      <div className="flex  items-center gap-2 font-bold text-blue-gray-500">
        {typeof rating === 'number' && rating.toFixed(1)}
        <StarsRating numRating={rating} />
        <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-500">
          מתוך {reviews} דירוגים
        </p>
      </div>
      {id && <ShowReviewsModal id={id} />}
    </div>
  );
};
export default Rating;
