import DeleteUser from './DeleteUser';
import GetUsers from '../AdminArea/GetUsers';
import IncrementRank from './IncrementRank';
import UpdateUser from './UpdateUser';
import UserByEmail from './UserByEmail';

const Test = () => {
  return (
    <>
      <UserByEmail />
      <UpdateUser />
      <DeleteUser/>
      <GetUsers/>
      <IncrementRank/>
    </>
  );
};
export default Test;
