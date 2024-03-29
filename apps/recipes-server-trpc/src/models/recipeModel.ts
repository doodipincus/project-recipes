import { DataTypes, Model, Sequelize } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { sequelize } from './seqPG';
import { RecipeAttributes, RecipeBack } from '../interface/interfacesRecipes';



export const Recipe = sequelize.define<Model<RecipeBack, RecipeAttributes>>(
  'recipe',
  {
    recipe_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => uuidv4(),
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    creator_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    creator_email: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'users',
        key: 'email',
      }
    },
    sensitivity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country_of_origin: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    difficulty: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ingredients: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    instructions: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    preparation_time: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    num_reviews: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
     rating: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0,
    },
  },
  {
    tableName: 'recipes',
    schema: 'recipes_schema',
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  }
);

export const createTableRecipes = async () => {
  try {
    console.log('Creating table recipes');
    await Recipe.sync({alter:true})
  } catch (error) {
    console.error(error);
  }
}