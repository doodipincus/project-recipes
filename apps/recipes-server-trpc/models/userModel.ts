import { DataTypes, Sequelize } from 'sequelize';
import { sequelize } from './seqPG';
import { v4 as uuidv4 } from 'uuid';


export const User = sequelize.define(
  'Users',
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
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("now")
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("now")
    },
  },
  {
    tableName: 'Users',
    schema: 'recipes_schema'
  }
);

export const createTable = async ()=>{
  try {
    console.log('Creating table');
    
    await User.sync()
  } catch (error) {
    console.error(error);
  }
}