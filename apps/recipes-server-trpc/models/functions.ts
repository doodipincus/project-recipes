import { User } from './userModel';
import { sequelize } from '../models/seqPG';


interface Register{
    user_name: string;
    email: string;
    password:string;
  }


export const createUser = async (input:Register) => {
  try {
    const test = await User.create({
      user_name: input.user_name,
      email: input.email,
      password: input.password,
    });
    return Boolean(test)
  } catch (err) {
    console.error(`Error ${err}`);
  }
};

export const getUsers = async () => {
  try {
    const users = await User.findAll();
    console.log(users);
  } catch (error) {
    console.error(error);
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const users = await User.findOne({
      where: {
        email: email,
      },
    });
    return users;
  } catch (error) {
    console.error(error);
  }
};

export const updatedUser = async () => {
  try {
    await User.update(
      { user_name: 'updated name' },
      {
        where: {
          user_name: 'test name',
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
};

export const deletedUser = async () => {
  try {
    await User.destroy({
      where: {
        user_name: 'updated name',
      },
    });
  } catch (error) {
    console.error(error);
  }
};
