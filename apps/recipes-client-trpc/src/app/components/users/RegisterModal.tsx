import { Dialog } from '@material-tailwind/react';
import RegisterDailog from './RegisterDailog';
import { classNames } from '../../css/classes';
import { useAtom } from 'jotai';
import { modalRegisterAtom } from '../../utils/atoms';


export default function RegisterModal() {
  const [open, setOpen] = useAtom(modalRegisterAtom);
  console.log(open);
  console.log(localStorage.getItem('email'));
  console.log(localStorage.getItem('password'));
  
  
  const handleOpen = () => setOpen((cur) => !cur);

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
        // handler={()=>{}}
        className="bg-transparent shadow-none"
      >
        <RegisterDailog />
      </Dialog>
    </>
  );
}
