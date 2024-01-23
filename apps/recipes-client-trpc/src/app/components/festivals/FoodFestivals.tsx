import FestivalTable from './FestivalsTable';
import MapFoodFestival from './MapFoodFestival';
import AddFestivalModal from './addFestivalModal';
import { lodingAtom } from '../../utils/atoms';
import { FestivalBack, festivalsAndFeatures } from '../../interfaces/festivals';
import { useEffect, useState } from 'react';
import { fromLonLat } from 'ol/proj';
import { Point } from 'ol/geom';
import { Feature } from 'ol';
import 'ol/ol.css';
import { useAtom, useSetAtom } from 'jotai';
import { trpc } from '../../utils/trpc';


export default function FoodFestivals() {
  const [features, setFeatures] = useState<festivalsAndFeatures[]>([]);
  const [festivals, setFestivals] = useState<FestivalBack[]>([]);
  const setLodingGlobal = useSetAtom(lodingAtom);
  const [loading, setLoading] = useAtom(lodingAtom);



  const getFestivals = async () =>{
    try {
      setLoading(true);
      const res = await trpc.festivals.getFestivals.query();
      if (res?.length && typeof res !== 'string') {
        console.log('festivals',res);
        setFestivals(res);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(()=>{
    getFestivals()
  },[])

  useEffect(()=>{
    if(festivals.length)
    console.log(typeof festivals[0].festival_date_time);
    const festivalsAndFeatures = festivals.map(
            (f: FestivalBack) => {
              const [lon, lat] = f.festival_location;
              return {
                festival: f,
                feature: new Feature({
                  geometry: new Point(fromLonLat([lon, lat])),
                  name: f.festival_name,
                }),
              };
            }
          );
          setFeatures(festivalsAndFeatures);
    setLoading(false);
  },[festivals])
  
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
            {!loading && <FestivalTable festivals={festivals} />}
          </section>
          <AddFestivalModal />
        </div>
      </div>
    </div>
    // </div>
  );
}
