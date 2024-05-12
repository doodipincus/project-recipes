import React, { useEffect, useState } from 'react';
import { fromLonLat } from 'ol/proj';
import { Geometry, Point } from 'ol/geom';
import { Feature, Geolocation as OLGeoLoc } from 'ol';
import 'ol/ol.css';
import {
  RLayerVector,
  RFeature,
  RGeolocation,
  RStyle,
  useOL,
  ROverlay,
} from 'rlayers';
import BaseEvent from 'ol/events/Event';
import { RMap, ROSM } from 'rlayers';
import axios from 'axios';

const locationIcon =
  'https://cdn.jsdelivr.net/npm/rlayers/examples/./svg/location.svg';

const MapRecipeById = ({ country }: { country: string | undefined }) => {
  const [pos, setPos] = React.useState(new Point(fromLonLat([0, 0])));
  const [accuracy, setAccuracy] = React.useState(
    undefined as Geometry | undefined
  );
  const [hoveredLocation, setHoveredLocation] = useState(false);
  const [coords, setCoords] = useState({ lon: null, lat: null });
  const [hoveredCountry, setHoveredCountry] = useState(false);
  const [feature, setFeature] = useState<Feature<Point>>();

  const apiKey = '65acdf810add7069166591gncf84855';

  const convertAddressToCord = async (address: string) => {
    // console.log('address:', address);
    const cord = await axios(
      `https://geocode.maps.co/search?q=${address}&api_key=${apiKey}`
    );
    setCoords({ lon: cord.data[0].lon, lat: cord.data[0].lat });
  };

  const { map } = useOL();

  useEffect(() => {
    if (coords.lat && coords.lon) {
      setFeature(
        new Feature({
          geometry: new Point(fromLonLat([coords.lon, coords.lat])),
        })
      );
    }
    if (country) convertAddressToCord(country);
  }, [coords, country]);

  return (
    <RMap
      width={'400px'}
      height={'600px'}
      initial={{ center: fromLonLat([0, 0]), zoom: 2 }}
    >
      <ROSM />
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
        {feature && (
          <RFeature
            feature={feature}
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
              setHoveredCountry(true);
            }}
            onPointerLeave={() => {
              setHoveredCountry(false);
            }}
          >
            {hoveredCountry && (
              <ROverlay>
                <div className="p-4 rounded-lg shadow-md bg-gray-100">
                  <h3 className="text-lg font-bold text-center">{country}</h3>
                </div>
              </ROverlay>
            )}
          </RFeature>
        )}

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
          onPointerEnter={() => setHoveredLocation(true)}
          onPointerLeave={() => setHoveredLocation(false)}
        >
          {hoveredLocation && (
            <ROverlay>
              <div className="p-4 rounded-lg shadow-md bg-gray-100">
                <strong>המיקום שלך</strong>
              </div>
            </ROverlay>
          )}
        </RFeature>
        <RFeature geometry={accuracy}></RFeature>
      </RLayerVector>
    </RMap>
  );
};
export default MapRecipeById;
