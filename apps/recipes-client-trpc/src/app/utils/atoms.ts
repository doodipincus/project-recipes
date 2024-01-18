import { atom } from 'jotai';
import { Recipes } from '../interfaces/recipes';

export const registerAtom = atom({
  user_name: '',
  email: '',
  password: '',
  confirm_password: '',
});

export const signInAtom = atom({ email: '', password: '' });

export const allRecipesAtom = atom<Recipes[]>([]);

export const modalRegisterAtom = atom(false);

export const lodingAtom = atom(false);

export const userIsLoggedInAtom = atom(false);


type User = {
  email: string;
  password: string;
  user_id: string;
  user_name: string;
  isAdmin: boolean;
  likes: number;
  shared: number;
  createdAt: string | undefined;
  updatedAt: string | undefined;
};
export const userAtom = atom<Partial<User>>({})

export const resetUserAtom = atom<Partial<User>>({})

type Location = number[];

export const newFestivalAtom = atom({
  festivalName: '',
  festivalDescription: '',
  festivalDateTime: new Date(),
  festivalImage: '',
  festivalCreatorName: '',
  festivalCreatorEmail: '',
  festivalCreatorImage: '',
  festivalLocation: <Partial<Location>>[],
});
