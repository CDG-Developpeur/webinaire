$(document).ready(function () {
    getLocation();
    

});
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {

    }
}

function showPosition(position) {
    map.setView([position.coords.latitude, position.coords.longitude], 8);
}