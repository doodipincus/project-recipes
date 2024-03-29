import { useState } from 'react';
import { Recipes } from '../../interfaces/recipes';
import MenuCountries from './MenuCountries';
import { Switch } from '@headlessui/react';
import { PropsInput } from '../../interfaces/props';
import Inputs from './InputsForProducts';
import { classNames } from '../../css/classes';

const FormRecipe = ({ props }: PropsInput) => {
  const [shareWithEveryone, setShareWithEveryone] = useState<boolean>(true);

  const { recipe, setRecipe } = props;

  const hendalChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  return (
    <div className="isolate bg-white px-6   sm:py-10 lg:px-8">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          הוספת מתכון
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          מלא את השדות הבאים והוסף את המתכון שלך למאגר
        </p>
      </div>
      <form
        action="#"
        method="POST"
        className="mx-auto mt-16 max-w-xl sm:mt-20"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              כותרת
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="title"
                id="title"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => hendalChange(e)}
                value={recipe.title}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              קטגוריה
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="category"
                id="category"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => hendalChange(e)}
                value={recipe.category}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="preparationTime"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              זמן הכנה
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="preparation_time"
                id="preparationTime"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => hendalChange(e)}
                value={recipe.preparation_time}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="difficulty"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              קושי
            </label>
            <div className="mt-2.5">
              <select
                id="difficulty"
                name="difficulty"
                className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                onChange={(e) => hendalChange(e)}
                value={recipe.difficulty}
              >
                <option>קל</option>
                <option>בינוני</option>
                <option>קשה</option>
              </select>
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="image"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              תמונה (הכנס url)
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="image"
                id="image"
                autoComplete="organization"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => hendalChange(e)}
                value={recipe.image}
              />
            </div>
          </div>
          <Inputs props={{ recipe, setRecipe }} />
          <div>
            <label
              htmlFor="sensitivity"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              רגישויות
            </label>
            <div className="mt-2.5">
              <select
                id="sensitivity"
                name="sensitivity"
                className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                onChange={(e) => hendalChange(e)}
                value={recipe.sensitivity}
              >
                <option>ללא</option>
                <option>בוטנים</option>
                <option>גלוטן</option>
              </select>
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="instructions"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              הוראות
            </label>
            <div className="mt-2.5">
              <textarea
                name="instructions"
                id="instructions"
                rows={4}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={''}
                onChange={(e) => hendalChange(e)}
                value={recipe.instructions}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="counrty_of_origin"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              ארץ מוצא
            </label>
            <div className="mt-2.5">
              <MenuCountries props={{ recipe, setRecipe }} />
            </div>
          </div>

          <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
            <div className="flex h-6 items-center">
              <Switch
                checked={shareWithEveryone}
                onChange={setShareWithEveryone}
                className={classNames(
                  shareWithEveryone ? 'bg-indigo-600' : 'bg-gray-200',
                  'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                )}
              >
                <span className="sr-only">Agree to policies</span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    shareWithEveryone ? 'translate-x-3.5' : 'translate-x-0',
                    'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                  )}
                />
              </Switch>
            </div>
            <Switch.Label className="text-sm leading-6 text-gray-600">
              שתף את המתכון עם כולם
            </Switch.Label>
          </Switch.Group>
        </div>
      </form>
    </div>
  );
};
export default FormRecipe;
