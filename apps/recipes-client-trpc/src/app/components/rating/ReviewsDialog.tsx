import { useEffect, useState } from 'react';
import { trpc } from '../../utils/trpc';
import { FavoriteBack } from '../../interfaces/favorites';
import RowReviewByRecipe from './RowReviewByRecipe';
import { useSetAtom } from 'jotai';
import { loadingAtom } from '../../utils/atoms';

const ReviewsDailog = ({
  id,
  handelOpen,
}: {
  id: string;
  handelOpen: () => void;
}) => {
  const [dataReviews, setDataReviews] = useState<FavoriteBack[]>([]);
  const setLoadingGlobal = useSetAtom(loadingAtom);
  const [errorFromServer, setErrorFromServer] = useState('');

  const getReviews = async () => {
    if (id) {
      try {
        setLoadingGlobal(true);
        const reviews = await trpc.favorites.getFavoritesByRecipe.query(id);
        if (reviews && typeof reviews !== 'string') {
          setLoadingGlobal(false);
          setDataReviews(reviews);
          console.log(reviews);
        }
        if (reviews && typeof reviews === 'string') {
          setLoadingGlobal(false);
          setErrorFromServer(reviews);
          console.log(reviews);
        }
        console.log(reviews);
      } catch (error) {
        console.error(error);
        setLoadingGlobal(false);
      }
    }
  };

  const subscribeTofavorites = async () => {
    try {
      await trpc.favorites.onAdd.subscribe(undefined, {
        onData: (data) => {
          setDataReviews((prev) => [...prev, data]);
          console.log(data);
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
    subscribeTofavorites();
    getReviews();
  }, []);

  console.log(dataReviews);

  return (
    <body className="bg-white rounded-lg">
      <div className="container flex flex-col mx-auto bg-white rounded-lg pt-10 my-5">
        <div className="flex justify-end ">
          <button
            onClick={handelOpen}
            type="button"
            className=" absolute text-right  w-10 h-10 rounded-full "
          >
            <svg fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke="#CCCCCC"
                stroke-width="1.7280000000000002"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {' '}
                <rect width="24" height="24" fill="white"></rect>{' '}
                <path
                  d="M7 17L16.8995 7.10051"
                  stroke="#000000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{' '}
                <path
                  d="M7 7.00001L16.8995 16.8995"
                  stroke="#000000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{' '}
              </g>
            </svg>
          </button>
        </div>

        <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
          <div className="flex items-center justify-center w-full lg:p-12">
            <div className="items-center xl:p-10 text-center">
              <h1 className="mb-10 text-2xl font-semibold ">
                ביקורות וממליצים
              </h1>
              <table className="w-full my-0 align-middle text-dark border-neutral-200">
                <thead className="align-bottom">
                  <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                    <th className="pb-3 text-center min-w-[100px]">שם משתמש</th>

                    <th className="pb-3 pr-12 text-center min-w-[175px]">
                      ביקורת
                    </th>
                    <th className="pb-3 pr-12 text-center min-w-[175px]">
                      דירוג
                    </th>
                    <th className="pb-3 pr-12 text-center min-w-[100px]">
                      ניתן ב
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataReviews.map((r) => (
                    <RowReviewByRecipe review={r} />
                  ))}
                </tbody>
              </table>
              {errorFromServer && (
                <p className="font-black text-2xl">{errorFromServer}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};
export default ReviewsDailog;
