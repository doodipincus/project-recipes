import { Favorite } from "../models/favoriteResipesModel";



export const getAllFavorites = async () => {
    const festivals = (await Favorite.findAll()).map((f) => f.dataValues);
    console.log(festivals);
    return festivals;
};


export const getFavoritesbyUser = async (email: string) => {
    const festivals = (await Favorite.findAll({
        where: {
            user_email: email
        },
        order: [['stars', 'DESC']]
    })).map((f) => {
        return f.dataValues;
    });
    console.log(festivals);
    return festivals;
};

export const getFavoritesbyUserAndRecipe = async (email: string, recipe_id: string) => {
    const festival = (await Favorite.findOne({
        where: {
            user_email: email,
            recipe_id: recipe_id
        },
    }))
    console.log(festival);
    return festival.dataValues
};

export const getFavoritesbyRecipe = async (recipe_id: string) => {
    const reviews = (await Favorite.findAll({
        where: {
            recipe_id: recipe_id
        },
    })).map((f) => f.dataValues)
    console.log(reviews);
    return reviews
};


export const deleteFavoriteDal = async (favorite_id: string) => {
    const deleteFavorite = (await Favorite.destroy({
        where: {
            favorite_id
        },
    }))
    console.log(deleteFavorite);
    if(deleteFavorite) return true
    return false
};