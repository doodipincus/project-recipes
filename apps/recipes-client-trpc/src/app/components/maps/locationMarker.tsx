import { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';


 export function LocationMarker({setFlag}) {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate();
    //   setFlag(false)
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });
  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

const MarkerComponent = () => {
    const [flag, setFlag] = useState(true);
  return (
    <div     style={{width:"300px", height:"300px"}}>

    <MapContainer
      center={{ lat: 51.505, lng: -0.09 }}
      zoom={13}
      scrollWheelZoom={false}
 style={{width:"100%", height:"100%"}}
      >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
     { flag&& <LocationMarker setFlag={setFlag} />}
    </MapContainer>
    <button onClick={()=> setFlag(true)}>גש למיקום שלי</button>
    </div>
//     <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
//     <TileLayer
//       attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//     />
//     <Marker position={[51.505, -0.09]}>
//       <Popup>
//         A pretty CSS3 popup. <br /> Easily customizable.
//       </Popup>
//     </Marker>
//   </MapContainer>
);
};
export default MarkerComponent