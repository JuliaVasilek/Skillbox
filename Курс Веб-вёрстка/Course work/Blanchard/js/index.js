window.addEventListener('DOMContentLoaded', function () {

  // //Header Dropdown Scroll-------------------------

  // Array.prototype.forEach.call(
  //   document.querySelectorAll('.data-simplebar'),
  //   el => new SimpleBar()
  // );

  //Header Dropdown-----------------------------------

  let headerLink = document.querySelectorAll('.dropdownOptionBlock__link');
  // let headerDropdown = document.querySelectorAll('.header_bottom_list_item_dropdown');

  headerLink.forEach(function(element){
    element.addEventListener('click', function(e){
      const path = e.currentTarget.dataset.path;

      headerLink.forEach(function(link){
        link.classList.remove('dropdownOptionBlock__link_active');
      });
      e.currentTarget.classList.add('dropdownOptionBlock__link_active');

      // headerDropdown.forEach(function(element){
      //   element.classList.remove('header_bottom_list_item_dropdown--active');
      // });
      document.querySelector(`[data-target="${path}"]`).classList.toggle('dropdownOptionBlock__dropdown_active');
    });
  });

  // Header 1024 Top Burger -----------------------------------------

  let headerTopBurger = document.querySelectorAll('.headerTop__burger');
  let headerTopNav = document.querySelectorAll('.headerTop__nav');
  let headerTopBurgerClose = document.querySelectorAll('.nav__close');
  let headerTopNavLink = document.querySelectorAll('.nav__link');

  headerTopBurger.forEach(function(burger){
    burger.addEventListener('click', function(clickBurger){
      headerTopNav.forEach(function(navOpen){
        navOpen.classList.toggle('headerTop__nav_active');
      });
    });
  });
  headerTopBurgerClose.forEach(function(burgerClose){
    burgerClose.addEventListener('click', function(clickBurgerClose){
      headerTopNav.forEach(function(navClose){
        navClose.classList.toggle('headerTop__nav_active');
      });
    });
  });
  headerTopNavLink.forEach(function(navLink){
    navLink.addEventListener('click', function(clickLink){
      headerTopNav.forEach(function(navLinkClose){
        navLinkClose.classList.toggle('headerTop__nav_active');
      });
    });
  });


  // Header 1024 Top Search -----------------------------------------

  let headerTopSearchToggle = document.querySelectorAll('.hiddenSearch__toggle');
  let headerTopSearch = document.querySelectorAll('.hiddenSearch');
  let headerTopSearchBtn = document.querySelectorAll('.hiddenSearch__btn');
  let headerTopSearchInput = document.querySelectorAll('.hiddenSearch__input');

  headerTopSearchToggle.forEach(function(toggle){
    toggle.addEventListener('click', function(clickToggle){
      headerTopSearch.forEach(function(search){
        search.classList.toggle('headerTop__search_active');
      });
      clickToggle.currentTarget.classList.toggle('hiddenSearch__toggle_active');
      headerTopSearchBtn.forEach(function(searchBtn){
        searchBtn.classList.toggle('hiddenSearch__btn_active');
      });
      headerTopSearchInput.forEach(function(searchInput){
        searchInput.classList.toggle('hiddenSearch__input_active');
      });
    });
  });

  
  //Selector-------------------------------------

  const element = document.querySelector('#selectFilter');
  const choices = new Choices(element, {
    searchEnabled:false,
    shouldSort: false
  });

  //Swiper (Hero)-------------------------------------

  const swiper1 = new Swiper('.hero__swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    }
  });

  //Gallery - Carousel-------------------------------------

  const swiper2 = new Swiper('.gallery__swiper', {
    // Optional parameters
    direction: 'horizontal',
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    pagination: {
      el: '.gallery__pagination',
      type: 'fraction',
    },

    breakpoints: {
      319: {
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
      
      767: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 38,
      },
      
      1023: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 34,
      },

      1919: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 50,
      },
    }

    // breakpoints: {
    //   // when window width is >= 320px
    //   320: {
    //     slidesPerView: 1,
    //   },
    //   
    //   768: {
    //     slidesPerView: 2,
    //     spaceBetween: 34,
    //     grid: {
    //       rows: 2,
    //       },
    //   },
    //   
    //   1024: {
    //     slidesPerView: 2,
    //     spaceBetween: 34,
    //     grid: {
    //       rows: 2,
    //       },
    //   },
    //   // when window width is >= 1920px
    //   1920: {
    //     slidesPerView: 3,
    //     spaceBetween: 50,
    //     grid: {
    //       rows: 2,
    //       },
    //   }
    // },
  });

  //Gallery - Popup

  let paintingLink = document.querySelectorAll('.gallery__item');
  let popupBlock = document.querySelectorAll('.gallery__popups'); 
  let closeBtn = document.querySelectorAll('.popup__close');

  paintingLink.forEach(function(painting){
    painting.addEventListener('click', function(paintingClick){
      const path = paintingClick.currentTarget.dataset.path;

      popupBlock.forEach(function(popups){
        popups.classList.remove('gallery__popups_active');
      });
      document.querySelector(`[data-target="${path}"]`).classList.add('gallery__popups_active');
    });
  });
  closeBtn.forEach(function(close){
    close.addEventListener('click', function(closeClick){
      popupBlock.forEach(function(popups){
        popups.classList.remove('gallery__popups_active');
      });
    });
  });

  //Accordion-------------------------------------

  $( function() {
    $( "#accordion" ).accordion({
      heightStyle: "content",
      header: ".accordion__name"
    });
  });

  //Accordion - Табы ---------------------------------
  let catalogLink = document.querySelectorAll('.accordion__content');
  let catalogTab = document.querySelectorAll('.catalog__artist');

  catalogLink.forEach(function(link){
    link.addEventListener('click', function(linkClick){
      const path = linkClick.currentTarget.dataset.path;

      catalogTab.forEach(function(tab){
        tab.classList.remove('catalog__artist_active');
      });
      document.querySelector(`[data-target="${path}"]`).classList.add('catalog__artist_active');
    });
  });

  //Events - Swiper --------------------------
  const swiper3 = new Swiper('.events__cards', {

    direction: 'horizontal',
  
    pagination: {
      el: '.cardsSwiper__pagination',
    },
  
    navigation: {
      nextEl: '.cardsSwiper__navItem_next',
      prevEl: '.cardsSwiper__navItem_prev',
    },

    breakpoints: {
      319: {
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
      
      767: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 34,
      },
      
      1023: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 27,
      },

      1919: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 50,
      },
    }
  });

  // Projects - Swiper --------------------

  const swiper4 = new Swiper('.partners__cards', {

    direction: 'horizontal',
  
    navigation: {
      nextEl: '.partners__navItem_next',
      prevEl: '.partners__navItem_prev',
    },

    breakpoints: {
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
      
      768: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 34,
      },
      
      1024: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 50,
      },

      1920: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 50,
      },
    }
  });

  // Contacts - Map -----------------------
  
  ymaps.ready(init);
  function init(){
    
    var myMap = new ymaps.Map("contacts__map", {
      center: [55.76025106, 37.61447975],
      zoom: 14,
      controls: []
    });

    myMap.controls.add('zoomControl', {
      size: 'small',
      float: 'right',
      position: {
          right: '10px',
          top: '260px'
      }
    });
    
    myMap.controls.add('geolocationControl', {
      float: 'right',
      position: {
        right: '10px',
        top: '350px'
    }
    });

    var myPlacemark = new ymaps.Placemark([55.76025106, 37.61447975], {
      hintContent: 'Леонтьевский переулок, дом 5/1'
    }, {
      iconLayout: 'default#imageWithContent',
      iconImageHref: '../img/8_Contacts/Placemark.svg',
      iconImageSize: [20, 20],
      iconImageOffset: [0, 0],
    });
    
    myMap.geoObjects.add(myPlacemark);

  }

});