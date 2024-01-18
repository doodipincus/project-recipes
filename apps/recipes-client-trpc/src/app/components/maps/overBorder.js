import Fill from 'ol/style/Fill.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import Map from 'ol/Map.js';
import Stroke from 'ol/style/Stroke.js';
import Style from 'ol/style/Style.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import View from 'ol/View.js';
import { RMap, ROSM, RLayerVector, RStyle, RFeature, ROverlay } from 'rlayers';

const style = new Style({
  fill: new Fill({
    color: '#eeeeee',
  }),
});

const vector = new VectorLayer({
  source: new VectorSource({
    url: 'https://openlayers.org/data/vector/ecoregions.json',
    format: new GeoJSON(),
  }),
  background: 'white',
  style: function (feature) {
    const color = feature.get('COLOR') || '#eeeeee';
    style.getFill().setColor(color);
    return style;
  },
});

const map = new Map({
  layers: [vector],
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});

const selectStyle = new Style({
  fill: new Fill({
    color: '#eeeeee',
  }),
  stroke: new Stroke({
    color: 'rgba(255, 255, 255, 0.7)',
    width: 2,
  }),
});

const status = document.getElementById('status');

let selected = null;
map.on('pointermove', function (e) {
  if (selected !== null) {
    selected.setStyle(undefined);
    selected = null;
  }

  map.forEachFeatureAtPixel(e.pixel, function (f) {
    selected = f;
    selectStyle.getFill().setColor(f.get('COLOR') || '#eeeeee');
    f.setStyle(selectStyle);
    return true;
  });

  if (selected) {
    status.innerHTML = selected.get('ECO_NAME');
  } else {
    status.innerHTML = '&nbsp;';
  }
});