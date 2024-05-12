import { Dialog } from '@material-tailwind/react';
import SignInDailog from './SignInDailog';
import { classNames } from '../../css/classes';
import { useAtom, useAtomValue } from 'jotai';
import { modalSignInAtom } from '../../utils/atoms';
import { useState } from 'react';

export default function SignInModal() {
  // const flag = useAtomValue(modalSignInAtom)
  const [flag, setFlag] = useAtom(modalSignInAtom);
  const [open, setOpen] = useState<boolean>(flag);
  // const [open, setOpen] = useState<boolean>(flag);
  // const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => {setOpen((cur) => !cur); setFlag(!flag) };

  // console.log('flag', flag);
  // console.log('open', open);
  
  

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
        // handler={()=>{}}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <SignInDailog handleOpen={handleOpen} />
      </Dialog>
    </>
  );
}
