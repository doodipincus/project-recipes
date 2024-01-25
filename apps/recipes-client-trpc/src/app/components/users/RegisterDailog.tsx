import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAtom, useSetAtom } from 'jotai';
import {
  userIsLoggedInAtom,
  userAtom,
  registerAtom,
  loadingAtom,
} from '../../utils/atoms';
import { useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import AlertSecces from '../../utils/AlertSecces';
import { v4 as uuidv4 } from 'uuid';

const RegisterDailog = () => {
  const [register, setRegister] = useAtom(registerAtom);
  const setUserIsLoggedIn = useSetAtom(userIsLoggedInAtom);
  const setUser = useSetAtom(userAtom);
  const [checkboks, setCheckboxes] = useState(true);
  const setLoadingGlobal = useSetAtom(loadingAtom);

  const notify = () => {
    toast.success("You've logged in successfully!", {
      theme: 'colored',
    });
  };

  const REGISTER = gql`
    mutation MyMutation($input: CreateUserInput!) {
      createUser(input: $input) {
        user {
          createdAt
          email
          isAdmin
          reviews
          shared
          updatedAt
          userId
          userName
        }
      }
    }
  `;

  const [sendRegistertoServer, { data, error }] = useMutation(REGISTER);

  const send = async () => {
    console.log('sebd ');

    if (
      register.email &&
      register.password &&
      register.userName &&
      register.password === register.confirmPassword
    ) {
      setLoadingGlobal(true);
      sendRegistertoServer({
        variables: {
          input: {
            user: {
              userId: uuidv4(),
              userName: register.userName,
              email: register.email,
              password: register.password,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          },
        },
      });
    }
  };

  useEffect(() => {
    if (data) {
      console.log(data);
      console.log(data.createUser.user);
      setLoadingGlobal(false);
      setUserIsLoggedIn(true);
      setUser(data.createUser.user);
      notify();
      // if (checkboks) {
      //   localStorage.setItem('userName', res.user_name);
      //   localStorage.setItem('password', res.password);
      // }
    }
    if (error) {
      console.log(error);
      setLoadingGlobal(false);
    }
  }, [data, error]);

  const hasEmpty = Object.values(register).includes('');
  console.log(hasEmpty);

  return (
    <body className="bg-white rounded-lg py-5">
      <div className="container flex flex-col mx-auto bg-white rounded-lg pt-12 my-5">
        <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
          <div className="flex items-center justify-center w-full lg:p-12">
            <div className="flex items-center xl:p-10">
              <form className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl">
                <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">
                  הרשמה
                </h3>
                <p className="mb-4 text-grey-700">
                  הכנס שם משתמש, כתובת אימייל וסיסמא
                </p>
                <div className="flex items-center cursor-pointer justify-center w-full py-4 mb-6 text-sm font-medium transition duration-300 rounded-2xl text-grey-900 bg-grey-300 hover:bg-grey-400 focus:ring-4 focus:ring-grey-300">
                  <img
                    className="h-5 mr-2"
                    src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
                    alt=""
                  />
                  הרשם עם גוגל
                </div>
                <div className="flex items-center mb-3">
                  <hr className="h-0 border-b border-solid border-grey-500 grow" />
                  <p className="mx-4 text-grey-600">או</p>
                  <hr className="h-0 border-b border-solid border-grey-500 grow" />
                </div>
                <label
                  htmlFor="user_name"
                  className="mb-2 text-sm text-start text-grey-900"
                >
                  שם משתמש*
                </label>
                <input
                  id="user_name"
                  type="user_name"
                  placeholder="הכנס שם משתמש"
                  className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                  value={register.userName}
                  onChange={(e) =>
                    setRegister({ ...register, userName: e.target.value })
                  }
                />
                <label
                  htmlFor="email"
                  className="mb-2 text-sm text-start text-grey-900"
                >
                  אימייל*
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="mail@example.com"
                  className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                  value={register.email}
                  onChange={(e) =>
                    setRegister({ ...register, email: e.target.value })
                  }
                />
                <label
                  htmlFor="password"
                  className="mb-2 text-sm text-start text-grey-900"
                >
                  סיסמא*
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="הכנס סיסמא"
                  className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                  value={register.password}
                  onChange={(e) =>
                    setRegister({ ...register, password: e.target.value })
                  }
                />
                <label
                  htmlFor="password"
                  className="mb-2 text-sm text-start text-grey-900"
                >
                  אימות סיסמא*
                </label>
                <input
                  id="confirem_password"
                  type="password"
                  placeholder="אמת את הסיסמא"
                  className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                  value={register.confirmPassword}
                  onChange={(e) =>
                    setRegister({
                      ...register,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                <div className="flex flex-row justify-between mb-8">
                  <label className="relative inline-flex items-center mr-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={checkboks}
                      onChange={(e) => setCheckboxes(e.target.checked)}
                      value=""
                      className="sr-only peer"
                    />
                    <div className="w-5 h-5 bg-white border-2 rounded-sm border-grey-500 peer peer-checked:border-0 peer-checked:bg-purple-blue-500">
                      <img
                        className=""
                        src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/icons/check.png"
                        alt="tick"
                      />
                    </div>
                    <span className="ml-3 text-sm font-normal text-grey-900">
                      תשאיר אותי מחובר
                    </span>
                  </label>
                </div>
                 
                  <button
                    type="button"
                    disabled={hasEmpty}
                    onClick={send}
                    className={hasEmpty ? 'cursor-not-allowed w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500' :"cursor-pointer w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500"}
                  >
                    הרשם
                  </button>
              
              </form>
            </div>
          </div>
        </div>
      </div>
      <AlertSecces />
    </body>
  );
};
export default RegisterDailog;
