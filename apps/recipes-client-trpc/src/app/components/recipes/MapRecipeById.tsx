import React, { useState } from 'react';
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
  ROverlay,
} from 'rlayers';
import BaseEvent from 'ol/events/Event';

const locationIcon =
  'https://cdn.jsdelivr.net/npm/rlayers/examples/./svg/location.svg';

import { RMap, ROSM } from 'rlayers';

const MapRecipeById = () => {
  const [pos, setPos] = React.useState(new Point(fromLonLat([0, 0])));
  const [accuracy, setAccuracy] = React.useState(
    undefined as Geometry | undefined
  );

  return (
    //     <>
    //     <RGeolocation
    //       tracking={true}
    //       trackingOptions={{ enableHighAccuracy: true }}
    //     //   onChange={React.useCallback(
    //     //     (e: BaseEvent) => {
    //     //       const geoloc = e.target as OLGeoLoc;
    //     //       const position = geoloc.getPosition();
    //     //       const accuracyGeometry = geoloc.getAccuracyGeometry();

    //     //       if (position) {
    //     //         setPos(new Point(position));
    //     //       }

    //     //       if (accuracyGeometry) {
    //     //         setAccuracy(accuracyGeometry);
    //     //       }

    //     //       if (accuracyGeometry) {
    //     //         map.getView().fit(accuracyGeometry, {
    //     //           duration: 250,
    //     //           maxZoom: 10,
    //     //         });
    //     //       }
    //     //     },
    //     //     [map]
    //     //   )}
    //     />
    //     <RLayerVector zIndex={10}>
    //       <RStyle.RStyle>
    //         <RStyle.RIcon src={locationIcon} anchor={[0.5, 0.8]} />
    //       </RStyle.RStyle>
    //       <RFeature
    //         geometry={pos}
    //         onClick={(e) => {
    //           console.log(e);
    //           if (e.map && e.target) {
    //             const view = e.map.getView();
    //             const geometry = e.target.getGeometry();
    //             if (view && geometry) {
    //               view.fit(geometry.getExtent(), {
    //                 duration: 250,
    //                 maxZoom: 15,
    //               });
    //             }
    //           }
    //         }}
    //         // onPointerEnter={() => setHoveredLocation(true)}
    //         // onPointerLeave={() => setHoveredLocation(false)}
    //       >
    //         {/* {hoveredLocation && (
    //           <ROverlay>
    //             <div className="p-4 rounded-lg shadow-md bg-gray-100">
    //               <strong>המיקום שלך</strong>
    //             </div>
    //           </ROverlay>
    //         )} */}
    //       </RFeature>
    //       <RFeature geometry={accuracy}></RFeature>
    //     </RLayerVector>
    //   </>

    <RMap
    //   className="example-map"
      width={'400px'}
      height={'500px'}
      initial={{ center: fromLonLat([0, 0]), zoom: 4 }}
    >
      <ROSM />
    </RMap>
  );
};
export default MapRecipeById;
