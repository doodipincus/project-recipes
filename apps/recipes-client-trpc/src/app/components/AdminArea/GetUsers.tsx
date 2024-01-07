import { useState } from 'react';
import { trpc2 } from '../../utils/trpc';
import { Users } from '../interfaces/users';

const GetUsers = () => {
  const [users, setUsers] = useState<Users[] | string>([]);
  const send = async () => {
    try {
      const send = await trpc2.getUsers.query();
      if (send) {
        console.log(send);
        setUsers(send);
      }
    } catch (error) {
      console.error(error);
    }
  };
  send();
  return (

      <div className="flex flex-wrap -mx-3 mb-5">
        <div className="w-full max-w-full px-3 mb-6  mx-auto">
          <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
            <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
              {/* <!-- card header --> */}
              <div className="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
                <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                  <span className="mr-3 font-semibold text-dark">
                    Projects Deliveries
                  </span>
                  <span className="mt-1 font-medium text-secondary-dark text-lg/normal">
                    All projects from the Loopple team
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
                        <th className="pb-3 text-start min-w-[175px]">Email</th>
                        <th className="pb-3 text-end min-w-[100px]">
                          User name
                        </th>
                        <th className="pb-3 text-end min-w-[100px]">
                          Password
                        </th>
                        <th className="pb-3 pr-12 text-end min-w-[175px]">
                          Rank
                        </th>
                        <th className="pb-3 pr-12 text-end min-w-[100px]">
                          Created at
                        </th>
                        <th className="pb-3 text-end min-w-[50px]">Admin</th>
                        <th className="pb-3 text-end min-w-[100px]">
                          Update at
                        </th>
                        <th className="pb-3 text-end min-w-[150px]">user id</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.length > 0 &&
                      typeof users !='string' &&
                        users.map((user) => (
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
                            <td className="p-3 pr-0 text-end">
                              <span className="mb-1 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse hover:text-primary">
                                {user.password}
                              </span>
                            </td>
                            <td className="p-3 pr-12 text-end">
                              <span className="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-primary bg-primary-light rounded-lg">
                                {user.rank}
                              </span>
                            </td>
                            <td className="pr-0 text-start">
                              <span className="font-semibold text-light-inverse text-md/normal">
                                {user.createdAt}
                              </span>
                            </td>
                            <td className="p-3 pr-0 text-end">
                              <span className="flex items-center justify-center p-0 m-0 leading-none shrink-0 ">
                                {user.isAdmin ? 'Admin' : 'User'}
                              </span>
                            </td>
                            <td className="pr-0 text-start">
                              <span className="font-semibold text-light-inverse text-md/normal">
                                {user.updatedAt}
                              </span>
                            </td>
                            <td className="pr-0 text-start">
                              <span className="font-semibold text-light-inverse text-md/normal">
                                {user.user_id}
                              </span>
                            </td>
                          </tr>
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
