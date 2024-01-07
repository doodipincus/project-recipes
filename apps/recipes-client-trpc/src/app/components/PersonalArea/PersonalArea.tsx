import { useNavigate, useParams } from 'react-router-dom';

const PersonalArea = () => {
  const { id } = useParams;
  const navigate = useNavigate();
  return (
    <div>
      <button  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={() => navigate(`/editUser/${1}`)}>
        ערוך את הנתונים שלך
      </button>
      <button  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={() => navigate(`/favoriteRecipes/${1}`)}>
        מתכונים שאהבת
      </button>
      <button  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={() => navigate(`/personalRecipe/${1}`)}>
        מתכונים ששיתפת
      </button>
    </div>
  );
};

export default PersonalArea;
