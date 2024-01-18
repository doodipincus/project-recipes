import 'dotenv/config';
import {
  getUserByEmail,
  createUser,
  updateUserDal,
  deleteUserDal,
  getUsers,
  incrementLikes,
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
    register: async (registerInput: Register) => {
      const ifIsUser = await getUserByEmail(registerInput.email);
      if (ifIsUser) {
        return 'user is';
      }
      const register = await createUser(registerInput);
      return register;
    },
    signIn: async (signInInput: SignInInput) => {
      const signIn = await getUserByEmail(signInInput.email);
      if (signIn) {
        if (
          // decrypt(signIn.password) === decrypt(signInInput.password) ||
          (decrypt(signIn.password) === signInInput.password)
          ||
          // signIn.password === decrypt(signInInput.password) ||
          signIn.password === signInInput.password
        ) {
          return signIn;
        }
        return 'no password';
      }
      return 'user not found';
    },
    updateUser: async (input) => {
      const { email, update } = input;
      const updateUser = await updateUserDal(email, update);
      if (updateUser) return updateUser;
      return 'user not found';
    },
    deleteUser: async (email: string) => {
      const deleteUser = await deleteUserDal(email);
      if (deleteUser) return deleteUser;
      return 'user not found';
    },
    getUsers: async () => {
      const users = await getUsers();
      if (users) return users;
      return 'users not found';
    },
    getUserByEmail: async (email: string) => {
      const user = await getUserByEmail(email);
      if (user) return user;
      return 'user not found';
    },
    incrementRank: async (email: string) => {
      const increment = await incrementLikes(email);
      if (increment) return increment;
      return 'user not found';
    },
  },
  recipes: {
    addrecipe: async (recipeInput: Recipes) => {
      const create = await createRecipe(recipeInput);
      return create;
    },
    updateRecipe: async (input) => {
      const { id, update } = input;
      const updateRecipe = await updateRecipeDal(id, update);
      if (updateRecipe) return updateRecipe;
      return 'recipe not found';
    },
    getAllRecipes: async () => {
      const recipes = await getRecipes();
      if (recipes) return recipes;
      return 'recipes not found';
    },
    getRecipesByCreator: {

    },
    deleteRecipe: async (id: string) => {
      const deleteRecipe = await deleteRecipeDal(id);
      if (deleteRecipe) return deleteRecipe;
      return 'recipe not found';
    },
  },
  festivals: {
    getAllFestivals: async () => {
      const festivals = await getFestivals();
      if (festivals) return festivals;
      return 'recipes not found';
    },
    addFestival: async (festivalInput: Festivals) => {
      const create = await createFestival(festivalInput);
      return create;
    },
  }
};
