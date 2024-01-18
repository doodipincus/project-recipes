import { Dialog } from '@material-tailwind/react';
import { classNames } from '../../css/classes';
import { useState } from 'react';
import AddFestivalDailog from './addFestivalDailog';

export default function AddFestivalModal() {
  const [open, setOpen] = useState(false);
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
        הוסף פסטיבל
      </button>
      <Dialog
        size="xl"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <AddFestivalDailog />
      </Dialog>
    </>
  );
}
