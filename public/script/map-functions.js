/*
 * This file contains all the functions required to display shelter locations 
 * inside the United States based on the user's location.
 */

// initMap() initilizes the Google Map Javascript API and places it onto the page
function initMap() {
	
	// If HTML5 location services is availiable
	if (navigator.geolocation) {
		
		// Grab the user's longitude and latitude
		navigator.geolocation.getCurrentPosition(function (location) {
			var options = {
				zoom: 12,
				center: {
					lat: location.coords.latitude,
					lng: location.coords.longitude
				}
			}
				
			// Create a map with the center at user's location
			var map = new google.maps.Map(document.getElementById('map'), options);
			
			// Call geocode()
			var state = geocode(location.coords.latitude, location.coords.longitude, map);

		});
	} else {
		// If location hasn't been saved set to CA, set it to the US
		var options = {
			zoom: 6,
			center: {
				lat: 38.4350,
				lng: -122.6894
			}
		}
		
		// Create a map with the US at the center
		var map = new google.maps.Map(document.getElementById('map'), options);
		
		// Call geocode()
		var state = geocode(38.4350, -122.6894,map);

	}
}

// This function grabs the state of the user's cordinates by reverse Geocoding their location
function geocode(lat, lng, map) {
	
	// Axios request to reverse geocode the user's longitude and latitude to map its state
	axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=AIzaSyCniRIC-EiUZie2ot9d7nOhbT3iXNr2dT4')
		.then(function (reponse) {
			//console.log(reponse.data.results[0].address_components[5].short_name)
			
			// Find the shelters at the found state
			getShelters(reponse.data.results[0].address_components[5].short_name, map);
		})
		.catch(function (error) {
			console.log(error);
		})
}

// Grabs each publicly available shelter's based on the data provided by Department of Homeland Security
function getShelters(state, map) {
	
	// Axios request to real world data
	axios.get('https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/National_Shelter_System_Facilities/FeatureServer/0/query?where=1%3D1&outFields=NAME,ADDRESS,CITY,STATE,ZIP,TELEPHONE,TYPE&outSR=4326&f=json')
		.then(function (response) {
			//console.log(response.data.features[0].attributes.STATE);
			//console.log(state);
		
			// For each shelter, check if the state matches the user's state
			var results = response.data.features.filter(input => input.attributes.STATE == state)
			
			// For each matched shelter, call displayShelter() to place it onto the map
			results.forEach(function (shelter) {
				//console.log(shelter.geometry.x + " " + shelter.geometry.y);
				var lat = shelter.geometry.y;
				var lng = shelter.geometry.x;
				var coords = {
					lat: shelter.geometry.y,
					lng: shelter.geometry.x
				};
				
				// Passes the required JSON data to displayShelter()
				displayShelter(coords, map, shelter.attributes.NAME, shelter.attributes.ADDRESS, shelter.attributes.STATE,
					shelter.attributes.ZIP, shelter.attributes.TELEPHONE);
			})
		})
		.catch(function (error) {
			console.log(error)
		})
}

// displayShelter() places a marker on the map with its name, address, and telephone number
function displayShelter(coords, map, name, address, state, zip, telephone) {
	
	// Add marker
	var marker = new google.maps.Marker({
		position: coords,
		map: map
	})
	
	// Create label containing the name, address, and telephone
	var contentString = '<div id="content">' +
		'<div id="siteNotice">' +
		'</div>' +
		'<h3 id="firstHeading" class="firstHeading">' + name + '</h3>' +
		'<p>' + address + ', ' + state + ' ' + zip + '</p>' +
		'<p>' + telephone + '</p>' +
		'<div id="bodyContent">' +
		'</div>' +
		'</div>';
	
	// Creates info window for marker
	var infowindow = new google.maps.InfoWindow({
		content: contentString
	});
	
	// Connects the marker and infowindow 
	marker.addListener('click', function () {
		infowindow.open(map, marker);
	});

	// remove reminder class
	$(".location-reminder").remove();
}
