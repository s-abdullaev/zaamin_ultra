let map5km;
map5km = L.map('map-5km').setView([39.7780584188629, 64.42069129417081], 15);
// add tile layer opeenstreetmap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors',
}).addTo(map5km);

// draw track from geojsonfile
$.getJSON('./data/BNR_5K_2023.geojson', function (data) {
  var geojson = L.geoJson(data, {
    pointToLayer: function (feature, latlng) {
      return setPoints(feature, latlng);
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
map10km = L.map('map-10km').setView([39.7780584188629, 64.42069129417081], 15);
// add tile layer opeenstreetmap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors',
}).addTo(map10km);

// draw track from geojsonfile
$.getJSON('./data/BNR_10K_2023.geojson', function (data) {
  const lap2 = data.features.find(
    (feature) => feature.properties.name == 'lap-2'
  );
  lap2.geometry.coordinates = lap2.geometry.coordinates.map((coordinate) => {
    return [coordinate[0] + 0.0001, coordinate[1] + 0.0001];
  });
  var geojson = L.geoJson(data, {
    pointToLayer: function (feature, latlng) {
      return setPoints(feature, latlng);
    },
    style: function (feature) {
      if (feature.properties.name == 'lap-2') {
        return {
          color: 'red',
          weight: 4,
          opacity: 0.75,
        };
      } else {
        return {
          color: 'green',
          weight: 4,
          opacity: 1,
        };
      }
    },
  }).addTo(map10km);
});

function getArrow(className) {
  return L.icon({
    iconUrl: className.includes('red')
      ? 'assets/icons/red-arrow-up.png'
      : 'assets/icons/arrow-up-darker.png',
    iconSize: [25, 25],
    iconAnchor: [12.5, 12.5],
    className: className,
  });
}

function getMarker(length, latlng) {
  return L.marker(latlng, {
    icon: L.divIcon({
      className: 'km-marker',
      html: '<span>' + length + '</span>',
    }),
  });
}

function setPoints(feature, latlng) {
  if (feature.properties.name == 'Water stop') {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: 'assets/icons/water-drop.png',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      }),
    });
  }

  if (feature.properties.name == 'start') {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: 'assets/icons/racing-flag.png',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      }),
    });
  }

  if (feature.properties.name == 'Turn') {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: 'assets/icons/upward-arrow.png',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      }),
    });
  }

  if (feature.properties.name.includes('km')) {
    return getMarker(feature.properties.name, latlng);
  }

  if (feature.properties.name == 'arrow-north-east') {
    return L.marker(latlng, {
      icon: getArrow('arrow-north-east'),
    }).setRotationAngle(45);
  }

  if (feature.properties.name == 'arrow-east') {
    return L.marker(latlng, {
      icon: getArrow('arrow-east'),
    }).setRotationAngle(95);
  }

  if (feature.properties.name == 'arrow-south-east') {
    return L.marker(latlng, {
      icon: getArrow('arrow-south-east'),
    }).setRotationAngle(120);
  }

  if (feature.properties.name == 'arrow-south') {
    return L.marker(latlng, {
      icon: getArrow('arrow-south'),
    }).setRotationAngle(160);
  }

  if (feature.properties.name == 'arrow-north-west') {
    return L.marker(latlng, {
      icon: getArrow('arrow-north-west'),
    }).setRotationAngle(280);
  }

  if (feature.properties.name == 'arrow-west') {
    return L.marker(latlng, {
      icon: getArrow('arrow-west'),
    }).setRotationAngle(260);
  }

  if (feature.properties.name == 'red-arrow-north-east') {
    return L.marker(latlng, {
      icon: getArrow('red-arrow-north-east'),
    }).setRotationAngle(45);
  }

  if (feature.properties.name == 'red-arrow-east') {
    return L.marker(latlng, {
      icon: getArrow('red-arrow-east'),
    }).setRotationAngle(95);
  }

  if (feature.properties.name == 'red-arrow-south-east') {
    return L.marker(latlng, {
      icon: getArrow('red-arrow-south-east'),
    }).setRotationAngle(120);
  }

  if (feature.properties.name == 'red-arrow-south') {
    return L.marker(latlng, {
      icon: getArrow('red-arrow-south'),
    }).setRotationAngle(160);
  }

  if (feature.properties.name == 'red-arrow-north-west') {
    return L.marker(latlng, {
      icon: getArrow('red-arrow-north-west'),
    }).setRotationAngle(280);
  }

  if (feature.properties.name == 'red-arrow-west') {
    return L.marker(latlng, {
      icon: getArrow('red-arrow-west'),
    }).setRotationAngle(260);
  }
}
