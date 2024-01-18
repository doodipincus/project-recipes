import React from 'react';
import { fromLonLat } from 'ol/proj';
import { Geometry, Point } from 'ol/geom';
import { Geolocation as OLGeoLoc } from 'ol';
import 'ol/ol.css';
import {
  RLayerVector,
  RFeature,
  RGeolocation,
  RStyle,
  useOL,
  RPopup,
} from 'rlayers';
import BaseEvent from 'ol/events/Event';

const locationIcon =
  'https://cdn.jsdelivr.net/npm/rlayers/examples/./svg/location.svg';

// // let unique_id = 1;

export default function MapGetLocation(): JSX.Element {
  const [pos, setPos] = React.useState(new Point(fromLonLat([0, 0])));
  const [accuracy, setAccuracy] = React.useState(
    undefined as Geometry | undefined
  );
  // Low-level access to the OpenLayers API
  const { map } = useOL();

  return (
    <>
      <RGeolocation
        tracking={true}
        trackingOptions={{ enableHighAccuracy: true }}
        onChange={React.useCallback(
          (e: BaseEvent) => {
            const geoloc = e.target as OLGeoLoc;
            const position = geoloc.getPosition();
            const accuracyGeometry = geoloc.getAccuracyGeometry();

            if (position) {
              setPos(new Point(position));
            }

            if (accuracyGeometry) {
              setAccuracy(accuracyGeometry);
            }

            if (accuracyGeometry) {
              map.getView().fit(accuracyGeometry, {
                duration: 250,
                maxZoom: 10,
              });
            }
          },
          [map]
        )}
      />
      <RLayerVector zIndex={10}>
        <RStyle.RStyle>
          <RStyle.RIcon src={locationIcon} anchor={[0.5, 0.8]} />
        </RStyle.RStyle>
        <RFeature
          geometry={pos}
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
            {<div style={{ backgroundColor: 'white' }}>אתה נמצא כאן</div>}
          </RPopup>
        </RFeature>
        <RFeature geometry={accuracy}></RFeature>
      </RLayerVector>
    </>
  );
}
