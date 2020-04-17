let basemaps=[
    {
        "label":"Fond de carte gris",
        "basemapsInfo": "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
    },
    {
        "label":"Satellitaire",
        "basemapsInfo": "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
    },
    {
        "label":"Carte topographique",
        "basemapsInfo": "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
    },
    {
        "label":"Fond de carte noir",
        "basemapsInfo": "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    },

]

$(document).ready(function () {
    createBasemapSwitcher(basemaps);
    
});
                            

//Création de la sélection des basemaps
function createBasemapSwitcher(basemaps) {
    let basemapSwitcher = "";
    basemaps.forEach(
        function (element, index) {
            basemapSwitcher += '<label class="container">'+element.label+' <input type="radio" name="basemaps" value="'+element.label+'" onclick="changeBasemaps(this, basemaps)"';
            if (index == 0) {
                basemapSwitcher += "checked";
            }
            basemapSwitcher += '><span class="checkmark"></span>';
            basemapSwitcher +=' </label>';
        });

    $('#basemaps-container').html(basemapSwitcher);
}
//Changement de fond de carte lorsque le boutton radio est changé
function changeBasemaps(input, basemaps) {
    map.removeLayer(basemap)
    let value = $(input).val();

    let basemapInfo = basemaps.find(basemap => basemap.label == value);
    console.log(basemapInfo.basemapsInfo);

    basemap = L.tileLayer(basemapInfo.basemapsInfo, {
        maxZoom: 19,
    });

    basemap.addTo(map);
}