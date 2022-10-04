window.addEventListener('DOMContentLoaded', function () {

  // //Header Dropdown Scroll-------------------------

  // Array.prototype.forEach.call(
  //   document.querySelectorAll('.data-simplebar'),
  //   el => new SimpleBar()
  // );

  //Header Dropdown-----------------------------------

  let headerLink = document.querySelectorAll('.header_bottom_list_item_link');
  // let headerDropdown = document.querySelectorAll('.header_bottom_list_item_dropdown');

  headerLink.forEach(function(element){
    element.addEventListener('click', function(e){
      const path = e.currentTarget.dataset.path;

      headerLink.forEach(function(link){
        link.classList.remove('header_bottom_list_item_link--active');
      });
      e.currentTarget.classList.add('header_bottom_list_item_link--active');

      // headerDropdown.forEach(function(element){
      //   element.classList.remove('header_bottom_list_item_dropdown--active');
      // });
      document.querySelector(`[data-target="${path}"]`).classList.toggle('header_bottom_list_item_dropdown--active');
    });
  });

  // Header 1024 Top Burger -----------------------------------------

  let headerTopBurger = document.querySelectorAll('.header_top_burger');
  let headerTopNav = document.querySelectorAll('.header_top_nav');
  let headerTopBurgerClose = document.querySelectorAll('.header_top_nav_close');

  headerTopBurger.forEach(function(burger){
    burger.addEventListener('click', function(clickBurger){
      headerTopNav.forEach(function(navOpen){
        navOpen.classList.toggle('header_top_nav-active');
      });
    });
  });
  headerTopBurgerClose.forEach(function(burgerClose){
    burgerClose.addEventListener('click', function(clickBurgerClose){
      headerTopNav.forEach(function(navClose){
        navClose.classList.toggle('header_top_nav-active');
      });
    });
  });


  // Header 1024 Top Search -----------------------------------------

  let headerTopSearch = document.querySelectorAll('.header_top_search');
  let headerTopSearchToggle = document.querySelectorAll('.header_top_search_toggle');
  let headerTopSearchBtn = document.querySelectorAll('.top-search-btn');
  let headerTopSearchInput = document.querySelectorAll('.top-search-input');

  headerTopSearchToggle.forEach(function(toggle){
    toggle.addEventListener('click', function(clickToggle){
      headerTopSearch.forEach(function(search){
        search.classList.toggle('header_top_search-active');
      });
      clickToggle.currentTarget.classList.toggle('header_top_search_toggle-active');
      headerTopSearchBtn.forEach(function(searchBtn){
        searchBtn.classList.toggle('top-search-btn-active');
      });
      headerTopSearchInput.forEach(function(searchInput){
        searchInput.classList.toggle('top-search-input-active');
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

  const swiper1 = new Swiper('.hero-swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
  });

  //Gallery - Carousel-------------------------------------

  const swiper2 = new Swiper('.gallery-swiper', {
    // Optional parameters
    direction: 'horizontal',
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    pagination: {
      el: '.gallery_paintings_nav_pag',
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

  let paintingLink = document.querySelectorAll('.gallery_paintings_slider_item');
  let popupBlock = document.querySelectorAll('.gallery_popups'); 
  let closeBtn = document.querySelectorAll('.gallery_popups_item_close');

  paintingLink.forEach(function(painting){
    painting.addEventListener('click', function(paintingClick){
      const path = paintingClick.currentTarget.dataset.path;

      popupBlock.forEach(function(popups){
        popups.classList.remove('gallery_popups-active');
      });
      document.querySelector(`[data-target="${path}"]`).classList.add('gallery_popups-active');
    });
  });
  closeBtn.forEach(function(close){
    close.addEventListener('click', function(closeClick){
      popupBlock.forEach(function(popups){
        popups.classList.remove('gallery_popups-active');
      });
    });
  });

  //Accordion-------------------------------------

  $( function() {
    $( "#accordion" ).accordion({
      hightStyle: "content",
      header: ".catalog_content_accordion_item-name"
    });
  });

  //Accordion - Табы ---------------------------------
  let catalogLink = document.querySelectorAll('.catalog_content_accordion_item_content');
  let catalogTab = document.querySelectorAll('.catalog_content_artist');

  catalogLink.forEach(function(link){
    link.addEventListener('click', function(linkClick){
      const path = linkClick.currentTarget.dataset.path;

      catalogTab.forEach(function(tab){
        tab.classList.remove('catalog_content_artist-active');
      });
      document.querySelector(`[data-target="${path}"]`).classList.add('catalog_content_artist-active');
    });
  });

  //Events - Swiper --------------------------
  const swiper3 = new Swiper('.events_cards-swiper', {

    direction: 'horizontal',
  
    pagination: {
      el: '.events_cards-swiper_pagination',
    },
  
    navigation: {
      nextEl: '.events_cards-swiper_btns_next',
      prevEl: '.events_cards-swiper_btns_prev',
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

  const swiper4 = new Swiper('.projects_partners_links_swiper', {

    direction: 'horizontal',
  
    navigation: {
      nextEl: '.projects_partners_links_swiper_btn-next',
      prevEl: '.projects_partners_links_swiper_btn-prev',
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
    
    var myMap = new ymaps.Map("contacts_map", {
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

    var myPlacemark = new ymaps.Placemark([55.76025106, 37.61447975], {}, {
      iconLayout: 'default#image',
      iconImageHref: '../img/8_Contacts/Placemark.svg',
      iconImageSize: [20, 20],
      iconImageOffset: [0, 0]
    });
    
    myMap.geoObjects.add(myPlacemark);
  }

});