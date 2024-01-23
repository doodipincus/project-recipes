import 'dotenv/config';
import { createFestival, deleteFestivalDal, getFestivals } from '../dal/dalFestivals';
import { FestivalsInput } from '../interface/interfacesFestivals';

// Imaginary database
export const serviceFestivals = {
    festivals: {
        getAllFestivals: async () => {
            const festivals = await getFestivals();
            if (festivals) return festivals;
            return 'recipes not found';
        },
        addFestival: async (festivalInput: FestivalsInput) => {
            const create = await createFestival(festivalInput);
            return create;
        },
        deleteFestival: async (id: string, token: string) => {
            const deleteFestival = await deleteFestivalDal(id, token);
            if (deleteFestival) return deleteFestival;
            return 'recipe not found';
        },
    }
};
