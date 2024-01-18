import { Recipes } from "../interface/interfacesRecipes";
import { Recipe } from '../models/recipeModel';


export const createRecipe = async (input: Recipes) => {
    const create = await Recipe.create({
        input,
    });
    console.log('test', create);
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

export const updateRecipeDal = async (id: string, update: Recipes) => {
    const [affectedRows] = await Recipe.update(
        {
            update
        },
        {
            where: {
                recipe_id: id,
            },
            returning: true,
        }
    );
    if (affectedRows) {
        const recipe = await Recipe.findOne({
            where: {
                id: id,
            },
        });
        return recipe.dataValues;
    }
    return false
};

export const deleteRecipeDal = async (id: string) => {
    await Recipe.destroy({
        where: {
            id: id,
        },
    });
    return true;
};