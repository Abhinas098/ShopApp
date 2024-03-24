// JavaScript
const backdrop = document.querySelector('.backdrop');
const sideDrawer = document.querySelector('.mobile-nav');
const menuToggle = document.querySelector('#side-menu-toggle');
const closeBtn = document.querySelector('.close-btn');


function closeBtnClickHandler() {
  backdrop.style.display = 'none';
  sideDrawer.classList.remove('open');
}

function menuToggleClickHandler() {
  backdrop.style.display = 'block';
  sideDrawer.classList.add('open');
}

backdrop.addEventListener('click', closeBtnClickHandler);
menuToggle.addEventListener('click', menuToggleClickHandler);
closeBtn.addEventListener('click', closeBtnClickHandler);
