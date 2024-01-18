import 'dotenv/config';
import { createFestival, getFestivals } from '../dal/dalFestivals';
import { Festivals } from '../interface/interfacesFestivals';

// Imaginary database
export const serviceUsers = {
    festivals: {
        getAllFestivals: async () => {
            const festivals = await getFestivals();
            if (festivals) return festivals;
            return 'recipes not found';
        },
        addFestival: async (festivalInput: Festivals) => {
            const create = await createFestival(festivalInput);
            return create;
        },
    }
};
