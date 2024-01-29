import { Dialog } from '@material-tailwind/react';
import RegisterDailog from './RegisterDailog';
import { classNames } from '../../css/classes';
import { useAtom, useAtomValue } from 'jotai';
import { modalRegisterAtom } from '../../utils/atoms';
import { useEffect, useState } from 'react';

export default function RegisterModal() {
  // const registerModal = useAtomValue(modalRegisterAtom);
  const [open, setOpen] = useState<boolean>(false);
  console.log(open);

  const handleOpen = () => setOpen((cur) => !cur);

  // useEffect(() => {
  //   setOpen(registerModal);
  // }, [registerModal]);


  return (
    <>
      <button
        className={classNames(
          'text-gray-300 hover:bg-gray-700 hover:text-white',
          'block rounded-md px-3 py-2 text-base font-medium'
        )}
        onClick={handleOpen}
      >
        הרשם
      </button>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <RegisterDailog />
      </Dialog>
    </>
  );
}
