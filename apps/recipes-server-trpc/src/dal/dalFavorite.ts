import { CreateFavorite } from "../interface/interfacesFavorites";
import { Favorite } from "../models/favoriteResipesModel";
import { ee } from "../router/routerFavorites";

export const createFavorite = async (input:CreateFavorite) =>{
    const create = await Favorite.create({
        recipe_id: input.recipe_id,
        user_email: input.user_email,
        user_name: input.user_name,
        stars: input.stars,
        comment: input.comment,
    })
    if (create) {
        ee.emit('add', create);
        return create.dataValues;
    }
}




export const getAllFavorites = async () => {
    const favorites = (await Favorite.findAll()).map((f) => f.dataValues);
    console.log(favorites);
    return favorites;
};


export const getFavoritesbyUser = async (email: string) => {
    const favorites = (await Favorite.findAll({
        where: {
            user_email: email
        },
        order: [['stars', 'DESC']]
    })).map((f) => {
        return f.dataValues;
    });
    console.log(favorites);
    if(favorites) return favorites;
    
};

export const getFavoritesbyUserAndRecipe = async (email: string, recipe_id: string) => {
    const favorite = (await Favorite.findOne({
        where: {
            user_email: email,
            recipe_id: recipe_id
        },
    }))
    console.log(favorite);
    if(favorite) return favorite.dataValues
};

export const getFavoritesbyRecipe = async (recipe_id: string) => {
    const reviews = (await Favorite.findAll({
        where: {
            recipe_id: recipe_id
        },
    })).map((f) => f.dataValues)
    console.log(reviews);
    if(reviews) return reviews
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