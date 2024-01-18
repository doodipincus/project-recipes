import { Details } from '../../interfaces/details';

const CardDetails = ({ details }: { details: Details }) => {
  return (
    <div className="flex flex-col items-center gap-3 px-8 py-10 bg-white rounded-3xl shadow-main">
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="38"
          height="38"
          viewBox="0 0 38 38"
          fill="none"
        >
          <path d={details.path} fill="#581ff8" />
        </svg>
      </span>
      <p className="text-2xl font-extrabold text-dark-grey-900">
        {details.title}
      </p>
      <p className="text-lg font-bold text-purple-blue-500">{details.body}</p>
    </div>
  );
};
export default CardDetails;
