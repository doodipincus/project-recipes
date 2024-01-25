import { useEffect, useState } from 'react';
import { trpc } from '../../utils/trpc';
import { useAtomValue, useSetAtom } from 'jotai';
import { loadingAtom, userAtom } from '../../utils/atoms';
import { FavoriteBack } from '../../interfaces/favorites';
import RowReview from '../AdminArea/RowReview';

const PersonalReviews = () => {
  const [reviews, setReviews] = useState<FavoriteBack[]>([]);
  const [errorFromServer, setErrorFromServer] = useState<string>('');
  const setLoadingGlobal = useSetAtom(loadingAtom);
  const user = useAtomValue(userAtom);

  const send = async () => {
    try {
      if (user.email) {
        setLoadingGlobal(true);
        const res = await trpc.favorites.getFavoritesByUser.query(user.email);
        if (res && typeof res !== 'string') {
          setLoadingGlobal(false);
          console.log(res);
          setReviews(res);
        }
        if (res && typeof res === 'string') {
          console.log(res);
          setLoadingGlobal(false);
          setErrorFromServer(res);
        }
      }
    } catch (error) {
      console.error(error);
      setLoadingGlobal(false);
    }
  };

  useEffect(() => {
    send();
  }, []);

  return (
    <div className="flex flex-wrap -mx-3 mb-5">
      <div className="w-full max-w-full px-3 mb-6  mx-auto">
        <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
          <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
            <div className="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
              <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                <span className="mr-3 font-semibold text-dark">
                  כל הביקורות
                </span>
                <span className="mt-1 font-medium text-secondary-dark text-lg/normal">
                  כאן תוכל לראות את כל הביקורות שנתת על המתכונים שלנו
                </span>
              </h3>
            </div>

            <div className="flex-auto block py-8 pt-6 px-9">
              <div className="overflow-x-auto">
                <table className="w-full my-0 align-middle text-dark border-neutral-200">
                  <thead className="align-bottom">
                    <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                      <th className="pb-3 text-start min-w-[175px]">אימייל</th>
                      <th className="pb-3 text-end min-w-[100px]">שם משתמש</th>
                      <th className="pb-3 text-end min-w-[175px]">עוגה</th>

                      <th className="pb-3 pr-12 text-end min-w-[175px]">
                        ביקורת
                      </th>
                      <th className="pb-3 pr-12 text-end min-w-[175px]">
                        דירוג
                      </th>
                      <th className="pb-3 pr-12 text-end min-w-[100px]">
                        ניתן ב
                      </th>
                      <th className="pb-3 text-end min-w-[150px]">
                        פעולות נוספות
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {reviews.length > 0 &&
                      typeof reviews != 'string' &&
                      reviews.map((review) => (
                        <RowReview review={review} key={review.favorite_id} />
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {errorFromServer && <p>{errorFromServer}</p>}
    </div>
  );
};
export default PersonalReviews;
