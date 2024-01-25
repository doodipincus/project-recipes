import { Sequelize } from 'sequelize';
import { Register, Update } from '../interface/interfacesUsers';
import { User } from '../models/userModel';
import jwt, { JwtPayload } from 'jsonwebtoken';


// export const createUser = async (input: Register) => {
//   const test = await User.create({
//     user_name: input.user_name,
//     email: input.email,
//     password: input.password,
//   });
//   console.log('test', test);
// if(test) return test.dataValues;

// };

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
  if (user) return user.dataValues;
  // return user;
};

export const updateUserDal = async (email: string, update: Update, token: string) => {
  const tokenObj = jwt.verify(
    token,
    process.env.SECRET_KEY_TOKEN as string,
  ) as JwtPayload;
  if (tokenObj.email === email) {

    const [affectedRows] = await User.update(
      {
        user_name: update.user_name,
        email: update.email,
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
  }
  return "אין לך הרשאה"
};

export const deleteUserDal = async (email: string, token: string) => {
  const tokenObj = jwt.verify(
    token,
    process.env.SECRET_KEY_TOKEN as string,
  ) as JwtPayload;
  if (tokenObj.email === email || tokenObj.isadmin) {

    await User.destroy({
      where: {
        email: email,
      },
    });
    return true;
  }
  return "אין לך הרשאה"

};

export const incrementLike = async (email: string) => {
  const [affectedRows] = await User.update(
    {
      reviews: Sequelize.literal('reviews + 1'),
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