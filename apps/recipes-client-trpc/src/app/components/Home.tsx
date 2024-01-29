import SideBar from './SideBar';
import AllRecipes from './recipes/AllRecipes';


const Home = () => {
  return (
      <div className="flex">
        {/* <SideBar /> */}
        <AllRecipes />
      </div>
  );
};

export default Home;
