import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  userIsLoggedInAtom,
  signInAtom,
  userAtom,
  modalRegisterAtom,
  lodingAtom,
} from '../../utils/atoms';
import { useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import AlertSecces from '../../utils/AlertSecces';

const SignInDailog = () => {
  const [signIn, setSignIn] = useAtom(signInAtom);
  const setRegisterModal = useSetAtom(modalRegisterAtom);
  const setUserIsLoggedIn = useSetAtom(userIsLoggedInAtom);
  const [checkboks, setCheckboxes] = useState(true);
  const setLoding = useSetAtom(lodingAtom);
  
  // const setUser = useSetAtom(userAtom);
  const [user, setUser] = useAtom(userAtom);


  const notify = () => {
    toast.success('!התחברת בהצלחה', {
      theme: 'colored',
    });
  };

  const SIGN_IN = gql`
    mutation MyMutation($input: LoginInput!) {
      login(input: $input) {
        loginRespon {
          jwtToken
          userDetails
        }
      }
    }
  `;

  const [signInToServer, { error, data }] = useMutation(SIGN_IN);

  const send = () => {
    if (signIn.email && signIn.password) {
      setLoding(true);
      signInToServer({ variables: { input: signIn } });
    }
  };

  useEffect(() => {
    if (data && data.login.loginRespon) {
      setLoding(false);
      notify();
      setUserIsLoggedIn(true);
      setUser(data.login.loginRespon.userDetails);
      localStorage.setItem('TOKEN', data.login.loginRespon.jwtToken);
      // if (checkboks) {
      //   localStorage.setItem('email', data.login.loginRespon.userDetails.email);
      //   localStorage.setItem('password', data.login.loginRespon.userDetails.password);
      // }
    }
    if (error) {
      setLoding(false);
      console.error(error);
    }
  }, [data, error]);

  return (
    <body className="bg-white rounded-lg py-5">
      <div className="container flex flex-col mx-auto bg-white rounded-lg pt-12 my-5">
        <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
          <div className="flex items-center justify-center w-full lg:p-12">
            <div className="flex items-center xl:p-10">
              <form
                className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl"
                onSubmit={send}
              >
                <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">
                  התחבר
                </h3>
                <p className="mb-4 text-grey-700">הכנס כתובת אימייל וסיסמא</p>
                <div className="flex items-center cursor-pointer justify-center w-full py-4 mb-6 text-sm font-medium transition duration-300 rounded-2xl text-grey-900 bg-grey-300 hover:bg-grey-400 focus:ring-4 focus:ring-grey-300">
                  <img
                    className="h-5 mr-2"
                    src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
                    alt=""
                  />
                  התחבר עם גוגל
                </div>
                <div className="flex items-center mb-3">
                  <hr className="h-0 border-b border-solid border-grey-500 grow" />
                  <p className="mx-4 text-grey-600">או</p>
                  <hr className="h-0 border-b border-solid border-grey-500 grow" />
                </div>
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
                  value={signIn.email}
                  required
                  onChange={(e) =>
                    setSignIn({ ...signIn, email: e.target.value })
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
                  placeholder="Enter a password"
                  className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                  value={signIn.password}
                  required
                  onChange={(e) =>
                    setSignIn({ ...signIn, password: e.target.value })
                  }
                />
                <div className="flex flex-row justify-between mb-8">
                  <label className="relative inline-flex items-center mr-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={checkboks}
                      onChange={(e) => setCheckboxes(e.target.checked)}
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
                  <button className="mr-4 text-sm font-medium text-purple-blue-500">
                    ?שכחת סיסמא
                  </button>
                </div>
                <button
                  type="submit"
                  onClick={send}
                  className="cursor-pointer w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500"
                >
                  התחבר
                </button>
                <p className="text-sm leading-relaxed text-grey-900">
                  אינך רשום?{' '}
                  <div
                    className="font-bold text-grey-700 inline cursor-pointer"
                    onClick={() => setRegisterModal(true)}
                  >
                    צור משתמש חדש
                  </div>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      <AlertSecces />
    </body>
  );
};
export default SignInDailog;
