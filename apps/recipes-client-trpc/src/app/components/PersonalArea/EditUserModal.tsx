import React from 'react';
import { Dialog } from '@material-tailwind/react';
import EditUserDailog from './EditUserDailog';
import { classNames } from '../../css/classes';


export default function EditUserModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <>
      <button
        className={classNames(
          'bg-gray-200 text-gray-500 hover:bg-gray-700 hover:text-white',
          'block rounded-md px-3 py-2 text-base font-medium'
        )}
        onClick={handleOpen}
      >
        ערוך פרטים
      </button>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <EditUserDailog />
      </Dialog>
    </>
  );
}
