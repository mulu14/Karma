/**
 * Help fuctions
 * @author Mulugeta Forsido
 */

/**
 * Get sorted geolocation places
 * @param {void}
 * @return array of json object
 */
export function locationApi() {
  let lat = 59.330596;
  let lng = 18.0560967;
  let API =
    'https://storage.googleapis.com/engineering-4b0b7d62/locations_filtered.json';
  return fetch(API)
    .then(res => res.json())
    .then(data => {
      return data
        .map(place => {
          let distance = calcualteDistance(lat, lng, place);
          place['distance'] = distance.toFixed(3);
          return place;
        })
        .sort((a, b) => {
          if (a.distance > b.distance) {
            return 1;
          }
          if (a.distance < b.distance) {
            return -1;
          }
          return 0;
        });
    })
    .catch(err => {
      console.log(err);
    });
}

/**
 * Calculate distance between two places
 * @param  {lan, lng, data}
 * @return floating
 */

export function calcualteDistance(lat, lng, data) {
  if (lat === data.latitude && lng === data.longitude) {
    return 0;
  }
  var R = 6371;
  var dLat = degreesToRadians(data.latitude - lat);
  var dLng = degreesToRadians(data.longitude - lng);
  var lat1 = degreesToRadians(lat);
  var lat2 = degreesToRadians(lng);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Convert degree to radian
 * @param  {degree}
 * @return radian
 */

function degreesToRadians(degree) {
  return (degree * Math.PI) / 180;
}
