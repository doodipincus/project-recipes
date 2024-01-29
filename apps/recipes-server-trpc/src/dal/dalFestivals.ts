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
    if(festivals) return festivals;
};


export const deleteFestivalDal = async (id: string, token:string) => {
    const tokenObj = jwt.verify(
        token,
        process.env.SECRET_KEY_TOKEN as string,
      ) as JwtPayload;

    const deleteFestival = await Festival.destroy({
        where: {
            festival_id: id,
            festival_creator_email: tokenObj.email,
        },
    });
    if(deleteFestival) return true;
    return false
};