"use strict";

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

