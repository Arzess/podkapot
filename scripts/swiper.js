import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';

const swiperContainer = document.querySelector('.gallery-container');
const desktopPagination = document.querySelector('[data-pagination="desktop"]');
const mobilePagination = document.querySelector('[data-pagination="mobile"]');

const heroSwiper = new Swiper(swiperContainer, {
  slidesPerView: 1,
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  on: {
    init: function (swiper) {
      setTimeout(() => {
        createPagination(swiper, desktopPagination);
        createPagination(swiper, mobilePagination);
      }, 100);
    },
    slideChange: function (swiper) {
      updatePagination(swiper, desktopPagination);
      updatePagination(swiper, mobilePagination);
    }
  }
});

function createPagination(swiper, paginationContainer) {
  if (!paginationContainer) return;

  paginationContainer.innerHTML = '';
  const totalSlides = swiper.slides.length - swiper.loopedSlides * 2 || swiper.slides.length;

  for (let i = 0; i < totalSlides; i++) {
    let li = document.createElement('li');
    li.classList.add('page');
    let a = document.createElement('a');
    a.href = '#';
    li.appendChild(a);
    paginationContainer.appendChild(li);

    li.addEventListener('click', (e) => {
      e.preventDefault();
      swiper.slideToLoop(i);
    });
  }

  updatePagination(swiper, paginationContainer);
}

function updatePagination(swiper, paginationContainer) {
  if (!paginationContainer) return;

  let pages = paginationContainer.querySelectorAll('.page');
  pages.forEach((page, index) => {
    if (index === swiper.realIndex) {
      page.classList.add('selected');
    } else {
      page.classList.remove('selected');
    }
  });
}
