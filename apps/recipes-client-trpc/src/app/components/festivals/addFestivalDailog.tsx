import { loadingAtom, newFestivalAtom, userAtom } from '../../utils/atoms';
import { useAtom, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import MapAddFestival from './MapAddFestival';
import { trpc } from '../../utils/trpc';
import AlertSecces from '../../utils/AlertSecces';

const AddFestivalDailog = () => {
  const [newFestival, setNewFestival] = useAtom(newFestivalAtom);
  const [user] = useAtom(userAtom);
  const setLoadingGlobal = useSetAtom(loadingAtom);

  const notify = () => {
    toast.success('!הפסטיבל נוסף בהצלחה', {
      theme: 'colored',
    });
  };
  const addFestival = async () => {
    console.log('festival', newFestival);
    console.log('type', typeof newFestival.festivalDateTime);
    console.log('date', newFestival.festivalDateTime);
    console.log('add festival');
    try {
      if (newFestival.festivalLocation.length) {
        setLoadingGlobal(true);
        const res = await trpc.festivals.addfestival.mutate(newFestival);
        console.log(res);
        setLoadingGlobal(false);
        notify();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addCrator = () => {
    if (user.email && user.userName) {
      setNewFestival({
        ...newFestival,
        festivalCreatorName: user.userName,
        festivalCreatorEmail: user.email,
        // festivalDateTime: new Date()
      });
    }
  };
  useEffect(() => {
    addCrator();
  }, []);

  const hasEmpty =
    Object.values(newFestival).includes('') ||
    newFestival.festivalLocation.length === 0;
  console.log(hasEmpty);

  return (
    <body className="bg-white rounded-lg py-5">
      <div className="container flex flex-col mx-auto bg-white rounded-lg pt-12 my-5">
        <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
          <div className="flex items-center justify-center w-full lg:p-12">
            <div className="flex items-center xl:p-10">
              <form className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl">
                <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">
                  הוספת פסטיבל
                </h3>
                <p className="mb-4 text-grey-700">מלא את השדות הבאים</p>
                <label
                  htmlFor="name"
                  className="mb-2 text-sm text-start text-grey-900"
                >
                  שם הפסטיבל*
                </label>
                <input
                  placeholder="שם הפסטיבל"
                  type="text"
                  className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                  onChange={(e) =>
                    setNewFestival({
                      ...newFestival,
                      festivalName: e.target.value,
                    })
                  }
                  value={newFestival.festivalName}
                />
                <label
                  htmlFor="datetime"
                  className="mb-2 text-sm text-start text-grey-900"
                >
                  תאריך ושעה*
                </label>
                <input
                  placeholder="תאריך ושעה"
                  className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                  type="datetime-local"
                  onChange={(e) => {
                    const dateAndTimeValue = e.target.value;
                    const parsedDateAndTime = new Date(dateAndTimeValue);
                    const formattedDateAndTime =
                      parsedDateAndTime.toISOString();
                    setNewFestival({
                      ...newFestival,
                      // festivalDateTime: new Date(formattedDateAndTime),
                      festivalDateTime: formattedDateAndTime,
                    });
                  }}
                  // value={new Date(newFestival.festivalDateTime)}
                />
                <label
                  htmlFor="datetime"
                  className="mb-2 text-sm text-start text-grey-900"
                >
                  פרטים*
                </label>
                <textarea
                  placeholder="פרטים"
                  className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                  onChange={(e) =>
                    setNewFestival({
                      ...newFestival,
                      festivalDescription: e.target.value,
                    })
                  }
                  value={newFestival.festivalDescription}
                />
                <label
                  htmlFor="image"
                  className="mb-2 text-sm text-start text-grey-900"
                >
                  תמונה*
                </label>
                <input
                  placeholder="תמונה"
                  className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                  type="text"
                  onChange={(e) =>
                    setNewFestival({
                      ...newFestival,
                      festivalImage: e.target.value,
                    })
                  }
                  value={newFestival.festivalImage}
                />
                <button
                  type="button"
                  onClick={addFestival}
                  disabled={hasEmpty}
                  className={
                    hasEmpty
                      ? 'cursor-not-allowed w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500'
                      : 'cursor-pointer w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500'
                  }
                >
                  הוסף פסטיבל
                </button>
              </form>
              <MapAddFestival />
            </div>
          </div>
        </div>
      </div>
      <AlertSecces />
    </body>
  );
};
export default AddFestivalDailog;
