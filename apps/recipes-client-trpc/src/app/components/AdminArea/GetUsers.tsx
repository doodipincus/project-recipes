import { useEffect, useState } from 'react';
import { trpc } from '../../utils/trpc';
import { Users } from '../../interfaces/users';
import RowUser from './RowUser';
import { useSetAtom } from 'jotai';
import { lodingAtom } from '../../utils/atoms';

const GetUsers = () => {
  const [users, setUsers] = useState<Users[] | string>([]);
  const setLodingGlobal = useSetAtom(lodingAtom);

  const send = async () => {
    try {
      setLodingGlobal(true);
      const res = await trpc.users.getUsers.query();
      if (res && typeof res !== 'string') {
        setLodingGlobal(false);
        console.log(res);
        setUsers(res);
      }
      if (res && typeof res === 'string') {
        console.log(res);
      }
    } catch (error) {
      console.error(error);
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
            {/* <!-- card header --> */}
            <div className="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
              <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                <span className="mr-3 font-semibold text-dark">
                  כל המשתמשים
                </span>
                <span className="mt-1 font-medium text-secondary-dark text-lg/normal">
                  כאן תוכל לראות ולערוך את כל המשתמשים שנרשמו לאתר
                </span>
              </h3>
            </div>
            {/* <!-- end card header --> */}
            {/* <!-- card body  --> */}
            <div className="flex-auto block py-8 pt-6 px-9">
              <div className="overflow-x-auto">
                <table className="w-full my-0 align-middle text-dark border-neutral-200">
                  <thead className="align-bottom">
                    <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                      <th className="pb-3 text-start min-w-[175px]">אימייל</th>
                      <th className="pb-3 text-end min-w-[100px]">שם משתמש</th>
                      <th className="pb-3 text-end min-w-[100px]">סיסמא</th>
                      <th className="pb-3 pr-12 text-end min-w-[175px]">
                        לייקים 
                      </th>
                      <th className="pb-3 pr-12 text-end min-w-[175px]">
                        מתכונים ששיתף 
                      </th>
                      <th className="pb-3 pr-12 text-end min-w-[100px]">
                        נוצר ב
                      </th>
                      <th className="pb-3 text-end min-w-[50px]">סטטוס</th>
                      <th className="pb-3 text-end min-w-[100px]">התעדכן ב</th>
                      <th className="pb-3 text-end min-w-[150px]">user id</th>
                      <th className="pb-3 text-end min-w-[150px]">פעולות נוספות</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length > 0 &&
                      typeof users != 'string' &&
                      users.map((user) => (
                        <RowUser user={user} key={user.user_id} />
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GetUsers;
