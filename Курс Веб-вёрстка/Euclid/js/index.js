window.addEventListener('DOMContentLoaded', function () {

//Swiper

  const swiper = new Swiper('.swiper-container', {
    // Optional parameters
    loop: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
  });

  //Tabs (steps)

  document.querySelectorAll('.tabs_btn').forEach(function(tabsBtn){

    tabsBtn.addEventListener('click', function(event){

      document.querySelectorAll('.tabs_btn').forEach(function(tabsBtnActive){

        tabsBtnActive.classList.remove('tabs_btn-active');

      });

      const path=event.currentTarget.dataset.path;

      document.querySelector(`[data-path="${path}"]`).classList.add('tabs_btn-active');

      document.querySelectorAll('.tab-content').forEach(function(tabContent){

        tabContent.classList.remove('tab-content-active');

      });

      document.querySelector(`[data-target="${path}"]`).classList.add('tab-content-active');
      
    });
  });

  //Accordion

  document.querySelectorAll('.section-Questions__accordion__title').forEach(function(accordionTitle){

    accordionTitle.addEventListener('click', function(event){

      document.querySelectorAll('.section-Questions__accordion__title').forEach(function(accordionTitleActive){

        accordionTitleActive.classList.add('title-after');

        accordionTitleActive.classList.remove('section-Questions__accordion__title-active');

      });

      event.currentTarget.classList.remove('title-after');

      event.currentTarget.classList.add('section-Questions__accordion__title-active');

    });

  });

  //Burger

  document.querySelectorAll('.nav-burger').forEach(function (burger){

    burger.addEventListener('click', function(event){

      document.querySelector('.header__burger-menu').classList.toggle('header__burger-menu-disabled');

      document.querySelector('.header__burger-menu').classList.toggle('header__burger-menu-active');

    });

    burger.addEventListener('keydown', function(event){

      if (event.keyCode == 13) {

        document.querySelector('.header__burger-menu').classList.toggle('header__burger-menu-disabled');

        document.querySelector('.header__burger-menu').classList.toggle('header__burger-menu-active');
  
      }

    });

  });

});