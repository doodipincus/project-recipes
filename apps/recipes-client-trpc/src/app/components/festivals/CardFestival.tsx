import { useNavigate } from 'react-router-dom';
import { FestivalBack } from '../../interfaces/festivals';
import { formatDateTime } from '../../utils/date';

const CardFestival = ({ festival }: { festival: FestivalBack }) => {
  return (
    <div>
      <div className="relative h-48 bg-gray-100 rounded-t-lg">
        {festival.festival_image ? (
          <img
            className="absolute inset-0 h-full w-full object-cover rounded-t-lg"
            src={festival.festival_image}
            alt={festival.festival_image}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <svg
              className="w-12 h-12 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>
      <div className="px-5 py-4">
        <h3 className="text-xl font-semibold text-gray-800 text-center">
          {festival.festival_name}
        </h3>

        <p className="mt-2 text-gray-600 text-center">{festival.festival_description}</p>

        <p className="mt-4 text-lg font-medium text-gray-400 text-center">
          {formatDateTime(festival.festival_date_time)}
        </p>

        <div className="mt-4 flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-500 text-white">
              <span className="text-base font-bold">
                {festival.festival_creator_name[0]}
              </span>
            </div>
          </div>

          <div className="text-sm text-gray-500">
            <p className="font-medium">{festival.festival_creator_name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CardFestival;
