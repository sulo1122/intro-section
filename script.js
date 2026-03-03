    
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

sideMenuBtn.addEventListener("click", function (e) {
  e.target.closest(".header").classList.toggle("side-open");
  const rect = sideMenuBtn.getBoundingClientRect();
  console.log(rect.top, rect.right, rect.bottom, rect.left);
  const imgBtn = sideMenuBtn.querySelector("img");

  imgBtn.src =
    imgBtn.src === sideMenuBtn.dataset.open
      ? sideMenuBtn.dataset.close
      : sideMenuBtn.dataset.open;
  sideMenuBtn.classList.toggle("fixed");
});


if (window.innerWidth <= 760) {
  navList.addEventListener("click", clickHandler);
} else {
  navList.addEventListener("mouseover", mouseOverHandler);
  navList.addEventListener("mouseleave", mouseLeaveHandler);
}