import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
// import './index.css'
// import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
// import { PixiOverlay } from 'react-leaflet-pixi-overlay';
import * as polygonData from './data.json';

export default function MapOverComponent() {
  // const [display, setDisplay]=useState(false);
  // const [options, setOptions]=useState([]);
  // const [search, setSearch]= useState("");

  //function to show popup when hover
  //   const onEachContry = (feature, layer) =>{
  //     const contryName = feature.properties.NAME_1;
  //     layer.on('mouseover', function (e) {
  //       layer.bindPopup(contryName)
  //     });
  //   }

  const onEachContry = (feature, layer) => {
    const contryName = feature.properties.NAME_1;
    layer.on('mouseover', function (e) {
      layer.bindPopup(contryName).openPopup(); // here add openPopup()
    });
  };

  return (
    <MapContainer center={[10.7743, 106.6669] } zoom={5} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <GeoJSON
          data={polygonData.features}
          onEachFeature={onEachContry}
       /> */}
       
      <Marker position={[10.7743, 106.6669]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}
