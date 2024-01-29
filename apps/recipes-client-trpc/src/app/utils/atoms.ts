import { atom } from 'jotai';
import { RecipeBack, Recipes } from '../interfaces/recipes';

export const registerAtom = atom({
  userName: '',
  email: '',
  password: '',
  confirmPassword: '',
});

export const signInAtom = atom({ email: '', password: '' });

export const allRecipesAtom = atom<RecipeBack[]>([]);

export const modalRegisterAtom = atom<boolean>(false);

export const loadingAtom = atom(false);

export const userIsLoggedInAtom = atom(false);

export const openReviews = atom(false);


type User = {
  email: string;
  password: string;
  userId: string;
  userName: string;
  isAdmin: boolean;
  reviews: number;
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
  festivalDateTime: '',
  festivalCreatorName: '',
  festivalCreatorEmail: '',
  festivalImage: '',
  festivalLocation: <Location>[],
});

