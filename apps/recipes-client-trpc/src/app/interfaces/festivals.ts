import { Geometry, Point } from 'ol/geom';
import { Feature } from 'ol';


export interface Festivals {
    festival_id: string
    festival_name: string
    festival_description: string
    festival_date_time: Date
    festival_image: string
    festival_creator_name: string
    festival_creator_email: string
    festival_location: number[]
    updatedAt: string
}

export interface PropsFestival {
    features: Feature<Geometry>[];
}


export interface festivalsAndFeatures {
    festival: FestivalBack;
    feature: Feature<Geometry>;
}


export interface FestivalAttributes {
    festival_id: string;
    festival_name: string;
    festival_description: string;
    festival_date_time: string;
    festival_image: string;
    festival_creator_name:string
    festival_creator_email: string;
    festival_location: number[];
  }
  
  interface FestivalInstance {
    createdAt?: string;
    updatedAt?: string;
  }
  
  
  export interface FestivalBack extends FestivalInstance, FestivalAttributes { }