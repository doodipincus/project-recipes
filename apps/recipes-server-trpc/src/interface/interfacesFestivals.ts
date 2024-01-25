export interface Festivals {
    festivalId: string
    festivalName: string
    festivalDescription: string
    festivalDateTime: Date
    festivalImage: string
    festivalCreatorName: string
    festivalCreatorEmail: string
    festivalLocation: number[]
}

export interface FestivalsInput {
    festivalName: string
    festivalDescription: string
    festivalDateTime: Date
    festivalImage: string
    festivalCreatorName: string
    festivalCreatorEmail: string
    festivalLocation: number[]
}



export interface FestivalAttributes {
    festival_id: string;
    festival_name: string;
    festival_description: string;
    festival_date_time: Date;
    festival_image: string;
    festival_creator_name: string
    festival_creator_email: string;
    festival_location: number[];
}

interface FestivalInstance {
    createdAt?: Date;
    updatedAt?: Date;
}


export interface FestivalBack extends FestivalInstance, FestivalAttributes { }