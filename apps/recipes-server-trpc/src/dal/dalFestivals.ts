import { Festivals } from '../interface/interfacesFestivals';
import { Festival } from '../models/festivalModal';


export const createFestival = async (input: Festivals) => {
    const create = await Festival.create({
        input,
    });
    console.log('test', create);
    if (create) return create.dataValues;

};

export const getFestivals = async () => {
    const festivals = (await Festival.findAll()).map((f) => {
        return f.dataValues;
    });
    console.log(festivals);
    return festivals;
};

// export const getRecipeByCreator = async (email: string) => {
//     const recipes = (await Recipe.findAll({
//         where: {
//             creator_email: email,
//         },
//     })).map((r) => {
//         return r.dataValues;
//     })
//     if (recipes) return recipes;
//     // return user;
// };

// export const updateRecipeDal = async (id: string, update: Recipes) => {
//     const [affectedRows] = await Recipe.update(
//         {
//             update
//         },
//         {
//             where: {
//                 recipe_id: id,
//             },
//             returning: true,
//         }
//     );
//     if (affectedRows) {
//         const recipe = await Recipe.findOne({
//             where: {
//                 id: id,
//             },
//         });
//         return recipe.dataValues;
//     }
//     return false
// };

// export const deleteRecipeDal = async (id: string) => {
//     await Recipe.destroy({
//         where: {
//             id: id,
//         },
//     });
//     return true;
// };