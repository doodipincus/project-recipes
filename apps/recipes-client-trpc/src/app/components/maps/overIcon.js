// import ol from 'ol'

var map = new ol.Map({
    layers: [
    new ol.layer.Tile({
        source: new ol.source.OSM()
    })
    ],
    target: 'map',
    view: new ol.View({
    center: ol.proj.fromLonLat([-114.778097, 32.698996]),
    zoom: 4
    })
});



var iconStyle = new ol.style.Style({
    image: new ol.style.Icon({
     
        anchorYUnits: 'pixels',
        src: '//raw.githubusercontent.com/movethathoof/flz/master/moo7.png',                
    }),
});




var mooLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: '//raw.githubusercontent.com/movethathoof/flz/master/testmoo3.kml',
        format: new ol.format.KML({
            extractStyles: false,
        }),
    }),
    style: iconStyle,
});

mooLayer.getSource().on('addfeature', function(event) {
    event.feature.set('type', 'moo');
});

var hoverStyles = {
    'moo': new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 30],

            anchorYUnits: 'pixels',
            src: 'https://raw.githubusercontent.com/movethathoof/flz/master/MooHover.png',
            })
    }),
    'route': new ol.style.Style({

    })
};

var createHoverLayer = function(style) {
    return new ol.layer.Vector({
        source: new ol.source.Vector(),
        style: style,
        });
}


var hoverLayers = {};

hoverLayers['moo'] = createHoverLayer([hoverStyles['moo']]);

map.addLayer(mooLayer);
map.addLayer(hoverLayers['moo']);

var highlight;
var hover = function(pixel) {
var feature = map.forEachFeatureAtPixel(pixel, function(feature) {
    return feature;
});
    if (feature !== highlight) {
        if (highlight) {
            var highlightType = highlight.get('type');
            hoverLayers[highlightType].getSource().removeFeature(highlight);
        }
        if (feature) {
            var featureType = feature.get('type');
            hoverLayers[featureType].getSource().addFeature(feature);
        }
        highlight = feature;
    }
};

map.on('pointermove', function(evt) {
    if (evt.dragging) {
        return;
    }
    var pixel = map.getEventPixel(evt.originalEvent);
    hover(pixel);
});

