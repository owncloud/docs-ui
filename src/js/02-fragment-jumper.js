(function () {
  "use strict";

  const article = document.querySelector("article.doc");
  const toolbar = document.querySelector(".toolbar");

  function computePosition(el, sum) {
    if (article.contains(el)) {
      return computePosition(el.offsetParent, el.offsetTop + sum);
    } else {
      return sum;
    }
  }

  function jumpToAnchor(e) {
    if (e) {
      window.location.hash = "#" + this.id;
      e.preventDefault();
    }
    window.scrollTo(
      0,
      computePosition(this, 0) - toolbar.getBoundingClientRect().bottom
    );
  }

  window.addEventListener("load", function jumpOnLoad(e) {
    let hash, target;
    if (
      (hash = window.location.hash) &&
      (target = document.getElementById(hash.slice(1)))
    ) {
      jumpToAnchor.bind(target)();
      setTimeout(jumpToAnchor.bind(target), 0);
    }
    window.removeEventListener("load", jumpOnLoad);
  });

  Array.prototype.slice
    .call(document.querySelectorAll('a[href^="#"]'))
    .forEach(function (el) {
      let hash, target;
      if (
        (hash = el.hash.slice(1)) &&
        (target = document.getElementById(hash))
      ) {
        el.addEventListener("click", jumpToAnchor.bind(target));
      }
    });
})();
