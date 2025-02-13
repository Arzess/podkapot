import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';



document.addEventListener("DOMContentLoaded", () => {
  // To fix the "grid: 2" problem with SwiperJS
  const casesElement = document.querySelector(".successful-cases-list")
  
  if (window.innerWidth < 1300) {
    const totalWidth = Array.from(casesElement.children).reduce((init, child) => {
        const style = window.getComputedStyle(child);
        const width = parseFloat(style.width);
        return init + width;
      }, 0);
  
  casesElement.style.minWidth = `${totalWidth / 4}px`;
}
  const swiperContainer2 = document.querySelector('.gallery-container-2');
  const customPagination2 = document.querySelector('[data-pagination="two"]');

  const swiperTwo = new Swiper(swiperContainer2, {
    grid: {
      rows: 1,
    },
    breakpoints: {
      1300: {
        slidesPerView: 2,
        grid: {
          rows: 1,
        },
      },
      700: {
        slidesPerView: 1,
        grid: {
          rows: 2,
        },
      },
      0: {
        slidesPerView: 1,
        grid: {
          rows: 2,
        },
      },
    },
    loop: true,
    spaceBetween: 24,
    on: {
      init: function (swiperTwo) {
        createPagination(swiperTwo, customPagination2);
      },
      slideChange: function (swiperTwo) {
        updatePagination(swiperTwo, customPagination2);
      },
    },
  });

  function createPagination(swiper, paginationContainer) {
    if (!paginationContainer) return;

    paginationContainer.innerHTML = '';
    let totalSlides = swiper.slides.length;
    if (window.innerWidth < 1300 && window.innerWidth > 500){
      totalSlides =  Math.round(swiper.slides.length/2);
      
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
