import DeleteUser from './DeleteUser';
import GetUsers from '../AdminArea/GetUsers';
import IncrementRank from './IncrementRank';
import Register from '../users/Register';
import SignIn from '../users/SignIn';
import UpdateUser from './UpdateUser';
import UserByEmail from './UserByEmail';

const Test = () => {
  return (
    <>
      <Register />
      <UserByEmail />
      <UpdateUser />
      <SignIn />
      <DeleteUser/>
      <GetUsers/>
      <IncrementRank/>
    </>
  );
};
export default Test;
