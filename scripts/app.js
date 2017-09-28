// define globals
// const weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

const icon = {
	url: "images/earthquake.png",
	scaledSize: new google.maps.Size(15, 15), // scaled size
    origin: new google.maps.Point(0,0), // origin
    anchor: new google.maps.Point(0, 0)
}

const initializeGoogleMaps =() =>{

	const mapCanvas = document.getElementById('map-canvas');
	const mapOptions = {
		center: {lat: 41.931929, lng: -87.698327},
		zoom: 1,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}

	

	const map = new google.maps.Map(mapCanvas, mapOptions);

	// const marker = new google.maps.Marker({
	// 	position: {lat: 41.931929, lng: -87.698327},
	// 	map: map,
	// 	animation: google.maps.Animation.DROP
	// })
	$.ajax({
	url: 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson',
	type: 'GET',
	dataType: 'Json',
	success: (res) => {
		console.log(res);
		for (let i = 0; i < res.features.length; i++){
			const marker = new google.maps.Marker({
			position: {lat: res.features[i].geometry.coordinates[1], lng: res.features[i].geometry.coordinates[0]},
			map: map,
			animation: google.maps.Animation.DROP,
			icon: icon

			})
			$('#info').append('<p>' + res.features[i].properties.title + '</p>');
			// const contentString = '<div> Station Name: '+ res[i].station_name +
			// 						'<p> Total Number of Docks: ' + res[i].total_docks + '</p>' +
			// 						'<p> Status: '+ res[i].status + '</p>' +

			// 						'</div>';
			// const infowindow = new google.maps.InfoWindow({
			// 	content: contentString
			// })

			// marker.addListener('click', () =>{
			// 	infowindow.open(map, marker);
			// })

		}
	},
	error: (err) => {

	}




})
}

// event listener added to the window to run 
// our callback funstion after the google maps api
google.maps.event.addDomListener(window, 'load', initializeGoogleMaps);





