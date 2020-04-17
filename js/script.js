$(document).ready(function(){
    fullHeightMinusTopbar();
})

//Section création de l'interface
function fullHeightMinusTopbar(){
    let topbarHeight=$('#topbar').outerHeight();
    let fullHeight = window.innerHeight;
    let mainContainerHeight=fullHeight-topbarHeight;

    $('#main-container').css('height', mainContainerHeight+'px');
}
//Fermer le contenu quand on clique sur la tête
$('.sidebar-header').click(
    function(){
        $(this).siblings().slideToggle();
    }
);
$('.closer').click(
    function(){
        $(this).parent().animate({
            width: "toggle"
        });
        $(this).parent().siblings('.opener').animate({
            width: "toggle"
        });
    }
);
$('.opener').click(
    function(){
        $(this).siblings().animate({
            width: "toggle"
        });
        $(this).animate({
            width: "toggle"
        });
    }
);
//Création de la carte
map = L.map('map', { zoomControl: false }).setView([45.9852774, -72.4577222], 9);

L.control.zoom({
    position: 'topright'
}).addTo(map);
//Ajout de la carte de fond par défaut
let basemap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
	maxZoom: 16
});
basemap.addTo(map);

