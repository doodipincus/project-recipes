import { Dialog } from '@material-tailwind/react';
import RegisterDailog from './RegisterDailog';
import { classNames } from '../../css/classes';
import { useAtom } from 'jotai';
import { modalRegisterAtom, modalSignInAtom } from '../../utils/atoms';
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../utils/redux/hooks';
import { setOpenRegister} from '../../utils/redux/sliceRegister'

export default function RegisterModal() {
  // const [flag, setflag] = useAtom(modalRegisterAtom)
  // const [openR, setOpenR] = useAtom(modalRegisterAtom);
  // const [signIn, setSignIn] = useAtom(modalSignInAtom)
  // const [test, setTest] = useState(signIn)
  
  const dispatch = useAppDispatch()
  const flag = useAppSelector((s)=> s.register.flag)
  const [openR, setOpenR] = useState(flag);

  // const handleOpen = () => {setOpen((cur) => !cur);}
  const handleOpen = () => {{setOpenR((cur) => !cur);};}


  // console.log('test', test);
  // console.log('test sign in', signIn);
  useEffect(()=>{
    // setTest(signIn)
    setOpenR(flag)
  },[flag ])
  
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
        open={openR}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <RegisterDailog />
      </Dialog>
    </>
  );
}
