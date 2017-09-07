$("#ciudad").focus();
$("#ciudad").keyup(function(e){
   if(e.keyCode == 13){
     $("#btnBuscar").click();
   }
});
    
var  map  =  new  google.maps.Map(document.getElementById('map'),  {
    center:  new  google.maps.LatLng(-33.464142,  -70.660797),  
    mapTypeId:  google.maps.MapTypeId.ROADMAP,  
    zoom:  11  
});  
            var waqiMapOverlay = new google.maps.ImageMapType({
    getTileUrl: function(coord, zoom) {
        return 'https://tiles.waqi.info/tiles/usepa-aqi/' + zoom + "/" + coord.x + "/" + coord.y + ".png?token=8954e06d154a2fb3f0c790f8b4458139485474e3";
    },
    name: "Calidad de Aire",
});

map.overlayMapTypes.insertAt(0, waqiMapOverlay);

$("#btnBuscar").click(function() {
    if ($("#ciudad").val()) {
        var ciudad = $("#ciudad").val();
        //$.getJSON('http://api.waqi.info/feed/'+ciudad+'/?token=8954e06d154a2fb3f0c790f8b4458139485474e3',
        $.getJSON('http://localhost/api/' + ciudad,
            function(data) {
                if (data.status == "ok") {
                    var lat = data.lat;
                    var lon = data.lon;
                    console.log(data);

                    map.setZoom(14);
                    map.panTo(new google.maps.LatLng(lat, lon));

                    $("#right").html("<div id='aqi' style='width:180px;text-align:center;'>" +
                        "<small>" + data.city + "<br>" + data.name + " AQI:</small>" +
                        "<div style='font-size:60px;font-weight: bold;height:75px'>" + data.aqi + "</div>" +
                        data.time + "</div>");

                    var spectrum = [{
                            a: 0,
                            b: "#cccccc",
                            f: "#ffffff"
                        },
                        {
                            a: 50,
                            b: "#009966",
                            f: "#ffffff"
                        },
                        {
                            a: 100,
                            b: "#ffde33",
                            f: "#000000"
                        },
                        {
                            a: 150,
                            b: "#ff9933",
                            f: "#000000"
                        },
                        {
                            a: 200,
                            b: "#cc0033",
                            f: "#ffffff"
                        },
                        {
                            a: 300,
                            b: "#660099",
                            f: "#ffffff"
                        },
                        {
                            a: 500,
                            b: "#7e0023",
                            f: "#ffffff"
                        }
                    ];

                    var i = 0;
                    for (i = 0; i < spectrum.length - 2; i++) {
                        if (data.aqi == "-" || data.aqi <= spectrum[i].a) break;
                    };

                    $("#aqi").css("background-color", spectrum[i].b).css("color", spectrum[i].f)

                } else {
                    $("#right").html('<div><p>Ciudad no encontrada</p></div>');
                }
            });


    }
});