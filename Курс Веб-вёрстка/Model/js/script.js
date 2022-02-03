window.addEventListener('DOMContentLoaded', function () {

  //Select

  const element = document.querySelector('#selectCustom');
  const choices = new Choices(element, {
    searchEnabled:false,
    shouldSort: false
  });

  document.querySelector('.choices__inner').classList.add('choices__inner-toggle');


  //Map

  ymaps.ready(init);
  function init(){
    var myMap = new ymaps.Map("myMap1", {
        center: [48.872185, 2.354224],
        zoom: 15
    });
    
    // var myGeoObject = new ymaps.GeoObject({
    //   geometry:{
    //     type:"Point",
    //     coordinates: [48.87, 2.35]
    //   }
    // });

    var myPlacemark = new ymaps.Placemark([48.872185, 2.354224],{},{
      iconLayout:'default#image',
      iconImageHref:'../img/Mark.svg',
      iconImageSize: [28,40],
      iconImageOffset: [-3,-42]
    });

    // myMap.geoObjects.add(myGeoObject);
    myMap.geoObjects.add(myPlacemark);
  }

  //Form

  var selector = document.querySelector("input[type='tel']");
  var im = new Inputmask("+7 (999) 999-99-99");

  im.mask(selector);
  
  new JustValidate('.customForm', {
    rules:{
      name:{
        required: true,
        minLength: 2,
        maxLength: 10
      },
      tel:{
        required: true,
        function:(name, value)=>{

          console.log(im.isValid(value));

          const phone = selector.inputmask.unmaskedvalue();
          return Number(phone) && phone.length === 10;
        }
      },
      mail:{
        required: true,
        email: true
      },
    },
  });

});