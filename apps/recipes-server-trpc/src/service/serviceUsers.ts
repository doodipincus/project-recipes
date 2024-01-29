import 'dotenv/config';
import {
  // getUserByEmail,
  // createUser,
  updateUserDal,
  deleteUserDal,
  getUsers,
  incrementLike,
  getUserByEmail,
} from '../dal/dalUsers';
import { Register, SignInInput } from '../interface/interfacesUsers';
import { decrypt } from '../hash';
import { createRecipe, deleteRecipeDal, getRecipes, updateRecipeDal } from '../dal/dalRecipes';
import { Recipes } from '../interface/interfacesRecipes';
import { createFestival, getFestivals } from '../dal/dalFestivals';
import { Festivals } from '../interface/interfacesFestivals';

// Imaginary database
export const serviceUsers = {
  users: {
    // register: async (registerInput: Register) => {
    //   const ifIsUser = await getUserByEmail(registerInput.email);
    //   if (ifIsUser) {
    //     return 'user is';
    //   }
    //   const register = await createUser(registerInput);
    //   return register;
    // },
    // signIn: async (signInInput: SignInInput) => {
    //   const signIn = await getUserByEmail(signInInput.email);
    //   if (signIn) {
    //     if (
    //       // decrypt(signIn.password) === decrypt(signInInput.password) ||
    //       (decrypt(signIn.password) === signInInput.password)
    //       ||
    //       // signIn.password === decrypt(signInInput.password) ||
    //       signIn.password === signInInput.password
    //     ) {
    //       return signIn;
    //     }
    //     return 'no password';
    //   }
    //   return 'user not found';
    // },
    updateUser: async (input, token:string) => {
      const { email, update } = input;
      const updateUser = await updateUserDal(email, update, token);
      if (updateUser) return updateUser;
      return 'כתובת אימייל לא נכונה';
    },
    deleteUser: async (email: string, token:string) => {
      const deleteUser = await deleteUserDal(email, token);
      if (deleteUser) return deleteUser;
      return 'כתובת אימייל לא נכונה';
    },
    getUsers: async () => {
      const users = await getUsers();
      if (users.length) return users;
      return 'אין משתמשים במאגר';
    },
    getUserByEmail: async (email: string) => {
      const user = await getUserByEmail(email);
      if (user) return user;
      return 'user not found';
    },
    incrementLike: async (email: string) => {
      const increment = await incrementLike(email);
      if (increment) return increment;
      return 'כתובת אימייל לא נכונה';
    },
  },
};
