import { useNavigate } from 'react-router-dom';
import { resetUserAtom, userAtom, userIsLoggedInAtom } from '../../utils/atoms';
import { useAtom, useAtomValue } from 'jotai';
import { useState } from 'react';
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from '@material-tailwind/react';
import { ChevronUpIcon } from '@heroicons/react/24/solid';

const MenuProfile = () => {
  const [openMenuPerson, setOpenMenuPerson] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
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
    <>
      {userIsLoggedIn && (
        <Menu
          open={openMenuPerson}
          handler={setOpenMenuPerson}
          allowHover
          offset={15}
        >
          <MenuHandler className="flex items-center justify-between">
            <div>
              <MenuItem className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                {/* <img
                  className="h-8 w-8 rounded-full"
                  // src=""
                  alt="gtyjuyuy"
                /> */}
                <div className="flex flex-shrink-0 self-start cursor-pointer">
                  <div className="h-8 w-8 rounded-full bg-gray-500 flex items-center justify-center">
                    <p className="text-xl text-white">
                      {user.userName ? user.userName[0] : ''}
                    </p>
                  </div>
                </div>
              </MenuItem>
            </div>
          </MenuHandler>

          <MenuList>
            <MenuItem
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
              onClick={logout}
            >
              צא
            </MenuItem>
            <MenuItem className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
              <Menu
                placement="left-start"
                open={openMenu}
                handler={setOpenMenu}
                allowHover
                offset={15}
              >
                <MenuHandler className="flex items-center justify-between">
                  <MenuItem className="flex justify-start">
                    איזור אישי
                    <ChevronUpIcon
                      strokeWidth={2.5}
                      className={`h-3.5 w-3.5 transition-transform ${
                        openMenu ? 'rotate-180' : ''
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
                  <MenuItem
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                    onClick={() => navigate(`/personalReviews`)}
                  >
                    ביקורות שנתת
                  </MenuItem>
                </MenuList>
              </Menu>
            </MenuItem>
            <MenuItem
              onClick={() => navigate(`/showDetails/${user.userId}`)}
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              <h3 className="pl-1 text-sm flex items-center py-2 mb-2 transition duration-200 ease-in">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="black"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>פרופיל</div>
              </h3>
              {/* לפרטים שלך */}
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </>
  );
};
export default MenuProfile;
