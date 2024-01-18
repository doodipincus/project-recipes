import React, { useState, useEffect } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';

import { Point } from 'ol/geom';
import { Feature } from 'ol';
import { Coordinate } from 'ol/coordinate';
import 'ol/ol.css';
// import MapOverComponent from './overReact';
// import { useMap } from 'openlayers';

import monument from './svg/monument.svg';
import { RMap, ROSM, RLayerVector, RStyle, RFeature, RPopup } from 'rlayers';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';

export const coords: Record<string, Coordinate> = {
  'Arc de Triomphe': [2.295, 48.8737],
  "Place d'Italie": [2.355, 48.831],
  Bastille: [2.369, 48.853],
  'Tour Eiffel': [2.294, 48.858],
  Montmartre: [2.342, 48.887],
};

let unique_id = 1;

function MapComponent() {
  const [map, setMap] = useState(new Map());

  const [features, setFeatures] = useState(() =>
    Object.keys(coords).map((f) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat(coords[f])),
        name: f,
        uid: unique_id++,
      });
      feature.setStyle(
        new Style({
          image: new Icon({
            src: monument,
          }),
        })
      );
      return feature;
    })
  );

  const [newFeature, setNewFeature] = useState<Feature<Point>>();
  const vectorRef = React.useRef() as React.RefObject<RLayerVector>;

  // Initialize map on first render - logic formerly put into componentDidMount
  useEffect(() => {
    // Create and initialize map
    const initialMap = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 8,
      }),
    });

    setMap(initialMap);
  }, []);


  const updateLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      const coords = fromLonLat([
        position.coords.longitude,
        position.coords.latitude,
      ]);
      console.log(position.coords);
      
      map.getView().animate({ center: coords, duration: 2000 });
    });
  };

  const addToMap = (feature) => {
    // Create a vector source and add the marker to it
    const vectorSource = new VectorSource({
      features: [feature],
    });

    // Create a vector layer and add it to the map
    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });
    map.addLayer(vectorLayer);
    return vectorLayer
  };


  features.forEach((feature) => {
    addToMap(feature);
  });

  useEffect(()=>{

  },[])

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '360px' }}></div>
      <button onClick={updateLocation}>Update Location</button>
    </div>
  );
}

export default MapComponent;
