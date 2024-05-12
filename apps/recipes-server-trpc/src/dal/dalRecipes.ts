import { AddRecipes, Recipes } from "../interface/interfacesRecipes";
import { Recipe } from '../models/recipeModel';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ee } from "../router/routerRecipes";
import { Sequelize } from "sequelize";
import { User } from "../models/userModel";
import { sequelize } from "../models/seqPG";
import { Favorite } from "../models/favoriteResipesModel";
import { createFavorite } from "./dalFavorite";


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
    if (create) {
        ee.emit('add', create);
        return create.dataValues;
    }
};

export const getRecipes = async () => {
    const recipes = (await Recipe.findAll({ order: [['rating', 'DESC']] })).map((r) => {
        return r.dataValues;
    });
    console.log(recipes);
    if (recipes) return recipes;
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

    const deleteRecipe = await Recipe.destroy({
        where: {
            recipe_id: id,
            creator_email: tokenObj.email,
        },
    });
    if (deleteRecipe) return true;
    return false;
};


export const addRatingDal = async (id: string, email: string, user_name: string, newRating: number, comment: string) => {
    const favorite = await Favorite.findOne({
        where: {
            recipe_id: id,
            user_email: email,
        },
    })
    if (!favorite) {
        const [affectedRows] = await Recipe.update(
            {
                num_reviews: Sequelize.literal("num_reviews + 1"),
                rating: Sequelize.literal(`(rating * num_reviews + ${newRating}) / ( num_reviews + 1)`),
            },
            {
                where: {
                    recipe_id: id,
                },
                returning: true,
            }
        );
        if (affectedRows) {
            await User.update(
                {
                    reviews: sequelize.literal("reviews + 1"),
                },
                {
                    where: {
                        email: email,
                    }
                }
            )
            const create = await createFavorite({
                recipe_id: id,
                user_email: email,
                user_name: user_name,
                stars: newRating,
                comment: comment,
            })
            if (create) return create;

        }
    } else {
        const [affectedRows] = await Recipe.update(
            {
                rating: Sequelize.literal(`(rating * num_reviews - ${favorite.dataValues.stars} + ${newRating}) / num_reviews`),
            },
            {
                where: {
                    recipe_id: id,
                },
                returning: true,
            }
        );
        if (affectedRows) {
            const update = await Favorite.update({
                stars: newRating,
                comment: comment,
            }, {
                where: {
                    recipe_id: id,
                    user_email: email,
                }
            })
            // if (update) 
        }
        return true;
    }
};