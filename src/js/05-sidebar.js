var sidebar = document.querySelector('#sidebar');
var footer = document.querySelector('#footer');
var footerHeight;
var bodyHeight;
var windowSize;
var scrollPosition;

function checkSidebarPosition() {
  scrollPosition = window.pageYOffset;
  footerHeight = footer.clientHeight;
  bodyHeight = document.body.offsetHeight;
  windowSize = window.innerHeight;
  distanceFromBottom = bodyHeight - (scrollPosition + windowSize);
  if (distanceFromBottom <= footerHeight) {
    sidebar.style.bottom = (footerHeight - distanceFromBottom) + "px";
    sidebar.style.height = "calc(100vh - 80px - " + (footerHeight - distanceFromBottom) + "px";
  } else {
    sidebar.style.bottom = "0";
    sidebar.style.height = "calc(100vh - 80px)";
  }
}

window.addEventListener('scroll', function() {
  checkSidebarPosition();
});
document.addEventListener('DOMContentLoaded', function() {
  checkSidebarPosition();
});
