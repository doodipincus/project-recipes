import React, { useEffect } from 'react';
import { Dialog } from '@material-tailwind/react';
import SignInDailog from './SignInDailog';
import { classNames } from '../../css/classes';
import { useAtomValue } from 'jotai';
import { modalRegisterAtom, registerAtom } from '../../utils/atoms';

export default function SignInModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const registerModal = useAtomValue(modalRegisterAtom);
  
  useEffect(() => {
    setOpen(false);
  }, [registerModal]);

  return (
    <>
      <button
        className={classNames(
          'text-gray-300 hover:bg-gray-700 hover:text-white',
          'block rounded-md px-3 py-2 text-base font-medium'
        )}
        onClick={handleOpen}
      >
        התחבר
      </button>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <SignInDailog />
      </Dialog>
    </>
  );
}
