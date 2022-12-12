/* do not use the content of the script from the default ui */
/* https://gitlab.com/mmattel/antora-ui-default/-/tree/master/src/js */
/* it currently breaks the navigation (no clicking possible) most likely */
/* because the referenced names are different in css */
/* this needs an in depth investigation and update including a lot of testing */
/* to avoid any accidental updates, the script has a different name compared to the default ui*/

;(function () {
  "use strict";

  const navContainer = document.querySelector(".navigation-container");
  const navToggle = document.querySelector(".navigation-toggle");

  navToggle.addEventListener("click", toggleNavigation);
  // don't let click events propagate outside of navigation container
  navContainer.addEventListener("click", concealEvent);

  const menuPanel = navContainer.querySelector("[data-panel=menu]");
  if (!menuPanel) return;

  const navState = getNavState();
  const menuState = getMenuState(
    navState,
    navContainer.dataset.component,
    navContainer.dataset.version
  );

  navContainer.querySelector(".context").addEventListener("click", function () {
    const currentPanel = navContainer.querySelector(".is-active[data-panel]");
    const activatePanel =
      currentPanel.dataset.panel === "menu" ? "explore" : "menu";
    currentPanel.classList.toggle("is-active");
    navContainer
      .querySelector("[data-panel=" + activatePanel + "]")
      .classList.toggle("is-active");
  });

  find(".nav-toggle", menuPanel).forEach(function (btn) {
    const li = btn.parentElement;
    btn.addEventListener("click", function () {
      li.classList.toggle("is-active");
      menuState.expandedItems = getExpandedItems();
      saveNavState();
    });
    const navItemSpan = findNextElement(btn, ".nav-text");
    if (navItemSpan) {
      navItemSpan.style.cursor = "pointer";
      navItemSpan.addEventListener("click", function () {
        li.classList.toggle("is-active");
        menuState.expandedItems = getExpandedItems();
        saveNavState();
      });
    }
  });

  find(".nav-item", menuPanel).forEach(function (item, idx) {
    item.setAttribute("data-id", "menu-" + item.dataset.depth + "-" + idx);
  });

  const expandedItems = menuState.expandedItems || (menuState.expandedItems = []);

  if (expandedItems.length) {
    find(
      expandedItems
        .map(function (itemId) {
          return '.nav-item[data-id="' + itemId + '"]';
        })
        .join(","),
      menuPanel
    ).forEach(function (item) {
      item.classList.add("is-active");
    });
  }

  const currentPageItem = menuPanel.querySelector(".is-current-page");
  if (currentPageItem) {
    activateCurrentPath(currentPageItem).forEach(function (itemId) {
      if (expandedItems.indexOf(itemId) < 0) expandedItems.push(itemId);
    });
  }

  saveNavState();

  scrollItemIntoView(
    menuState.scroll || 0,
    menuPanel,
    currentPageItem && currentPageItem.querySelector(".nav-link")
  );

  menuPanel.addEventListener("scroll", function () {
    menuState.scroll = Math.round(menuPanel.scrollTop);
    saveNavState();
  });

  function activateCurrentPath(navItem) {
    const ids = [navItem.dataset.id];
    let ancestorClasses;
    let ancestor = navItem.parentNode;
    while (!(ancestorClasses = ancestor.classList).contains("nav-menu")) {
      if (ancestor.tagName === "LI" && ancestorClasses.contains("nav-item")) {
        ancestorClasses.add("is-active", "is-current-path");
        ids.push(ancestor.dataset.id);
      }
      ancestor = ancestor.parentNode;
    }
    navItem.classList.add("is-active");
    return ids;
  }

  function toggleNavigation(e) {
    if (navToggle.classList.contains("is-active")) return closeNavigation(e);
    document.documentElement.classList.add("is-clipped--nav");
    navToggle.classList.add("is-active");
    navContainer.classList.add("is-active");
    window.addEventListener("click", closeNavigation);
    // don't let this event get picked up by window click listener
    concealEvent(e);
  }

  function closeNavigation(e) {
    if (e.which === 3 || e.button === 2) return;
    document.documentElement.classList.remove("is-clipped--nav");
    navToggle.classList.remove("is-active");
    navContainer.classList.remove("is-active");
    window.removeEventListener("click", closeNavigation);
    // don't let this event get picked up by window click listener
    concealEvent(e);
  }

  function concealEvent(e) {
    e.stopPropagation();
  }

  function getExpandedItems() {
    return find(".is-active", menuPanel).map(function (item) {
      return item.dataset.id;
    });
  }

  function getNavState() {
    let data = window.sessionStorage.getItem("nav-state");
    return data && (data = JSON.parse(data)).__version__ === "1"
      ? data
      : { __version__: "1" };
  }

  function getMenuState(navState, component, version) {
    const key = version + "@" + component;
    return navState[key] || (navState[key] = {});
  }

  function saveNavState() {
    window.sessionStorage.setItem("nav-state", JSON.stringify(navState));
  }

  function scrollItemIntoView(scrollPosition, parent, el) {
    if (!el) return (parent.scrollTop = scrollPosition);

    const margin = 10;
    //var y = el.getBoundingClientRect().top - parent.getBoundingClientRect().top
    const y = el.offsetTop;

    if (y < scrollPosition) {
      parent.scrollTop = y - margin;
    } else if (y - parent.offsetHeight + el.offsetHeight > scrollPosition) {
      parent.scrollTop = y - parent.offsetHeight + el.offsetHeight + margin;
    } else {
      parent.scrollTop = scrollPosition;
    }
  }

  function find(selector, from) {
    return [].slice.call((from || document).querySelectorAll(selector));
  }

  function findNextElement(from, selector) {
    let el;
    if ("nextElementSibling" in from) {
      el = from.nextElementSibling;
    } else {
      el = from;
      while ((el = el.nextSibling) && el.nodeType !== 1);
    }
    return el && selector
      ? el[el.matches ? "matches" : "msMatchesSelector"](selector) && el
      : el;
  }
})();
