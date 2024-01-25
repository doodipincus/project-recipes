import monument from '../maps/svg/monument.svg';
import React, { useState } from 'react';
import { fromLonLat } from 'ol/proj';
import 'ol/ol.css';
import { RMap, ROSM, RLayerVector, RFeature, RStyle, ROverlay } from 'rlayers';
import { festivalsAndFeatures } from '../../interfaces/festivals';
import MapGetLocation from './MapGetLocation';
import { formatDateTime } from '../../utils/date';

export default function MapFoodFestival({
  features,
}: {
  features: festivalsAndFeatures[];
}): JSX.Element {
  const vectorRef = React.useRef() as React.RefObject<RLayerVector>;
  const [hoveredLocation, setHoveredLocation] = useState<Boolean[]>([]);

  return (
    <RMap
      className="example-map"
      width={'400px'}
      height={'800px'}
      initial={{ center: fromLonLat([0, 0]), zoom: 4 }}
    >
      <ROSM />
      <RLayerVector ref={vectorRef}>
        <RStyle.RStyle>
          <RStyle.RIcon src={monument} />
        </RStyle.RStyle>
        {features.map((f, index) => (
          <RFeature
            key={f.feature.get('uid')}
            feature={f.feature}
            onClick={(e) => {
              console.log(e);
              if (e.map && e.target) {
                const view = e.map.getView();
                const geometry = e.target.getGeometry();
                if (view && geometry) {
                  view.fit(geometry.getExtent(), {
                    duration: 250,
                    maxZoom: 15,
                  });
                }
              }
            }}
            onPointerEnter={() => {
              setHoveredLocation((prev) => {
                const updatedArray = [...prev];
                updatedArray[index] = true;
                return updatedArray;
              });
            }}
            onPointerLeave={() => {
              setHoveredLocation((prev) => {
                const updatedArray = [...prev];
                updatedArray[index] = false;
                return updatedArray;
              });
            }}
          >
            {hoveredLocation[index] && (
              <ROverlay>
                <div className="p-4 rounded-lg shadow-md bg-gray-100">
                  <h3 className="text-lg font-bold text-center">
                    {f.festival.festival_name}
                  </h3>

                  <p className="mt-2 text-gray-600 text-center">
                    {f.festival.festival_description}
                  </p>

                  <p className="mt-2 text-gray-500 text-center text-lg">
                    {formatDateTime(f.festival.festival_date_time)}
                  </p>

                  <p className="mt-2 text-gray-500">
                    {f.festival.festival_creator_name}
                  </p>

                </div>
              </ROverlay>
            )}
          </RFeature>
        ))}
      </RLayerVector>
      <MapGetLocation />
    </RMap>

    // <div className="flex flex-col lg:flex-row">
    //   <div className="order-2 lg:order-1 lg:w-1/2">
    //     <RMap
    //       className="h-96 lg:h-full"
    //       initial={{ center: fromLonLat([0, 0]), zoom: 4 }}
    //     >      
    //     </RMap>
    //   </div>
    // </div>
  );
}
