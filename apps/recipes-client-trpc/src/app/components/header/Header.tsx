import { userIsLoggedInAtom } from '../../utils/atoms';
import { useAtomValue } from 'jotai';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import SignInModal from '../users/SignInModal';
import RegisterModal from '../users/RegisterModal';
import MenuProfile from './MenuProfile';
import Panel from './Panel';
import ButtonsAndLogo from './ButtonsAndLogo';
import ButtonCloseOrOpen from './ButtonCloseOrOpen';

const Header = () => {
  const userIsLoggedIn = useAtomValue(userIsLoggedInAtom);

  return (
    <div className="min-h-full">
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <ButtonsAndLogo />
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    {/* Profile dropdown */}
                    <MenuProfile />
                    {!userIsLoggedIn && <RegisterModal />}
                    {!userIsLoggedIn && <SignInModal />}
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <ButtonCloseOrOpen open={open} />
                </div>
              </div>
            </div>
            <Panel />
          </>
        )}
      </Disclosure>
    </div>
  );
};
export default Header;
