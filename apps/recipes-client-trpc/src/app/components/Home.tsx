import SideBar from './SideBar';
import AllRecipes from './recipes/AllRecipes';


const Home = () => {
  return (
      <div className="flex justify-center">
        {/* <SideBar /> */}
        <AllRecipes />
      </div>
  );
};

export default Home;
