import { Sequelize } from 'sequelize';
import { Register, Update } from '../interface';
import { User } from './userModel';


export const createUser = async (input: Register) => {
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
    return users;
  } catch (error) {
    console.error(error);
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    return user;
  } catch (error) {
    console.error(error);
  }
};

export const updatedUser = async (email: string, update: Update) => {
  try {
    const [affectedRows] = await User.update(
      {
        user_name: update.user_name,
        // email: update.email,
        email: email,
        password: update.password,
      },
      {
        where: {
          email: email,
        },
        returning: true

      }
    );
    return affectedRows;
    // return update      לבדוק איך אפשר להחזיר את האובייקט המעודכן
    // return Boolean(true)
  } catch (error) {
    console.error(error);
  }
};

export const deletedUser = async (email: string) => {
  try {
    await User.destroy({
      where: {
        email: email,
      },
    });
    return Boolean(true)
  } catch (error) {
    console.error(error);
  }
};

export const incrementRank = async (email: string) => {
  try {
    const [affectedRows] = await User.update(
      {
        rank: Sequelize.literal('rank + 1'),
      },
      {
        where: {
          email: email,
        },
        returning: true
      }
    );
    return affectedRows
  } catch (error) {
    console.error(error);
  }
}