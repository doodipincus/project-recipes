import FestivalTable from './FestivalsTable';
import MapFoodFestival from './MapFoodFestival';
import AddFestivalModal from './addFestivalModal';
import { loadingAtom } from '../../utils/atoms';
import { FestivalBack, festivalsAndFeatures } from '../../interfaces/festivals';
import { useEffect, useState } from 'react';
import { fromLonLat } from 'ol/proj';
import { Point } from 'ol/geom';
import { Feature } from 'ol';
import 'ol/ol.css';
import { useSetAtom } from 'jotai';
import { trpc } from '../../utils/trpc';
import CardFestival from './CardFestival';

export default function FoodFestivals() {
  const [features, setFeatures] = useState<festivalsAndFeatures[]>([]);
  const [festivals, setFestivals] = useState<FestivalBack[]>([]);
  const setLoadingGlobal = useSetAtom(loadingAtom);
  const [errorFromServer, setErrorFromServer] = useState<string>('');

  const addFeatureIntoFestivals = (res: FestivalBack[]) => {
    console.log('addFeatureIntoFest', res);

    const festivalsAndFeatures = res.map((f: FestivalBack) => {
      const [lon, lat] = f.festival_location;
      return {
        festival: f,
        feature: new Feature({
          geometry: new Point(fromLonLat([lon, lat])),
          name: f.festival_name,
        }),
      };
    });
    setFeatures(festivalsAndFeatures);
  };

  const getFestivals = async () => {
    try {
      setLoadingGlobal(true);
      const res = await trpc.festivals.getFestivals.query();
      if (res?.length && typeof res !== 'string') {
        console.log('festivals', res);
        setFestivals(res);
        setLoadingGlobal(false);
        addFeatureIntoFestivals(res);
      }
      if (res && typeof res === 'string') {
        setLoadingGlobal(false);
        setErrorFromServer(res);
      }
    } catch (error) {
      console.error(error);
      setLoadingGlobal(false);
    }
  };

  const subscribeToRecipes = async () => {
    try {
      await trpc.festivals.onAdd.subscribe(undefined, {
        onData: (data) => {
          setFestivals((prev) => [...prev, data]);
          // addFeatureIntoFestivals();
          const [lon, lat] = data.festival_location;
          setFeatures((prev) => [
            ...prev,
            {
              festival: data,
              feature: new Feature({
                geometry: new Point(fromLonLat([lon, lat])),
                name: data.festival_name,
              }),
            },
          ]);
        },
        onError: (err) => {
          console.error('Subscription error:', err);
        },
      });
    } catch (err) {
      console.error('Error subscribing to messages:', err);
    }
  };

  useEffect(() => {
    if (!festivals.length) {
      getFestivals();
    }
    subscribeToRecipes();
  }, []);
  useEffect(() => {
    console.log('fes', festivals);
    console.log('fua', features);
  }, [festivals, features]);

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="bg-gray-100 lg:w-1/3 lg:h-full">
        <MapFoodFestival features={features} />
      </div>

      <div className="w-full px-4 lg:w-2/3">
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {festivals.map((festival) => (
            <CardFestival key={festival.festival_id} festival={festival} />
          ))}
        </div>

        <AddFestivalModal />
      </div>
    </div>
  );
}
