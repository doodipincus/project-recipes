import FestivalTable from './FestivalsTable';
import MapFoodFestival from './MapFoodFestival';
import AddFestivalModal from './addFestivalModal';
import { lodingAtom } from '../../utils/atoms';
import { Festivals, festivalsAndFeatures } from '../../interfaces/festivals';
import { useEffect, useState } from 'react';
import { fromLonLat } from 'ol/proj';
import { Point } from 'ol/geom';
import { Feature } from 'ol';
import 'ol/ol.css';
import { useSetAtom } from 'jotai';
import { gql, useQuery } from '@apollo/client';


export default function FoodFestivals() {
  const [features, setFeatures] = useState<festivalsAndFeatures[]>([]);
  const [festivals, setFestivals] = useState<Festivals[]>([]);
  const setLodingGlobal = useSetAtom(lodingAtom);

  const GET_ALL_FESTIVAL = gql`
    query MyQuery {
      allFestivals(orderBy: FESTIVAL_DATE_TIME_ASC) {
        nodes {
          festivalCreatorEmail
          festivalCreatorImage
          festivalCreatorName
          festivalDateTime
          festivalDescription
          festivalId
          festivalImage
          festivalLocation
          festivalName
        }
      }
    }
  `;

  const { error, data, loading } = useQuery(GET_ALL_FESTIVAL);

  useEffect(() => {
    if (error) console.log(error);
    if (data?.allFestivals.nodes) {
      console.log(data);
      console.log(data.allFestivals.nodes);

      setFestivals(data.allFestivals.nodes);
      const festivalsAndFeatures = data?.allFestivals.nodes.map(
        (f: Festivals) => {
          const [lon, lat] = f.festivalLocation;
          return {
            festival: f,
            feature: new Feature({
              geometry: new Point(fromLonLat([lon, lat])),
              name: f.festivalName,
            }),
          };
        }
      );
      setFeatures(festivalsAndFeatures);
    }
  }, [data, error]);

  useEffect(() => {
    setLodingGlobal(loading);
  }, [loading]);

  return (
    // <div className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
    <div className="relative flex flex-wrap w-full items-center overflow-hidden bg-white px-4 sm:px-6 sm:pt-8 md:p-6 lg:p-8">
      <MapFoodFestival features={features} />
      <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
        <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5"></div>
        <div className="sm:col-span-8 lg:col-span-7">
          <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
            כל הפסטיבלים
          </h2>

          <section aria-labelledby="options-heading" className="mt-10">
            <FestivalTable festivals={festivals} />
          </section>
          <AddFestivalModal />
        </div>
      </div>
    </div>
    // </div>
  );
}
