import { ToastContainer } from "react-toastify"

const AlertSecces = () =>{
return(
    <ToastContainer
    position="top-center"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
  />
)
}
export default AlertSecces