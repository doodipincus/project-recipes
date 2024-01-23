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
