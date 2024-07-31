// buat nambahin hovered di sidebar list item icon
let list = document.querySelectorAll(".navigation li");

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));

// Menu Toggle
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");
let mainAnalytic = document.querySelector(".mainAnalytic");
let mainourteam = document.querySelector(".mainourteam");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
  mainAnalytic.classList.toggle("active");
  mainourteam.classList.toggle("active");
};

