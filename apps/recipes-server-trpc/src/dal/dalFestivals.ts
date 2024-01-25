import { FestivalsInput } from '../interface/interfacesFestivals';
import { Festival } from '../models/festivalModal';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ee } from '../router/routerFestivals';


export const createFestival = async (input: FestivalsInput) => {
    const create = await Festival.create({
        festival_name: input.festivalName,
        festival_description: input.festivalDescription,
        festival_date_time: input.festivalDateTime,
        festival_image: input.festivalImage,
        festival_creator_name: input.festivalCreatorName,
        festival_creator_email: input.festivalCreatorEmail,
        festival_location: input.festivalLocation,
    });
    if (create) {
        ee.emit('add', create);
        return create.dataValues;
    }

};

export const getFestivals = async () => {
    const festivals = (await Festival.findAll({order:['festival_date_time']})).map((f) => {
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

export const deleteFestivalDal = async (id: string, token:string) => {
    const tokenObj = jwt.verify(
        token,
        process.env.SECRET_KEY_TOKEN as string,
      ) as JwtPayload;
    await Festival.destroy({
        where: {
            festival_id: id,
            festival_creator_email: tokenObj.email,
        },
    });
    return true;
};