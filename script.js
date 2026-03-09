    
"use strict";

const navList = document.querySelector(`.nav__list`);
const sideMenuBtn = document.querySelector(".side-menu-btn");

let widthMatch = window.matchMedia("(max-width: 47.5em)");
let closeTimer;

const closePopMenu = function (menu) {
  menu.classList.add("hidden");
  menu.querySelector("img").src = menu.querySelector("img").dataset.srcdown;
};

const openPopMenu = function (menu) {
  clearInterval(closeTimer);

  menu.classList.remove("hidden");

  menu.querySelector("img").src = menu
    .closest(".menu")
    .querySelector("img").dataset.srcup;
};

const mouseOverHandler = function (e) {
  console.log(`got here`);
  if (
    !e.target.parentElement.classList.contains("menu") &&
    !e.target.classList.contains("popMenu")
  )
    return;
  const currMenu = e.target.closest(".menu");
  document.querySelectorAll(".menu").forEach((menu) => closePopMenu(menu));
  openPopMenu(currMenu);
};

const mouseLeaveHandler = function (e) {
  closeTimer = setTimeout(function () {
    e.target.querySelectorAll(`.menu`).forEach((menu) => closePopMenu(menu));
  }, 1000);
};

const clickHandler = function (e) {
  if (
    !e.target.parentElement.classList.contains("menu") &&
    !e.target.classList.contains("popMenu")
  )
    return;
  const currMenu = e.target.closest(".menu");
  currMenu.classList.toggle("hidden");
};

widthMatch.addEventListener("change", function (mm) {
  if (mm.matches) {
    navList.removeEventListener("mouseover", mouseOverHandler);
    navList.removeEventListener("mouseleave", mouseLeaveHandler);

    navList.addEventListener("click", clickHandler);
  } else {
    navList.removeEventListener("click", clickHandler);

    navList.addEventListener("mouseover", mouseOverHandler);
    navList.addEventListener("mouseleave", mouseLeaveHandler);
  }
});


const menuIcon = document.querySelector(".menu-icon");
const closeIcon = document.querySelector(".close-icon");

sideMenuBtn.addEventListener("click", function () {

  document.querySelector(".header").classList.toggle("side-open");

  if (document.querySelector(".header").classList.contains("side-open")) {
    menuIcon.style.display = "none";
    closeIcon.style.display = "block";
  } else {
    menuIcon.style.display = "block";
    closeIcon.style.display = "none";
  }

});


if (window.innerWidth <= 760) {
  navList.addEventListener("click", clickHandler);
} else {
  navList.addEventListener("mouseover", mouseOverHandler);
  navList.addEventListener("mouseleave", mouseLeaveHandler);
}


