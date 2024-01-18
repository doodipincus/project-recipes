import { Navigate } from 'react-router-dom';
// import styles from './Redirect.module.css';
/* eslint-disable-next-line */
export interface RedirectProps {}
export function Redirect(props: RedirectProps) {
  return (
    <div >
      <Navigate to={'/home'} />
    </div>
  );
}
export default Redirect;