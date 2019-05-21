mapboxgl.accessToken =
	"pk.eyJ1IjoibW9zdGFrYmFyaSIsImEiOiJjanZ4ejlnbXUwYWs1M3ptaXN0cHRtMXhiIn0.sYBR2dmg_fo7-tvt_Gavdw";

const geoIp =
	"https://api.ipgeolocation.io/ipgeo?apiKey=55f8e58d066d43b49bfca05d2b5fba9f";

let map = null;
let locInfo = null;

const centerOnUser = async () => {
	if (map !== null) {
		let mapInfo = await fetch(geoIp);
		let mapInfoJSON = await mapInfo.json();

		let loc = [mapInfoJSON.longitude, mapInfoJSON.latitude];

		map.easeTo({ center: loc });
		return mapInfoJSON;
	}

	// console.log(mapInfoJSON);
};

document.addEventListener("DOMContentLoaded", async () => {
	map = new mapboxgl.Map({
		container: "map",
		style: "mapbox://styles/mostakbari/cjvxzf8sz6js21cnzdejnkjg9",
		center: [-75.765, 45.4553],
		zoom: 15
	});

	document.getElementById("easeToTokyo").addEventListener("click", async () => {
		map.easeTo({ center: [139.6503, 35.6762] });
	});
	document.getElementById("easeHome").addEventListener("click", async () => {
		if (locInfo === null) {
			locInfo = await centerOnUser();
		} else {
			map.easeTo({ center: [locInfo.longitude, locInfo.latitude] });
		}
	});
	locInfo = await centerOnUser();

	let userMarker = new mapboxgl.Marker()
		.setLngLat([locInfo.longitude, locInfo.latitude])
		.setPopup(
			new mapboxgl.Popup({ classname: "here" })
				.setHTML(
					'<h1> you are here</h1> <img src="' + locInfo.country_flag + '"/>'
				)
				.addTo(map)
		);
});
