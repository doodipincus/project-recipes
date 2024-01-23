import { useNavigate } from 'react-router-dom';
import { resetUserAtom, userAtom, userIsLoggedInAtom } from '../../utils/atoms';
import { useAtom, useAtomValue } from 'jotai';
import { useState } from 'react';
import { Disclosure } from '@headlessui/react';
import SignInModal from '../users/SignInModal';
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from '@material-tailwind/react';
import { ChevronUpIcon } from '@heroicons/react/24/solid';
import RegisterModal from '../users/RegisterModal';
import { classNames } from '../../css/classes';


const Panel = () => {
  const [openMenuRec, setOpenMenuRec] = useState(false);
  const [openMenuAdminRec, setOpenMenuAdminRec] = useState(false);
  const [userIsLoggedIn, setUserIsLoggedIn] = useAtom(userIsLoggedInAtom);
  const [user, setUser] = useAtom(userAtom);
  const resetUser = useAtomValue(resetUserAtom);
  const navigate = useNavigate();

  const logout = () => {
    setUserIsLoggedIn(false);
    setUser(resetUser);
    localStorage.removeItem('email');
    localStorage.removeItem('password');
  };

  return (
    <Disclosure.Panel className="md:hidden">
      <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3 flex">
        <button
          // key={item.name}
          onClick={() => navigate(`/foodFestival`)}
          className={classNames(
            'text-gray-300 hover:bg-gray-700 hover:text-white',
            'rounded-md px-3 py-2 text-sm font-medium'
          )}
          // aria-current={item.current ? 'page' : undefined}
        >
          לאירועי אוכל
        </button>
        {((user.likes && user.likes >= 30) || user.isAdmin) && (
          <button
            // key={item.name}
            onClick={() => navigate(`/addRecipe`)}
            className={classNames(
              'text-gray-300 hover:bg-gray-700 hover:text-white',
              'rounded-md px-3 py-2 text-sm font-medium'
            )}
            // aria-current={item.current ? 'page' : undefined}
          >
            הוסף מתכון
          </button>
        )}
        {user.isAdmin && (
          <Menu
            // placement="left-start"
            open={openMenuAdminRec}
            handler={setOpenMenuAdminRec}
            allowHover
            offset={15}
          >
            <MenuHandler
              className={classNames(
                'text-gray-300 hover:bg-gray-700 hover:text-white flex',
                'rounded-md px-3 py-2 text-sm font-medium flex'
              )}
            >
              <MenuItem>
                איזור מנהלים
                <ChevronUpIcon
                  strokeWidth={2.5}
                  className={`h-3.5 w-3.5 transition-transform ${
                    openMenuAdminRec ? 'rotate-180' : ''
                  }`}
                />
              </MenuItem>
            </MenuHandler>
            <MenuList>
              <MenuItem
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                onClick={() => navigate(`/allUsers`)}
              >
                כל המשתמשים
              </MenuItem>
              <MenuItem
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                onClick={() => navigate(`/graphs`)}
              >
                גרפים ונתונים
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </div>
      {!userIsLoggedIn && (
        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3 flex">
          <SignInModal />
          <RegisterModal />
        </div>
      )}
      {userIsLoggedIn && (
        <div className="border-t border-gray-700 pb-3 pt-4">
          <div className="flex items-center px-5">
            <div className="flex-shrink-0">
              <img className="h-10 w-10 rounded-full" src="" alt="" />
            </div>
            <div className="ml-3">
              <div className="text-base font-medium leading-none text-white">
                {user.userName}
              </div>
              <div className="text-sm font-medium leading-none text-gray-400">
                {user.email}
              </div>
            </div>
          </div>
          <div className="mt-3 space-y-1 px-2">
            <Disclosure.Button
              // key={}
              as="button"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
              onClick={logout}
            >
              צא
            </Disclosure.Button>
            <Disclosure.Button
              // key={}
              as="button"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              <Menu
                placement="right-start"
                open={openMenuRec}
                handler={setOpenMenuRec}
                allowHover
                offset={15}
              >
                <MenuHandler className="flex items-center justify-between">
                  <MenuItem className="flex items-center justify-start">
                    איזור אישי
                    <ChevronUpIcon
                      strokeWidth={2.5}
                      className={`h-3.5 w-3.5 transition-transform ${
                        openMenuRec ? 'rotate-90' : ''
                      }`}
                    />
                  </MenuItem>
                </MenuHandler>
                <MenuList>
                  <MenuItem
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                    onClick={() => navigate(`/favoriteRecipes/${user.userId}`)}
                  >
                    מתכונים שאהבת
                  </MenuItem>
                  <MenuItem
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                    onClick={() => navigate(`/personalRecipe/${user.userId}`)}
                  >
                    מתכונים ששיתפת
                  </MenuItem>
                </MenuList>
              </Menu>
            </Disclosure.Button>
            <Disclosure.Button
              // key={}
              as="button"
              onClick={() => navigate(`/showDetails/${user.userId}`)}
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              פרופיל
            </Disclosure.Button>
          </div>
        </div>
      )}
    </Disclosure.Panel>
  );
};
export default Panel;
