import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';


const imageSourcesProductGallery = [
    './images/yellow-car.jpg',
    './images/yellow-car.jpg',
    './images/yellow-car.jpg',
    './images/yellow-car.jpg',
  ];
document.addEventListener("DOMContentLoaded", () => {
    // Add images here

  const swiperWrapper = document.querySelector('.gallery-main-image .swiper-wrapper');
  const galleryList = document.querySelector('.gallery-list');

  imageSourcesProductGallery.forEach((src, index) => {
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide');
    const img = document.createElement('img');
    img.src = src;
    slide.appendChild(img);
    swiperWrapper.appendChild(slide);

    const thumbnail = document.createElement('li');
    if (index === 0) thumbnail.classList.add('current');
    const thumbImg = document.createElement('img');
    thumbImg.src = src;
    thumbnail.appendChild(thumbImg);
    galleryList.appendChild(thumbnail);

    thumbnail.addEventListener('click', () => {
      productGallery.slideToLoop(index);
    });
  });

  const productGallery = new Swiper('.gallery-main-image', {
    slidesPerView: 1,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    on: {
      slideChange: function (swiper) {
        updateThumbnails(swiper.realIndex);
      },
      init: function () {
        checkControls();
      }
    }
  });

  function checkControls() {
    const productGalleryControls = document.querySelector(".controls-list");
    if (imageSourcesProductGallery.length === 1) {
      productGalleryControls.classList.add("hidden");
    }
  }

  function updateThumbnails(activeIndex) {
    const thumbnails = document.querySelectorAll('.gallery-list li');
    thumbnails.forEach((thumbnail, index) => {
      if (index === activeIndex) {
        thumbnail.classList.add('current');
      } else {
        thumbnail.classList.remove('current');
      }
    });
  }
});
