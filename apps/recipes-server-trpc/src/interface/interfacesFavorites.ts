export interface FavoriteAttributes {
    favorite_id: string;
    recipe_id: string;
    user_email: string;
    user_name: string;
    stars: number;
    comment: string;
}

interface FavoriteInstance {
    createdAt?: Date;
    updatedAt?: Date;
}


export interface FavoriteBack extends FavoriteInstance, FavoriteAttributes { }


export interface CreateFavorite{
    recipe_id: string,
    user_email: string,
    user_name: string,
    stars: number,
    comment: string,
}