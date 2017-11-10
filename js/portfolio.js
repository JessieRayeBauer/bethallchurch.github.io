(function () {

var carousels = document.querySelectorAll(".carousel.outer");
carousels.forEach(function (carousel) {
  // Show info on tap
  carousel.addEventListener("click", function (e) {
    carousel.classList.toggle("show-info");
  });
  carousel.querySelector(".info-inner").addEventListener("click", function (e) {
    carousel.classList.toggle("show-info");
  });
  // Move panels
  var margin = 0;
  var numPanels = carousel.querySelectorAll(".panel").length;
  var carouselInner = carousel.querySelector(".inner");
  var marginType = carousel.classList.contains("horizontal") ? "marginLeft" : "marginTop";
  setInterval(function (e) {
    if (marginType === "marginLeft") {
      margin = margin < -100 * (numPanels - 2) ? 0 : margin - 100;
    } else {
      margin = margin < ((380/640) * -100) * (numPanels - 2) ? 0 : margin - (380/640) * 100;
    }
    carouselInner.style[marginType] = margin.toString() + "%";
  }, 5000);
});

})();



