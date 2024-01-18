import { Geometry, Point } from 'ol/geom';
import { Feature } from 'ol';


export interface Festivals {
    festivalId: string
    festivalName: string
    festivalDescription: string
    festivalDateTime: Date
    festivalImage: string
    festivalCreatorName: string
    festivalCreatorEmail: string
    festivalCreatorImage: string
    festivalLocation: number[]
}

export interface PropsFestival {
    features: Feature<Geometry>[];
}


export interface festivalsAndFeatures {
    festival: Festivals;
    feature: Feature<Geometry>;
}