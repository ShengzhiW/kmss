function initMap() {

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (location) {
			var options = {
				zoom: 12,
				center: {
					lat: location.coords.latitude,
					lng: location.coords.longitude
				}
			}

			var map = new google.maps.Map(document.getElementById('map'), options);

			var state = geocode(location.coords.latitude, location.coords.longitude, map);

		});
	} else {
		// If location hasn't been saved set to CA
		var options = {
			zoom: 6,
			center: {
				lat: 38.4350,
				lng: -122.6894
			}
		}

		var map = new google.maps.Map(document.getElementById('map'), options);

		var state = geocode(38.4350, -122.6894);

	}
}

function geocode(lat, lng, map) {
	axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=AIzaSyCniRIC-EiUZie2ot9d7nOhbT3iXNr2dT4')
		.then(function (reponse) {
			//console.log(reponse.data.results[0].address_components[5].short_name)
			getShelters("FL", map);
		})
		.catch(function (error) {
			console.log(error);
		})
}

function getShelters(state, map) {
	axios.get('https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/National_Shelter_System_Facilities/FeatureServer/0/query?where=1%3D1&outFields=NAME,ADDRESS,CITY,STATE,ZIP,TELEPHONE,TYPE&outSR=4326&f=json')
		.then(function (response) {
			//console.log(response.data.features[0].attributes.STATE);
			//console.log(state);
			var results = response.data.features.filter(input => input.attributes.STATE == state)

			results.forEach(function (shelter) {
				//console.log(shelter.geometry.x + " " + shelter.geometry.y);
				var lat = shelter.geometry.y;
				var lng = shelter.geometry.x;
				var coords = {
					lat: shelter.geometry.y,
					lng: shelter.geometry.x
				};
				displayShelter(coords, map, shelter.attributes.NAME, shelter.attributes.ADDRESS, shelter.attributes.STATE,
					shelter.attributes.ZIP, shelter.attributes.TELEPHONE);
			})
		})
		.catch(function (error) {
			console.log(error)
		})
}

function displayShelter(coords, map, name, address, state, zip, telephone) {
	var marker = new google.maps.Marker({
		position: coords,
		map: map
	})

	var contentString = '<div id="content">' +
		'<div id="siteNotice">' +
		'</div>' +
		'<h3 id="firstHeading" class="firstHeading">' + name + '</h3>' +
		'<p>' + address + ', ' + state + ' ' + zip + '</p>' +
		'<p>' + telephone + '</p>' +
		'<div id="bodyContent">' +
		'</div>' +
		'</div>';

	var infowindow = new google.maps.InfoWindow({
		content: contentString
	});

	marker.addListener('click', function () {
		infowindow.open(map, marker);
	});
}