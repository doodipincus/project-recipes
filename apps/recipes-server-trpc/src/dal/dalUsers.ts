import { Sequelize } from 'sequelize';
import { Register, Update } from '../interface/interfacesUsers';
import { User } from '../models/userModel';
import { encrypt } from '../hash';

export const createUser = async (input: Register) => {
  const test = await User.create({
    user_name: input.user_name,
    email: input.email,
    password: encrypt(input.password),
  });
  console.log('test', test);
if(test) return test.dataValues;
  
};

export const getUsers = async () => {
  const users = (await User.findAll()).map((user) => {
    return user.dataValues;
  });
  console.log(users);
  return users;
};

export const getUserByEmail = async (email: string) => {
  const user = await User.findOne({
    where: {
      email: email,
    },
  });
  if(user) return user.dataValues;
  // return user;
};

export const updateUserDal = async (email: string, update: Update) => {
  const [affectedRows] = await User.update(
    {
      user_name: update.user_name,
      email: update.email,
      password: encrypt(update.password),
    },
    {
      where: {
        email: email,
      },
      returning: true,
    }
  );
  if (affectedRows) {
    const user = await User.findOne({
      where: {
        email: update.email,
      },
    });
    return user.dataValues;
  }
  return false
};

export const deleteUserDal = async (email: string) => {
  await User.destroy({
    where: {
      email: email,
    },
  });
  return true;
};

export const incrementLikes = async (email: string) => {
  const [affectedRows] = await User.update(
    {
      likes: Sequelize.literal('rank + 1'),
    },
    {
      where: {
        email: email,
      },
      returning: true,
    }
  );
  if (affectedRows) {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    return user.dataValues;
  }
  return false
};