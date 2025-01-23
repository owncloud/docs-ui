;(function () {
  'use strict'

  const navbarBurger = document.querySelector('.navbar-burger')
  if (!navbarBurger) return
  navbarBurger.addEventListener('click', toggleNavbarMenu.bind(navbarBurger))

  function toggleNavbarMenu (e) {
    e.stopPropagation() // trap event
    document.documentElement.classList.toggle('is-clipped--navbar')
    navbarBurger.setAttribute('aria-expanded', this.classList.toggle('is-active'))
    const menu = document.getElementById(this.getAttribute('aria-controls') || this.dataset.target)
    if (menu.classList.toggle('is-active')) {
      menu.style.maxHeight = ''
      const expectedMaxHeight = window.innerHeight - Math.round(menu.getBoundingClientRect().top)
      const actualMaxHeight = parseInt(window.getComputedStyle(menu).maxHeight, 10)
      if (actualMaxHeight !== expectedMaxHeight) menu.style.maxHeight = expectedMaxHeight + 'px'
    }
  }
})()
