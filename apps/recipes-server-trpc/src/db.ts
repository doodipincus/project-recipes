import 'dotenv/config';
import { getUserByEmail, createUser, updatedUser, deletedUser, getUsers, incrementRank } from './models/functions';
import { Register, SignInInput } from './interface';


// Imaginary database
export const db = {
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
      const signIn = await getUserByEmail(signInInput.email)
      if (signIn){
        if(signIn.dataValues.password === signInInput.password) {         
        return signIn
        }
        return 'no password';
      } 
      return 'user not found'
    },
    updateUser: async (input) => {
      const { email, update } = input;
      const updateUser = await updatedUser(email, update);
      if (updateUser) return updateUser
      return 'user not found'
    },
    deleteUser: async (email: string) => {
      const deleteUser = await deletedUser(email);
      if (deleteUser) return deleteUser
      return 'user not found'
    },
    getUsers: async () => {
      const users = await getUsers();
      if (users) return users
      return 'users not found'
    },
    getUserByEmail: async (email: string) => {
      const user = await getUserByEmail(email);
      if (user) return user
      return 'user not found'
    },
    incrementRank: async (email: string) => {
      const increment = await incrementRank(email);
      if (increment) return increment
      return 'user not found'
    }
  },
};

