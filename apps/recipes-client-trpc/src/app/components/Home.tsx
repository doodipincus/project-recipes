import Header from './Header';
import SideBar from './SideBar';
import AllRecipes from './recipes/AllRecipes';
import New from './users/new';

const Home = () => {
  return (
    <>
      <Header />
      <div className="flex">
        <SideBar />
        <AllRecipes />
      </div>
      <New />
    </>
  );
};

export default Home;
