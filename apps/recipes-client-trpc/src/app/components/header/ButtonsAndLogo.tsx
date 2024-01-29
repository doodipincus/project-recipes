import { useNavigate } from 'react-router-dom';
import { userAtom, userIsLoggedInAtom } from '../../utils/atoms';
import { useAtomValue } from 'jotai';
import { useState } from 'react';
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from '@material-tailwind/react';
import { ChevronUpIcon } from '@heroicons/react/24/solid';
import { classNames } from '../../css/classes';

const ButtonsAndLogo = () => {
  const [openMenuAdmin, setOpenMenuAdmin] = useState(false);
  const user = useAtomValue(userAtom);
  const navigate = useNavigate();

  return (
    <div className="flex items-center">
      <div
        className="flex-shrink-0 cursor-pointer"
        onClick={() => navigate('/')}
      >
        <img
          className="h-8 w-8"
          src="beer-svgrepo-com.svg"
          // src="../../../../public/tas.png"
          // src="../../../../public/tasteParty.png"
          // src="../../../../public/_f39d07f2-4065-4362-afd4-7d0e4c4627c2-removebg-preview.png"
          alt="Your Company"
        />
      </div>
      <div className="hidden md:block">
        <div className="ml-10 flex items-baseline space-x-4">
          <button
            // key={item.name}
            onClick={() => navigate(`/foodFestival`)}
            className={classNames(
              'text-gray-300 hover:bg-gray-700 hover:text-white',
              'rounded-md px-3 py-2 text-sm font-medium'
            )}
          >
            לפסטיבלי אוכל
          </button>
          {((user.reviews && user.reviews >= 30) || user.isAdmin) && (
            <button
              // key={item.name}
              onClick={() => navigate(`/addRecipe`)}
              className={classNames(
                'text-gray-300 hover:bg-gray-700 hover:text-white',
                'rounded-md px-3 py-2 text-sm font-medium'
              )}
            >
              הוסף מתכון
            </button>
          )}
          {user.isAdmin && (
            <Menu
              // placement="left-start"
              open={openMenuAdmin}
              handler={setOpenMenuAdmin}
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
                      openMenuAdmin ? 'rotate-180' : ''
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
                  onClick={() => navigate(`/allReviews`)}
                >
                  כל הביקורות
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
      </div>
    </div>
  );
};
export default ButtonsAndLogo;
