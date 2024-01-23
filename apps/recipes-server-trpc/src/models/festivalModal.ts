import { DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { sequelize } from './seqPG';



export interface FestivalAttributes {
    festival_id: string;
    festival_name: string;
    festival_description: string;
    festival_date_time: Date;
    festival_image: string;
    festival_creator_name: string
    festival_creator_email: string;
    festival_location: number[];
}

interface FestivalInstance {
    createdAt?: Date;
    updatedAt?: Date;
}


interface FestivalBack extends FestivalInstance, FestivalAttributes { }



export const Festival = sequelize.define<Model<FestivalBack, FestivalAttributes>>(
    'festival',
    {
        festival_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: () => uuidv4(),
        },
        festival_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        festival_description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        festival_date_time: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        festival_image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        festival_creator_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        festival_creator_email: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'users',
                key: 'email',
            }
        },
        festival_location: {
            type: DataTypes.ARRAY(DataTypes.DOUBLE),
            allowNull: false,
        },
    },
    {
        tableName: 'festivals',
        schema: 'recipes_schema',
        timestamps: true,
        createdAt: true,
        updatedAt: true,
    }
);

export const createTableFestivals = async () => {
    try {
        console.log('Creating table festivals');
        await Festival.sync({ alter: true })
    } catch (error) {
        console.error(error);
    }
}