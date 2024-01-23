import monument from '../maps/svg/monument.svg';
import React from 'react';
import { fromLonLat } from 'ol/proj';
import 'ol/ol.css';
import { RMap, ROSM, RLayerVector, RFeature, RStyle, RPopup } from 'rlayers';
import { festivalsAndFeatures } from '../../interfaces/festivals';
import MapGetLocation from './MapGetLocation';
import { formatDateTime } from '../../utils/date';



export default function MapFoodFestival({
  features,
}: {
  features: festivalsAndFeatures[];
}): JSX.Element {
  const vectorRef = React.useRef() as React.RefObject<RLayerVector>;

  return (
    <RMap
      className="example-map"
      width={'400px'}
      height={'400px'}
      initial={{ center: fromLonLat([0, 0]), zoom: 4 }}
    >
      <ROSM />
      <RLayerVector ref={vectorRef}>
        <RStyle.RStyle>
          <RStyle.RIcon src={monument} />
        </RStyle.RStyle>
        {features.map((f) => (
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
          >
            <RPopup trigger="hover" positioning="bottom-center">
              {
                <div style={{ backgroundColor: 'white' }}>
                  <p>{f.festival.festival_name}</p>
                  <p>{f.festival.festival_description}</p>
                  <p>{f.festival.festival_creator_name}</p>
                  <p>{f.festival.festival_creator_email}</p>
                  <p>{formatDateTime(f.festival.festival_date_time)}</p>
                </div>
              }
            </RPopup>
          </RFeature>
        ))}
      </RLayerVector>
      <MapGetLocation />
    </RMap>
  );
}
