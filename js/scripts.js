var mapboxAccessToken = 'pk.eyJ1IjoiYXJ0aHVyLW1hcHMiLCJhIjoiY2p4N3AxMnl2MGN0MzN6bnlmbmdmcDhoZiJ9.djwTs9srm-zxsnYutHopNw';
   

var map = L.map('mapid', {
        minZoom: 6,
        maxZoom: 12
      // bounds: mybounds,
       //maxBoundsViscosity: 1.0
   
    });

//var map = L.map('mapid').setView([28.5, -81.6], 7);


L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken, {
    id: 'mapbox.light',
     //bounds: mybounds,
     //maxBoundsViscosity: 1.0,
    attribution: "© Mapbox | USDA Agricultural Statistics Service"
   
}).addTo(map);

map.setView([34.69, -78.60], 6.5);

//L.esri.tiledMapLayer({
 // url: 'https://tiles.arcgis.com/tiles/cDCsY3VB02CTTRKx/arcgis/rest/services/FL_strata_WGS1984/VectorTileServer',
  //maxZoom: 15
//}).addTo(map);

//for backgrounds really
//L.esri.Vector.layer('6f0044f50bd24142897d4955ee28f823').addTo(map);

 //a Leaflet marker is used by default to symbolize point features.
 var strata = L.esri.featureLayer({
    url: 'https://services5.arcgis.com/cDCsY3VB02CTTRKx/arcgis/rest/services/AL062018_windswath_albers_smooth/FeatureServer/0',
    style: function (feature) {
      if(feature.properties.RADII === 64){
      return { fillOpacity:0.2 };
      } else if(feature.properties.RADII === 50){
      return { fillOpacity:0.2 };
      } else if(feature.properties.RADII === 34){
      return { fillOpacity:0.2 };
   }
    }
  }).addTo(map);

 strata.bindPopup(function (layer) {
    return L.Util.template('<p>Minimum Wind Speed: {RADII} knots</p>', layer.feature.properties);
  });

//var legend = L.control({position: 'bottomright'});

function getColor(d) {
        return d === 'Cropland'  ? "#006400" :
               d === 'Inundated Cropland'  ? "#FF0000" :
               d === 'Water' ? "#0000FF" :
                            "#ff7f00";
    }

    function style(feature) {
        return {
            weight: 1.5,
            opacity: 1,
            fillOpacity: 1,
            radius: 6,
            fillColor: getColor(feature.properties.Stratum),
            color: "grey"

        };
    }

L.esri.tiledMapLayer({
   url: 'https://tiles.arcgis.com/tiles/cDCsY3VB02CTTRKx/arcgis/rest/services/Hurricane_Florence_Inundation_Layer_img/MapServer'
}).addTo(map);

var legend = L.control({position: 'bottomleft'});
    legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend');
    labels = ['<strong>Land Cover</strong>'],
    categories = ['Cropland','Inundated Cropland','Water'];

    for (var i = 0; i < categories.length; i++) {

            div.innerHTML += 
            labels.push(
                '<i class="rectangle" style="background:' + getColor(categories[i]) + '"></i> ' +
            (categories[i] ? categories[i] : '+'));

        }
        div.innerHTML = labels.join('<br>');
    return div;
    };
    legend.addTo(map);


