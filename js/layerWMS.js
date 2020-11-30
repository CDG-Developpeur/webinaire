let wms = {
    "layers": [
        {
            "categorie": "",
            "layers": [
                {
                    "type": "wms",
                    "URL": "http://geocdgdeveloppeur.com/geoserver/gmrc_listiguj/wms?SERVICE=WMS",
                    "Label": "Sea level rise prediction for RCP8.5, 25 years, low isostatic rift",
                    "Layer": "max-1-25",
                    "opacity": "0.7"

                }
            ]
        }
    ]
}

$(document).ready(function () {
    createLayerSwitcherWMS(wms);
    
});

//Create layer switcher
function createLayerSwitcherWMS(layers) {
    let layerSwitcher = "";
    layers.layers.forEach(element => {
        element.layers.forEach(element2 => {
            layerSwitcher += '<div class="form-check"><label class="container-checkbox">' +
                '<input type="checkbox" class="form-check-input" onchange="switchLayerWMS(this,\'' + element2.type + '\',\'' + element2.URL + '\', \'' + element2.Label + '\', \'' + element2.Layer + '\', \'' + element2.opacity + '\')">' +
                '<span class="checkmark-checkbox"></span>' + element2.Label + '</label></div>';
        })
    });

    $("#layer-container").append(layerSwitcher);
}
function switchLayerWMS(checkbox, type, url, label, layer, opacity) {
    let labelClean = label.replace(/\s+/g, "_").replace("\'", "_");
    if (checkbox.checked) {
        if (type == 'wms') {
            window[labelClean] = L.tileLayer.wms(url,
                {
                    layers: layer,
                    transparent: true,
                    format: 'image/png',
                    opacity: opacity
                }).addTo(map);
        }
    }
    else {
        if (type == 'wms') {
            map.removeLayer(window[labelClean]);
        }
    }
}