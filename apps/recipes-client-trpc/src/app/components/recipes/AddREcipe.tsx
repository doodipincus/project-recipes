import { useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useAtom, useSetAtom } from 'jotai';
import { lodingAtom, userAtom } from '../../utils/atoms';
import { Recipes } from '../../interfaces/recipes';
import FormRecipe from './FormRecipe';
import Loading from '../loading/Loading';


export default function AddRecipe() {
  const [user] = useAtom(userAtom);
  const [newRecipe, setNewRecipe] = useState<Partial<Recipes>>({});
  const setLodingGlobal = useSetAtom(lodingAtom);

  
  const ADD_RECIPE = gql`
    mutation MyMutation($input: CreateRecipeInput!) {
      createRecipe(input: $input) {
        clientMutationId
      }
    }
  `;

  const [addRecipe, { error, data, loading }] = useMutation(ADD_RECIPE);

  const addCrator = () => {
    setNewRecipe({
      ...newRecipe,
      creatorName: user.user_name,
      creatorEmail: user.email,
    });
  };
  console.log(newRecipe);

  useEffect(() => {
    addCrator();
  }, []);

  useEffect(() => {
    setLodingGlobal(loading)
  }, [loading]);

  
  const send = () => {
    console.log(newRecipe);
    if (newRecipe.creatorEmail) {
      addRecipe({
        variables: {
          input: {
            clientMutationId: 'dudi',
            recipe: newRecipe,
          },
        },
      });
    }
  };

  useEffect(() => {
    if (data) console.log('data', data);
    if (error) console.log('error', error);
  }, [data, error]);

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <FormRecipe props={{ recipe: newRecipe, setRecipe: setNewRecipe }} />
      <div className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div
          className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={send}
        >
          שלח מתכון
        </div>
      </div>
    </div>
  );
}
