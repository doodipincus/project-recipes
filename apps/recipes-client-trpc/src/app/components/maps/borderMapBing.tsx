// import { MapContainer, GeoJSON } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import worldGeoJSON from './custom.geo.json';
// import { Feature, Geometry, GeoJsonObject } from 'geojson';
// // function countryStyle(feature) {
// //   return {
// //     fillColor: feature.properties.name_he === country ? 'red' : 'white',
// //     weight: 2,
// //     opacity: 1,
// //     color: 'white',
// //     dashArray: '3',
// //     fillOpacity: 0.7,
// //   };
// // }

// // function Map({ countre }) {
// //   return (
// //     <MapContainer
// //       style={{ height: '100vh', width: '100%' }}
// //       zoom={2}
// //       center={[20, 0]}
// //     >
// //       <GeoJSON style={countryStyle} data={worldGeoJSON} />
// //     </MapContainer>
// //   );
// // }

// // export default Map;

// type MyGeoJsonType = GeoJsonObject & {
//     features: Feature<Geometry, { BCR: number; BCRNAME: string; Label: string }>[];
//   };
  
//   // המרת הנתונים שלך לטיפוס החדש
// //   const geoJsonData: MyGeoJsonType = worldGeoJSON as MyGeoJsonType;
// const geoJsonData: MyGeoJsonType = worldGeoJSON as unknown as MyGeoJsonType;


// function countryStyle(country) {
//     return function(feature) {
//       return {
//         fillColor: feature.properties.name_he === country ? 'red' : 'white',
//         weight: 2,
//         opacity: 1,
//         color: 'white',
//         dashArray: '3',
//         fillOpacity: 0.7,
//       };
//     };
//   }
  
//   function Map({ country }) {
//     return (
//       <MapContainer
//         style={{ height: '100vh', width: '100%' }}
//         zoom={2}
//         center={[20, 0]}
//       >
//         <GeoJSON style={countryStyle(country)} data={geoJsonData} />
//       </MapContainer>
//     );
//   }
  
//   export default Map;
  


import React from 'react';
import { RMap, ROSM, RVector, RStyle, RFill, RStroke } from 'rlayers';
// import worldGeoJSON from './world.geo.json'; // יש להוריד קובץ geojson של מפת העולם

function countryStyle(country) {
  return function(feature) {
    return new RStyle({
      fill: new RFill({
        color: feature.get('name_he') === country ? 'red' : 'white',
      }),
      stroke: new RStroke({
        color: 'white',
        width: 2,
      }),
    });
  };
}

function Map({ country }) {
  return (
    <RMap style={{ height: '100vh', width: '100%' }} zoom={2} center={[20, 0]}>
      <ROSM />
      <RVector features={worldGeoJSON.features}>
        <RStyle.Stroke color='white' width={2} />
        <RStyle.Fill color={feature => feature.get('name_he') === country ? 'red' : 'white'} />
      </RVector>
    </RMap>
  );
}

export default Map;
