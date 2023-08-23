let icon1km = L.divIcon({
  className: 'km-marker',
  html: '<span>1km</span>',
});

let icon2km = L.divIcon({
  className: 'km-marker',
  html: '<span>2km</span>',
});

let icon3km = L.divIcon({
  className: 'km-marker',
  html: '<span>3km</span>',
});

let icon4km = L.divIcon({
  className: 'km-marker',
  html: '<span>4km</span>',
});

let icon5km = L.divIcon({
  className: 'km-marker',
  html: '<span>5km</span>',
});

let map5km;
map5km = L.map('map-5km').setView([39.774769, 64.422981], 14);
// add tile layer opeenstreetmap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors',
}).addTo(map5km);

// draw track from geojsonfile
$.getJSON('./BNR_5K_2023.geojson', function (data) {
  var geojson = L.geoJson(data, {
    pointToLayer: function (feature, latlng) {
      if (feature.properties.name == 'Water stop') {
        return L.marker(latlng, {
          icon: L.icon({
            iconUrl: 'assets/water-drop.png',
            iconSize: [20, 20],
            iconAnchor: [10, 10],
          }),
        });
      }

      if (feature.properties.name == '1km') {
        return L.marker(latlng, {
          icon: icon1km,
        });
      }

      if (feature.properties.name == '2km') {
        return L.marker(latlng, {
          icon: icon2km,
        });
      }

      if (feature.properties.name == '3km') {
        return L.marker(latlng, {
          icon: icon3km,
        });
      }

      if (feature.properties.name == '4km') {
        return L.marker(latlng, {
          icon: icon4km,
        });
      }

      if (feature.properties.name == '5km') {
        return L.marker(latlng, {
          icon: icon5km,
        });
      }

      if (feature.properties.name == 'arrow-north-east') {
        return L.marker(latlng, {
          icon: getArrow('arrow-north-east'),
        }).setRotationAngle(45);
      }
    },
    style: function (feature) {
      return {
        color: 'green',
        weight: 3,
        opacity: 1,
      };
    },
  }).addTo(map5km);
});

let map10km;
map10km = L.map('map-10km').setView([39.774769, 64.422981], 13);
// add tile layer opeenstreetmap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors',
}).addTo(map10km);

// draw track from geojsonfile
$.getJSON('./BNR_10K_2023.geojson', function (data) {
  var geojson = L.geoJson(data, {
    style: function (feature) {
      return {
        color: 'green',
        weight: 3,
        opacity: 1,
      };
    },
  }).addTo(map10km);
});

function getArrow(className) {
  return L.icon({
    iconUrl: 'assets/arrow-up.png',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    className: className,
    html: `<img src="assets/arrow-up.png" style="transform: rotate(80deg);">`,
  });
}

// opeenstreetmap regular tile layer
// let map;
// map = L.map('map').setView([39.774769, 64.422981], 14);
// // add tile layer opeenstreetmap
// L.tileLayer(
//   'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
//   {
//     attribution: '© OpenStreetMap contributors',
//   }
// ).addTo(map);

// leaflet map center tashkent
// let map;
// map = L.map('map').setView([41.311081, 69.240562], 14);
// // add tile layer opeenstreetmap
// L.tileLayer(
//   'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
