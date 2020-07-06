// Start MapBox
mapboxgl.accessToken =
  "pk.eyJ1IjoiemFrYXJpYTE2OTciLCJhIjoiY2tiOWZjODBtMGRsOTJycGhucmZhNmhyeSJ9.D1ji-wXDaaKHjr-yopZWcw";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [4.68611, 36.54722],
  zoom: 3,
});

// Render The Choosed Location
export const mapboxFunction = (lat, lng) => {
  var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: [lng, lat],
    zoom: 11,
  });

  var marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
};
