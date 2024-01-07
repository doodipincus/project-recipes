import { trpc2 } from '../../utils/trpc';
import { useAtom } from 'jotai';
import { modalIsOpenAtom, signInAtom } from '../../utils/atoms';
import Modal from 'react-modal';
import SignInModal from './SignInModal';

const New = () => {
    const [signIn, setSignIn] = useAtom(signInAtom);
    const [modalIsOpen, setModalIsOpen] = useAtom(modalIsOpenAtom)
  
    const send = async () => {
    if (signIn) {
      const send = await trpc2.signIn.query(signIn);
      if (send) console.log(send);
    }
  };



const openModal = () => {
    setModalIsOpen(true);
  };

const closeModal = () => {
    setModalIsOpen(false);
  };
 

  const size = '32rem';
  return (
    // <main className="flex items-center justify-center w-screen h-screen flex-col bg-gray-100">
    //   <button
    //     data-toggle="modal"
    //     type="button"
    //     className="flex items-center justify-center px-4 font-medium bg-violet-700 text-white h-9 rounded-md rounded md hover:bg-violet-800 transition-all duration-300"
    //   >
    //     <span className="flex items-center justify-center space-x-2">
    //       Open modal
    //     </span>
    //   </button>

    //   <div
    //     role="dialog"
    //     id="modal-example"
    //     aria-hidden="false"
    //     style={{ display: 'flex' }}
    //     className="modal fixed top-0 left-0 z-50 w-screen h-screen bg-black/30 flex items-center flex-col justify-center p-6 fade"
    //     tabIndex={-1}
    //   >
    //     <div
    //       className="absolute top-0 left-0 z-[0] w-full h-full"
    //       tabIndex={-1}
    //     ></div>

    //     <article
    //       className="modal-content flex flex-col relative m-0 rounded-md bg-white sm:my-16"
    //       aria-labelledby="modal-title"
    //       aria-describedby="modal-body"
    //     >
    //       <header className="flex p-4 items-center justify-between">
    //         <button
    //           type="button"
    //           className="flex items-center justify-center w-8 h-8 rounded-full bg-transparent transition-colors duration-300 hover:bg-black/10"
    //           data-dismiss="modal"
    //           aria-label="Close"
    //         >
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             width="22"
    //             height="22"
    //             viewBox="0 0 24 24"
    //             fill="none"
    //             stroke="#000000"
    //             strokeWidth="2"
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             style={{ '--size': size } as React.CSSProperties}
    //           >
    //             <line
    //               x1="18"
    //               y1="6"
    //               x2="6"
    //               y2="18"
    //               style={{ '--size': size } as React.CSSProperties}
    //             ></line>
    //             <line
    //               x1="6"
    //               y1="6"
    //               x2="18"
    //               y2="18"
    //               style={{ '--size': size } as React.CSSProperties}
    //             ></line>
    //           </svg>
    //         </button>
    //       </header>
    //      
    //     </article>
    //   </div>
    // </main>
    <main 
    className={modalIsOpen ? "flex items-center justify-center w-screen h-screen flex-col bg-gray-100" : undefined}
    >
    <button
      type="button"
      className="w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500"
      onClick={openModal}
    >
      <span className="flex items-center justify-center space-x-2">Open modal</span>
    </button>

    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <header className="flex p-4 items-center justify-between">
        <button
          type="button"
          className="flex items-center justify-center w-8 h-8 rounded-full bg-transparent transition-colors duration-300 hover:bg-black/10"
          onClick={closeModal}
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ '--size': size } as React.CSSProperties}
          >
            <line x1="18" y1="6" x2="6" y2="18" style={{ '--size': size } as React.CSSProperties}></line>
            <line x1="6" y1="6" x2="18" y2="18" style={{ '--size': size } as React.CSSProperties}></line>
          </svg>
        </button>
      </header>
      <body className="bg-white rounded-lg py-5">
        <SignInModal/>
      </body>
    </Modal>
  </main>
  );
};
export default New;
