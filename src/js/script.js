"use strict";

// JS OR NO JS

var html = document.documentElement;
html.className = html.className.replace("no-js", "js");


// GOOGLE MAP

function Initialize() {
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


// NAVIGATION MOBILE VRSION

var mob_menu_toggle = document.querySelector(".page-nav__toggle");
var mob_menu_toggle_close = document.querySelector(".page-nav__toggle-close");
var mob_menu_items = document.querySelectorAll(".page-nav__item");

mob_menu_toggle_close.addEventListener("click", function(event) {
  event.preventDefault();
  for (var i = 0; i < mob_menu_items.length; i++) {
    mob_menu_items[i].classList.toggle("page-nav__item--open");
  }
  mob_menu_toggle_close.classList.toggle("page-nav__toggle-close--open");
});


mob_menu_toggle.addEventListener("click", function(event) {
  event.preventDefault();
  for (var i = 0; i < mob_menu_items.length; i++) {
    mob_menu_items[i].classList.toggle("page-nav__item--open");
  }
  mob_menu_toggle_close.classList.toggle("page-nav__toggle-close--open");
});

