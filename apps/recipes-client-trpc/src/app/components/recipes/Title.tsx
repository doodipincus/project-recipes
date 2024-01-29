import { useNavigate } from 'react-router-dom';

const Title = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center">
      <div className="mx-auto max-w-2xl lg:mx-0">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl flex justify-center">
          מסיבת הטעמים
        </h2>
        <h4 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-1xl flex justify-center">
          אתר המתכונים הגדול בישראל
        </h4>
        <p className="mt-2 text-lg leading-8 text-gray-600 flex justify-center">
          כאן תוכלו לקבל ולשתף מתכונים אהובים
        </p>
        <p
          className="mt-2 text-lg leading-8 cursor-pointer text-blue-500 flex justify-center"
          onClick={() => navigate(`/foodFestival`)}
        >
          לקבלת מידע על פסטיבלי האוכל הגדולים שלנו
        </p>
      </div>
    </div>
  );
};
export default Title;
