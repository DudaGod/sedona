// GOOGLE MAP

function Initialize() {
  'use strict';

  var myLatLng = new google.maps.LatLng(34.7437805,-111.7485324);
  var myPointLng = new google.maps.LatLng(34.868147,-111.7584029);
  var contentString = 'Sedona';

  var mapOptions = {
    zoom: 9,
    center: myLatLng
  }

  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var marker = new google.maps.Marker({
    position: myPointLng,
    map: map
  });

  var infoWindow = new google.maps.InfoWindow ({
    content: contentString
  })

  google.maps.event.addListener(marker, 'mouseover', function() {
    infoWindow.open(map, marker);
  });
}

google.maps.event.addDomListener(window, 'load', Initialize);