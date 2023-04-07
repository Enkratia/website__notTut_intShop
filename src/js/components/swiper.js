import Swiper, { Pagination, Navigation, EffectFade } from 'swiper';

// HERO SWIPER
const heroSwiper = new Swiper("#hero-swiper", {
  modules: [Pagination, Navigation, EffectFade],
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
  loop: true,
  navigation: {
    nextEl: '#hero-button-next',
    prevEl: '#hero-button-prev',
  },
  pagination: {
    el: '#hero-pagination',
    clickable: true,
  },
});

// TOP-CATEGORIES SWIPER
const topCategoriesSwiper = new Swiper("#top-categories-swiper", {
  modules: [Pagination],
  loop: true,
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 20,
  pagination: {
    el: '#top-categories-pagination',
    clickable: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 3,
      spaceBetween: 30
    },
    400: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 20
    }
  }
});

// To enable controls on small displays
const mediaquery767 = window.matchMedia("(min-width: 768px)");
const mediaquery768 = window.matchMedia("(max-width: 767px)");

function enableTopCategoriesSwiper() {
  if (mediaquery767.matches) {
    topCategoriesSwiper.disable();
    topCategoriesSwiper.setProgress(0, 0);
  }
}

function disableTopCategoriesSwiper() {
  if (mediaquery768.matches) {
    topCategoriesSwiper.enable();
  }
}

mediaquery767.addEventListener("change", enableTopCategoriesSwiper);
mediaquery767.addEventListener("change", disableTopCategoriesSwiper);
enableTopCategoriesSwiper();

// NEW ARRIVALS SWIPER
const newArrivalsSwiper = new Swiper("#new-arrivals-slider", {
  modules: [Pagination],
  loop: true,
  slidesPerView: 1,
  spaceBetween: 20,
  pagination: {
    el: "#new-arrivals-pagination",
    clickable: true,
  },
  breakpoints: {
    1400: {
      slidesPerView: 6,
      spaceBetween: 30,
    },
    1200: {
      slidesPerView: 5,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
    600: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    420: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    375: {
      slidesPerView: 1,
      spaceBetween: 20,
    }
  }
});

// POPULAR CATEGORIES SWIPER
const popularCategoriesSwiper = new Swiper("#popular-categories-slider", {
  modules: [Pagination],
  enabled: true,
  loop: true,
  speed: 700,
  slidesPerView: 1,
  spaceBetween: 30,
  pagination: {
    el: '#popular-categories-pagination',
    clickable: true,
  },
  breakpoints: {
    1290: {
      enabled: false,
      slidesPerView: 6,
      spaceBetween: 30,
    },
    1075: {
      enabled: true,
      slidesPerView: 5,
      slidesPerGroup: 4,
      spaceBetween: 30,
    },
    860: {
      enabled: true,
      slidesPerView: 4,
      slidesPerGroup: 3,
      spaceBetween: 30,
    },
    635: {
      enabled: true,
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 20,
    },
    430: {
      enabled: true,
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 20,
    }
  }
});

function resetProgressPopularCategoriesSwiper() {
  if (mediaquery767.matches) {
    popularCategoriesSwiper.setProgress(0, 0);
  }
}

mediaquery767.addEventListener("change", resetProgressPopularCategoriesSwiper);

// TRENDING NOW SWIPER
const trendingNowSwiper = new Swiper("#trending-now-slider", {
  modules: [Navigation],
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  navigation: {
    nextEl: '#trending-now-button-next',
    prevEl: '#trending-now-button-prev',
  },
   breakpoints: {
    900: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    480: {
      slidesPerView: 2,
      spaceBetween: 20,
    }
   }
});

// SALE SWIPER
const saleSwiper = new Swiper("#sale-slider", {
  modules: [Navigation],
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  navigation: {
    nextEl: '#sale-button-next',
    prevEl: '#sale-button-prev',
  },
   breakpoints: {
    900: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    480: {
      slidesPerView: 2,
      spaceBetween: 20,
    }
   }
});