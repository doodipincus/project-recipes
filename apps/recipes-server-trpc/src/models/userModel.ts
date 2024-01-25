import { DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { sequelize } from './seqPG';
import { Model } from 'sequelize';
import { UserAttributes, UserBack } from '../interface/interfacesUsers';


export const User = sequelize.define<Model<UserBack, UserAttributes>>(
  'users',
  {
    user_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => uuidv4(),
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reviews: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    shared: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: 'users',
    schema: 'recipes_schema',
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  },
);

export const createTableUsers = async () => {
  try {
    console.log('Creating table users');
    await User.sync({ alter: true })
  } catch (error) {
    console.error(error);
  }
}