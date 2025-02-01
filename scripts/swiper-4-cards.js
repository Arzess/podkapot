import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';



document.addEventListener("DOMContentLoaded", () => {
  // To fix the "grid: 2" problem with SwiperJS
  const catalogElement = document.querySelector(".catalog-list")
  if (window.innerWidth < 1300 && window.innerWidth > 500) {
  const totalWidth = Array.from(catalogElement.children).reduce((init, child) => {
    return init + child.offsetWidth;
  }, 0);

  catalogElement.style.minWidth = `${totalWidth / 4}px`;
}
  const swiperContainer = document.querySelector('.gallery-container-4');
  const customPagination = document.querySelector('[data-pagination="four"]');

  const swiperFour = new Swiper(swiperContainer, {
    grid: {
      rows: 1,
    },
    breakpoints: {
      1300: {
        slidesPerView: 4,
        grid: {
          rows: 1,
        },
      },
      700: {
        slidesPerView: 2,
        grid: {
          rows: 2,
          fill: 'row',
        },
      },
      0: {
        slidesPerView: 1,
        grid: {
          rows: 1,
        },
      },
    },
    loop: true,
    on: {
      init: function (swiperFour) {
        setTimeout(() => {
          createPagination(swiperFour, customPagination);
        }, 200);
      },
      slideChange: function (swiperFour) {
        updatePagination(swiperFour, customPagination);
      },
    },
  });

  function createPagination(swiper, paginationContainer) {
    if (!paginationContainer) return;

    paginationContainer.innerHTML = '';
    let totalSlides = swiper.slides.length - swiper.loopedSlides * 2 || swiper.slides.length;
    if (window.innerWidth < 1300){
      totalSlides =  swiper.slides.length/2 - swiper.loopedSlides * 2 || swiper.slides.length/2;
    }
    for (let i = 0; i < totalSlides; i++) {
      const li = document.createElement('li');
      li.classList.add('page');
      const a = document.createElement('a');
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

    const pages = paginationContainer.querySelectorAll('.page');
    pages.forEach((page, index) => {
      if (index === swiper.realIndex) {
        page.classList.add('selected');
      } else {
        page.classList.remove('selected');
      }
    });
  }
});
