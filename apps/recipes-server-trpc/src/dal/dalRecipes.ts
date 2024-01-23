import { AddRecipes, Recipes } from "../interface/interfacesRecipes";
import { Recipe } from '../models/recipeModel';
import jwt, { JwtPayload } from 'jsonwebtoken';


export const createRecipe = async (input: AddRecipes) => {
    const create = await Recipe.create({
        title: input.title,
        category: input.category,
        image: input.image,
        creator_name: input.creator_name,
        creator_email: input.creator_email,
        sensitivity: input.sensitivity,
        country_of_origin: input.country_of_origin,
        difficulty: input.difficulty,
        ingredients: input.ingredients,
        instructions: input.instructions,
        preparation_time: input.preparation_time,
    });
    if (create) return create.dataValues;
};

export const getRecipes = async () => {
    const recipes = (await Recipe.findAll()).map((r) => {
        return r.dataValues;
    });
    console.log(recipes);
    return recipes;
};

export const getRecipeByCreator = async (email: string) => {
    const recipes = (await Recipe.findAll({
        where: {
            creator_email: email,
        },
    })).map((r) => {
        return r.dataValues;
    })
    if (recipes) return recipes;
    // return user;
};

export const updateRecipeDal = async (id: string, update: Recipes, token: string) => {
    const tokenObj = jwt.verify(
        token,
        process.env.SECRET_KEY_TOKEN as string,
    ) as JwtPayload;

    const [affectedRows] = await Recipe.update(
        {
            title: update.title,
            category: update.category,
            image: update.image,
            creator_name: update.creator_name,
            creator_email: update.creator_email,
            sensitivity: update.sensitivity,
            country_of_origin: update.country_of_origin,
            difficulty: update.difficulty,
            ingredients: update.ingredients,
            instructions: update.instructions,
            preparation_time: update.preparation_time,
        },
        {
            where: {
                recipe_id: id,
                creator_email: tokenObj.email,
            },
            returning: true,
        }
    );
    if (affectedRows) {
        const recipe = await Recipe.findOne({
            where: {
                recipe_id: id,
            },
        });
        return recipe.dataValues;
    }
    return false
};

export const deleteRecipeDal = async (id: string, token: string) => {
    const tokenObj = jwt.verify(
        token,
        process.env.SECRET_KEY_TOKEN as string,
    ) as JwtPayload;

    await Recipe.destroy({
        where: {
            recipe_id: id,
            creator_email: tokenObj.email,
        },
    });
    return true;
};