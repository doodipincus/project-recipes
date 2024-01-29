import React from 'react';
import { Dialog } from '@material-tailwind/react';
import ReviewsDailog from './ReviewsDialog';

export default function ShowReviewsModal({ id }: { id: string }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className=" border p-2 rounded-full bg-gray-400"
      >
        לרשימת הממליצים
      </button>
      <Dialog
        size="md"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <ReviewsDailog id={id} handelOpen={handleOpen}  />
      </Dialog>
    </>
  );
}
