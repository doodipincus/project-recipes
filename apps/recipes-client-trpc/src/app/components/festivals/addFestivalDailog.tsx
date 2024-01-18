import { gql, useMutation } from '@apollo/client';
import { newFestivalAtom, userAtom } from '../../utils/atoms';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import MapAddFestival from './MapAddFestival';

const AddFestivalDailog = () => {
  const [newFestival, setNewFestival] = useAtom(newFestivalAtom);
  const [user] = useAtom(userAtom);

  const ADD_FESTIVAL = gql`
    mutation MyMutation($input: CreateFestivalInput!) {
      createFestival(input: $input) {
        festival {
          festivalCreatorEmail
          festivalCreatorImage
          festivalCreatorName
          festivalDateTime
          festivalDescription
          festivalId
          festivalImage
          festivalLocation
          festivalName
        }
      }
    }
  `;

  const [addFestival, { error, data }] = useMutation(ADD_FESTIVAL);

  const addCrator = () => {
    if (user.email && user.user_name) {
      setNewFestival({
        ...newFestival,
        festivalCreatorName: user.user_name,
        festivalCreatorEmail: user.email,
      });
    }
  };
  useEffect(() => {
    addCrator();
  }, []);

  const send = () => {
    console.log(newFestival);
    console.log(typeof newFestival.festivalDateTime);

    addFestival({ variables: { input: { festival: newFestival } } });
  };
  useEffect(() => {
    if (data) console.log(data);
    if (error) console.log(error);
  }, [data, error]);

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
                      festivalDateTime: new Date(formattedDateAndTime),
                    });
                  }}
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
                />

                <div
                  onClick={send}
                  className="cursor-pointer w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500"
                >
                  שלח
                </div>
              </form>
              <MapAddFestival />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </body>
  );
};
export default AddFestivalDailog;
