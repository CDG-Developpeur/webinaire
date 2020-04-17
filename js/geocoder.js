let marker;
let blueIcon =L.icon({
    iconUrl: './images/marker.svg',
    iconSize:     [40,70]
})

function geoCodeAndCenter(adress) {
    let baseUrl = "https://nominatim.openstreetmap.org/search?q=";
    let siteAdress = adress.replace(' ', '+');
    let format = "&format=json&polygon=1&addressdetails=1";
    let url = baseUrl + siteAdress + format;

    $.ajax({
        url: url,
        method: "GET",
        async: false,
        success: function (result) {
            map.setView([result[0].lat, result[0].lon], 17);
            
            if(marker != undefined){
                map.removeLayer(marker);
            }
            marker=L.marker([result[0].lat, result[0].lon],{icon: blueIcon}).addTo(map); 
        },
        error: function () {

        }
    });
}
$('#button-search-location').click(function () {
    geoCodeAndCenter($("#search-location").val());
})