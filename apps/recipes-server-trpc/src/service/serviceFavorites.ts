import 'dotenv/config';
import { createFestival, deleteFestivalDal, getFestivals } from '../dal/dalFestivals';
import { FestivalsInput } from '../interface/interfacesFestivals';
import { deleteFavoriteDal, getAllFavorites, getFavoritesbyRecipe, getFavoritesbyUser, getFavoritesbyUserAndRecipe } from '../dal/dalFavorite';

// Imaginary database
export const serviceFavorites = {
    favorites: {
        getAllFavorites: async () => {
            const allFavorites = await getAllFavorites();
            if (allFavorites) return allFavorites;
            return 'אין מתכונים במאגר';
        },
        getFavoritesbyUser: async (email: string) => {
            const favorites = await getFavoritesbyUser(email);
            if (favorites) return favorites;
            return 'אין מתכונים אהובים למשתמש זה'
        },
        getFavoritesbyUserAndRecipe: async (email: string, recipe_id: string) => {
            const favorite = await getFavoritesbyUserAndRecipe(email, recipe_id);
            if (favorite) return favorite;
            return 'המשתמש לא אהב את המתכון'
        },
        getFavoritesbyRecipe: async (recipe_id: string) => {
            const reviews = await getFavoritesbyRecipe(recipe_id);
            if (reviews) return reviews;
            return 'אין דירוגים למתכון זה'
        },
        deleteFavorite: async (id: string) => {
            const deleteRecipe = await deleteFavoriteDal(id)
            if (deleteRecipe) return deleteRecipe;
            return 'הדירוג לא נמצא';
        },
    }
};
