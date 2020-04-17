let layers = [
    {
        "label": "Tremblement de terre",
        "source": "./js/geojson/earthquakes_2018_2020.geojson",
        "checked": false,
        "style": {

        },
        "point":true,
        "icon":{
            "iconSize": [15, 15],
            "iconUrl": './images/earthquake.png'
        },
        'popUp':true
    },

]

$(document).ready(function () {
    createLayerSwitcher(layers);
    
});

//Création de la sélection des couches
function createLayerSwitcher(layers) {
    let layerSwitcher = "";

    layers.forEach(element => {
        let labelClean = element.label.replace(/\s+/g, "_").replace("\'", "_");
        layerSwitcher += '<label class="container-checkbox">'+element.label+'<input type="checkbox" value="'+element.label+'" onchange="switchLayer(this, \'' + labelClean +'\')"';
        if (element.checked) {
            layerSwitcher += "checked"
            getLayer(element.source, labelClean, element.style, element.point);
        }
        else {

        }
        layerSwitcher += "> <span class=\"checkmark-checkbox\"></span></label>";
    });

    $("#layer-container").html(layerSwitcher);

}

function getLayer(url, label, style, point) {
console.log('1');
    $.ajax({
        url: url,
        type: 'GET',
        beforeSend: function () {
            // Show image container
            $(".loader-container").show();
        },
        success: function (result) {
            let resultParse = JSON.parse(result);

            if (point) {
                let thisLayer = layers.find(thisLayer => thisLayer.source == url);
                let myIcon=L.icon(thisLayer.icon);
                window[label] = L.geoJSON(resultParse, {
                    pointToLayer: function (feature, latlng) {
                        return L.marker(latlng, { icon: myIcon });
                    },
                    onEachFeature:function(feature, layer){
                        layer.on('click', function (e) {
                            sideBarRight(feature, layer);
                          });
                    }
                });
            }
            else {
                window[label] = L.geoJSON(resultParse, { style: style });
            
            }
            window[label].addTo(map);
        },
        complete: function (data) {
            // Hide image container
            $("#loader").hide();
        }
    });
}

function switchLayer(layer, label) {
    if (layer.checked) {
        if (window[label] == undefined) {
            let value=$(layer).val();
            let thisLayer = layers.find(thisLayer => thisLayer.label == value);
            getLayer(thisLayer.source, label, thisLayer.style, thisLayer.point);
        }
        else {
            window[label].addTo(map);
        }
    }
    else {
        map.removeLayer(window[label]);
    }

}
function sideBarRight(feature, layer){
    console.log(feature.properties);
    $('#sidebar-right').show();
    $('.open-sidebar-right').hide();

    let popUpContent="";
    Object.keys(feature.properties).forEach(function(key) {
        console.log(key, feature.properties[key])
    popUpContent+="<p><b>"+key+":</b> "+feature.properties[key]+"</p>";   

    });

    $('#sidebar-right-content').html(popUpContent)
}