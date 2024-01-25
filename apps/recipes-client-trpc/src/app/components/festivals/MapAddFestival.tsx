import React, { useState } from 'react';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Point } from 'ol/geom';
import { Feature } from 'ol';
import 'ol/ol.css';
import monument from '../maps/svg/monument.svg';
import { RMap, ROSM, RLayerVector, RStyle, RFeature, RPopup } from 'rlayers';
import { useAtom } from 'jotai';
import { newFestivalAtom } from '../../utils/atoms';

const locationIcon =
  'https://cdn.jsdelivr.net/npm/rlayers/examples/./svg/location.svg';

// let unique_id = 1;

export default function MapAddFestival(): JSX.Element {
  const [newFeature, setNewFeature] = useState<Feature<Point>>();
  const [newFestival, setNewFestival] = useAtom(newFestivalAtom);
  const vectorRef = React.useRef() as React.RefObject<RLayerVector>;

  return (
    <RMap
      className="example-map"
      width={'400px'}
      height={'400px'}
      initial={{ center: fromLonLat([34.8291072, 32.0864256]), zoom: 9 }}
      onClick={(e) => {
        const coords = e.map.getCoordinateFromPixel(e.pixel);

        const f = new Feature({ geometry: new Point(coords) });
        console.log(toLonLat(coords));
        setNewFestival({ ...newFestival, festivalLocation: toLonLat(coords) });
        setNewFeature(f);
      }}
    >
      <ROSM />

      <RLayerVector ref={vectorRef}>
        <RStyle.RStyle>
          <RStyle.RIcon src={monument} />
        </RStyle.RStyle>
        {newFeature && (
          <RFeature key={newFeature.get('uid')} feature={newFeature}>
            <RPopup trigger="hover" positioning="bottom-center">
              <div style={{ backgroundColor: 'white' }}>הוספת עכשיו</div>
            </RPopup>
          </RFeature>
        )}
      </RLayerVector>
      <RLayerVector ref={vectorRef}>
        <RStyle.RStyle>
          <RStyle.RIcon src={locationIcon} />
        </RStyle.RStyle>
        <RFeature
          feature={
            new Feature({
              geometry: new Point(fromLonLat([34.8291072, 32.0864256])),
              name: 'hear',
            })
          }
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
        ></RFeature>
      </RLayerVector>
    </RMap>
  );
}
