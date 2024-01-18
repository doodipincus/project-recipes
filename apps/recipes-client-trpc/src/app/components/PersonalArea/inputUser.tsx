import { Users } from '../../interfaces/users';

type details = {
  user_name: string | undefined;
  email: string | undefined;
  password: string | undefined;

};

type D = {
  path: string;
  lable: string;
  body: any;
  name: string;
  type: string;
};

type P = {
  props: {
    i: D;
    details: details;
    setDetails: (details: details) => void;
  };
};

const InputUser = ({ props }: P) => {
  const { i, details, setDetails } = props;
  return (
    <div>
      <label
        htmlFor={i.name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {i.lable}
      </label>
      <div className="mt-2">
        <input
          id={i.name}
          name={i.name}
          type={i.type}
          value={details[i.name as keyof typeof details]}
          onChange={(e) =>
            setDetails({
              ...details,
              [e.target.name]: e.target.value,
            })
          }
          required
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
};
export default InputUser;
