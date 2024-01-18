import { useState } from "react";
import { Prop } from "../../interfaces/props";

const Inputs = ({ props }: Prop) =>{

    const [inputs, setInputs] = useState([
        <input
          type="text"
          name="ingredients"
          id="ingredients"
          autoComplete="ingredients"
          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />,
      ]);

      const addInput = () => {
        setInputs((inputs) => [
          ...inputs,
          <input
            key={inputs.length}
            type="text"
            name="ingredients"
            id="ingredients"
            autoComplete="ingredients"
            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />,
        ]);
      };
    
    return (
        <div>
        <div className="flex flex-wrap -mx-3 mb-5 p-4 items-center justify-between">
          <label
            htmlFor="last-name"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            מוצרים
          </label>
          <div onClick={addInput}>עוד מוצר</div>
        </div>
        <div
          // className="flex flex-wrap -mx-3 mb-5"
          className="mt-2.5"
        >
          {inputs.map((input) => input)}
        </div>
      </div>
    )
}
export default Inputs