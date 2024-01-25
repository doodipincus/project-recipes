import { DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { sequelize } from './seqPG';
import { FavoriteAttributes, FavoriteBack } from '../interface/interfacesFavorites';


export const Favorite = sequelize.define<Model<FavoriteBack, FavoriteAttributes>>(
    'favorite',
    {
        favorite_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: () => uuidv4(),
        },
        recipe_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'recipes',
                key: 'recipe_id',
            }
        },
        user_email: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'users',
                key: 'email',
            }
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        stars: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    },
    {
        tableName: 'favorites',
        schema: 'recipes_schema',
        timestamps: true,
        createdAt: true,
        updatedAt: true,
    }
);

export const createTableFavorites = async () => {
    try {
        console.log('Creating table favorites');
        await Favorite.sync({ alter: true })
    } catch (error) {
        console.error(error);
    }
}