import { useSetAtom } from 'jotai';
import { classNames } from '../../css/classes';
import { Users } from '../../interfaces/users';
import { formatDateTime } from '../../utils/date';
import { trpc } from '../../utils/trpc';
import { loadingAtom } from '../../utils/atoms';
import { toast } from 'react-toastify';
import AlertSecces from '../../utils/AlertSecces';
import { useState } from 'react';

const RowUser = ({ user }: { user: Users }) => {
  const setLoadingGlobal = useSetAtom(loadingAtom);
  const [errorFromServer, setErrorFromServer] = useState<string>('') 


  const notify = () => {
    toast.success('!המשתמש נמחק', {
      theme: 'colored',
    });
  };
  const deleteUser = async () => {
    try {
      setLoadingGlobal(true);
      const res = await trpc.users.deleteUser.mutate(user.email);
      if (res && typeof res !== 'string') {
        setLoadingGlobal(false);
        console.log(res);
        notify();
      }
      if (res && typeof res ==='string') {
        console.log(res);
        setLoadingGlobal(false);
        setErrorFromServer(res);
      }
    } catch (err) {
      console.error(err);
      setLoadingGlobal(false);
    }
  };

  return (
    <>
      <tr className="border-b border-dashed last:border-b-0">
        <td className="p-3 pl-0">
          <div className="flex items-center">
            <div className="relative inline-block shrink-0 rounded-2xl me-3">
              <img
                src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/img-49-new.jpg"
                className="w-[50px] h-[50px] inline-block shrink-0 rounded-2xl"
                alt=""
              />
            </div>
            <div className="flex flex-col justify-start">
              <p className="mb-1 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse hover:text-primary">
                {user.email}
              </p>
            </div>
          </div>
        </td>
        <td className="p-3 pr-0 text-end">
          <span className="mb-1 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse hover:text-primary">
            {user.user_name}
          </span>
        </td>
        {/* <td className="p-3 pr-0 text-end">
          <span className="mb-1 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse hover:text-primary">
            {user.password}
          </span>
        </td> */}
        <td className="p-3 pr-12 text-end">
          <span className="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-primary bg-primary-light rounded-lg">
            {user.reviews}
          </span>
        </td>
        <td className="p-3 pr-12 text-end">
          <span className="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-primary bg-primary-light rounded-lg">
            {user.shared}
          </span>
        </td>
        <td className="pr-0 text-start">
          <span className="font-semibold text-light-inverse text-md/normal">
            {formatDateTime(user.createdAt ? user.createdAt : new Date())}
          </span>
        </td>
        <td className="p-3 pr-0 text-end">
          <span className="flex items-center justify-center p-0 m-0 leading-none shrink-0 ">
            {user.isAdmin ? 'Admin' : 'User'}
          </span>
        </td>
        <td className="pr-0 text-start">
          <span className="font-semibold text-light-inverse text-md/normal">
            {formatDateTime(user.updatedAt ? user.updatedAt : new Date())}
          </span>
        </td>
        <td className="pr-0 text-start">
          <span className="font-semibold text-light-inverse text-md/normal">
            {user.user_id}
          </span>
        </td>
        <td className="pr-0 text-start">
          <button
            className={classNames(
              'bg-gray-200 text-gray-500 hover:bg-gray-700 hover:text-white',
              'block rounded-md px-3 py-2 text-base font-medium'
            )}
            onClick={deleteUser}
          >
            מחק משתמש
          </button>
        </td>
      </tr>
      <AlertSecces />
      {errorFromServer && <p>{errorFromServer}</p>}
    </>
  );
};
export default RowUser;
