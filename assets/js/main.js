(function($) {

  "use strict";

  /*
  |--------------------------------------------------------------------------
  | Template Name: Seoli
  | Author: ThemeServices
  | Developer: Tamjid Bin Murtoza
  | Version: 1.0.0
  |--------------------------------------------------------------------------
  |--------------------------------------------------------------------------
  | TABLE OF CONTENTS:
  |--------------------------------------------------------------------------
  |
  | 1. Preloader
  | 2. Background Image
  | 3. Primary Menu
  | 4. Scroll Function
  | 5. Footer Sticky
  | 6. Progress Bar
  | 7. Modal Video
  | 8. CountDown
  | 9. Swiper Slider
  | 10. Parallx
  | 11. Tabs
  | 12. Isotop Initialize
  | 13. Accordian
  | 14. Mailchimp
  | 15. Mailchimp
  | 16. Overlay
  | 17. Youtube Background
  | 18. Mailchimp
  | 19. Ajax Contact Form
  |
  */


  /*--------------------------------------------------------------
    ## Scripts initialization
  --------------------------------------------------------------*/
  $.exists = function(selector) {
    return $(selector).length > 0;
  };

  $(window).on("load", function() {
    $(window).trigger("scroll");
    $(window).trigger("resize");
    isotopMsSetup();
    preloaderSetup();
  });

  $(document).on("ready", function() {
    $(window).trigger("resize");
    backgroundImage();
    primaryMenuSetup();
    mobileMenu();
    onePage();
    scrollFunction();
    stickyFooter();
    progressBar();
    swiperSlider();
    modalVideo();
    counterSetup();
    parallax();
    tabs();
    isotopMsSetup();
    accordianSetup();
    rippleSetup();
    layerParallax();
    overlay();
    youtubeBg();
    contactForm();
  });

  $(window).on("resize", function() {
    stickyFooter();
    mobileMenu();
    scrollFunction();
    isotopMsSetup();
  });

  $(window).on("scroll", function() {
    stickyFooter();
    scrollFunction();
  });


  /*--------------------------------------------------------------
    1. Preloader
  --------------------------------------------------------------*/
  function preloaderSetup() {
    $(".ts-preloader-wave").fadeOut();
    $("#ts-preloader").delay(150).fadeOut("slow");
  }
  /*--------------------------------------------------------------
    2. Background Image
  --------------------------------------------------------------*/
  function backgroundImage() {
    if ($.exists(".ts-bg")) {
      $(".ts-bg").each(function() {
        var src = $(this).attr("data-src");
        $(this).css({
          "background-image": "url(" + src + ")"
        });
      });
    }
  }


  /*--------------------------------------------------------------
    3. Primary Menu
  --------------------------------------------------------------*/
  function primaryMenuSetup() {
    $('.ts-main-nav').before('<div class="ts-m-menu-btn"><span></span></div>');
    $('.ts-m-menu-btn').on('click', function() {
      $(this).toggleClass('ts-m-menu-btn-ext');
      $(this).siblings('.ts-main-nav').slideToggle('slow');
    });

    $('.menu-item-has-children ').append('<i class="ts-plus ts-dropdown"></i>');
    $('.ts-dropdown').on('click', function() {
      $(this).prev().slideToggle('slow');
      $(this).toggleClass('ts-plus ts-minus')
    });
    // Mega Menu
    $('.ts-mega-wrapper>li>a').removeAttr("href");
    $('.ts-mega-wrapper>li>a').on('click', function() {
      $(this).siblings().slideToggle();
      $(this).toggleClass('ts-megamenu-plus');
    });
    $('.ts-solid-header.ts-sticky-header').before('<div class="ts-solid-header-height"></div>');
  }

  // Mobile Menu
  function mobileMenu() {
    if ($(window).width() <= 991) {
      $('.ts-primary-nav').addClass('ts-m-menu').removeClass('ts-primary-nav');
      $('.ts-profile-toggle').addClass('ts-offset-menu');
    } else {
      $('.ts-m-menu').addClass('ts-primary-nav').removeClass('ts-m-menu');
      $('.ts-profile-toggle').removeClass('ts-offset-menu');
    }
    var solidHeaderHight = $('.ts-solid-header').height() + 'px';
    $('.ts-solid-header-height').css('height', solidHeaderHight);
  }

  // One Page Nav
  function onePage() {
    $('.ts-onepage .ts-primary-nav-list a').on('click', function() {
      var thisAttr = $(this).attr('href');
      if ($(thisAttr).length) {
        var scrollPoint = $(thisAttr).offset().top - 80;
        $('body,html').animate({
          scrollTop: scrollPoint
        }, 600);
      }
      return false;
    });
  }


  /*--------------------------------------------------------------
    4. Scroll Function
  --------------------------------------------------------------*/

  function scrollFunction() {
    var scroll = $(window).scrollTop();
    // For Small Header
    if (scroll >= 10) {
      $('.ts-site-header').addClass('small-height');
    } else {
      $('.ts-site-header').removeClass('small-height');
    }
  }


  /*--------------------------------------------------------------
    5. Footer Sticky
  --------------------------------------------------------------*/
  function stickyFooter() {
    // Sticky Footer
    var footerHeight = ($('.ts-sticky-footer').height()) + 'px';
    $('.ts-content').css("margin-bottom", footerHeight);
  }


  /*--------------------------------------------------------------
    6. Progress Bar
  --------------------------------------------------------------*/
  function progressBar() {
    // .data('progress-percentage')
    $(".ts-progressbar").each(function() {
      var progressPercentage = $(this).data("progress-percentage") + "%";
      progressPercentage = "calc(" + progressPercentage + " - 4px)";
      $(this).find(".ts-progressbar-in").css("width", progressPercentage);
    });
  }


  /*--------------------------------------------------------------
    7. Modal Video
  --------------------------------------------------------------*/
  function modalVideo() {
    $(document).on('click', '.ts-video-open', function(e) {
      e.preventDefault();
      var video = $(this).attr('href');
      $('.ts-video-popup-container iframe').attr('src', video);
      $('.ts-video-popup').addClass('active');
    });
    $('.ts-video-popup-close, .ts-video-popup-layer').on('click', function(e) {
      $('.ts-video-popup').removeClass('active');
      $('html').removeClass('overflow-hidden');
      $('.ts-video-popup-container iframe').attr('src', 'about:blank')
      e.preventDefault();
    });
  }


  /*--------------------------------------------------------------
    8. CountDown
  --------------------------------------------------------------*/
  function counterSetup() {
    if ($.exists('.ts-counter')) {
      const ready = (selector, callback) => {
      window.addEventListener('DOMContentLoaded', function () {
        const elems = [...document.querySelectorAll(selector)];
        if (elems.length) {
          for (let elem of elems) {
            callback(elem);
          }
        }
      });
    };

    ready('.ts-counter', (stat) => {
      const patt = /(\D+)?(\d+)(\D+)?(\d+)?(\D+)?/;
      const time = 1000;
      let result = [...patt.exec(stat.textContent)];
      let fresh = true;
      let ticks;
      result.shift();
      result = result.filter(res => res != null);
      while (stat.firstChild) {
        stat.removeChild(stat.firstChild);
      }
      for (let res of result) {
        if (isNaN(res)) {
          stat.insertAdjacentHTML('beforeend', `<span>${res}</span>`);
        }
        else {
          for (let i = 0; i < res.length; i++) {
            stat.insertAdjacentHTML('beforeend',
              `<span data-value="${res[i]}">
                <span>&ndash;</span>
                ${Array(parseInt(res[i], 10) + 1).join(0).split(0).map((x, j) => `
                  <span>${j}</span>
                `).join('')}
              </span>`
            );
          }
        }
      }

      ticks = [...stat.querySelectorAll('span[data-value]')];
      let activate = () => {
        let top = stat.getBoundingClientRect().top;
        let offset = (window.innerHeight);

        if (top < offset) {
            for (let tick of ticks) {
              let dist = parseInt(tick.getAttribute('data-value'), 10) + 1;
              tick.style.transform = `translateY(-${(dist) * 100}%)`
            }
          window.removeEventListener('scroll', activate);
        }
      }
      window.addEventListener('scroll', activate);
      activate();
    });
    }
  } 


  /*--------------------------------------------------------------
    9. Swiper Slider
  --------------------------------------------------------------*/
  function swiperSlider() {
    for (var i = 0; i < $('.swiper-container').length; i++) {
      // Swiper Slider Active Mechanisum
      var mySwiper = mySwiper + i;
      var swiperMain = $('.swiper-container').eq(i);
      var swiperControl = swiperMain.parents('.ts-slider');
      swiperMain.addClass('swiper-container' + i);
      swiperControl.find('.pagination').addClass('pagination' + i);
      swiperControl.find('.swiper-arrow-right').addClass('swiper-arrow-right' + i);
      swiperControl.find('.swiper-arrow-left').addClass('swiper-arrow-left' + i);
      // Added Unique Class
      var activeSwiper = '.swiper-container' + i;
      var activePagination = '.pagination' + i;
      var arrowRight = '.swiper-arrow-right' + i;
      var arrowLeft = '.swiper-arrow-left' + i;
      // Auro Play
      var autoPlay = parseInt($(activeSwiper).attr('data-autoplay'), 10);
      (autoPlay === 0) ? (autoPlay = false) : (autoPlay = true);
      // Slider Loop
      var sliderLoop = parseInt($(activeSwiper).attr('data-loop'), 10);
      (sliderLoop === 0) ? (sliderLoop = false) : (sliderLoop = true);
      // Slider effect
      var sliderEffect = $(activeSwiper).attr('data-effect');
      if (sliderEffect === 'fade') {
        sliderEffect = 'fade';
      } else {
        sliderEffect = '';
      }
      // Auro Play Speed
      var sliderSpeed = parseInt($(activeSwiper).attr('data-speed'), 10);
      // Slider Per View
      var slidesPerView = $(activeSwiper).attr('data-slides-per-view');
      var slideView = parseInt($(activeSwiper).attr('data-add-slides'), 10);
      var xlPoint = parseInt($(activeSwiper).attr('data-lg-slides'), 10);
      var lgPoint = parseInt($(activeSwiper).attr('data-md-slides'), 10);
      var mdPoint = parseInt($(activeSwiper).attr('data-sm-slides'), 10);
      var smPoint = parseInt($(activeSwiper).attr('data-xs-slides'), 10);
      var sliderBreakpoints = {};
      if (slidesPerView == 1) {
        slidesPerView = 1;
      } else if (slidesPerView === 'auto') {
        slidesPerView = 'auto';
      } else {
        slidesPerView = slideView;
        sliderBreakpoints = {
          575: {
            slidesPerView: smPoint
          },
          767: {
            slidesPerView: mdPoint
          },
          991: {
            slidesPerView: lgPoint
          },
          1199: {
            slidesPerView: xlPoint
          }
        }
      }

      mySwiper = new Swiper(activeSwiper, {
        loop: sliderLoop,
        autoplay: autoPlay,
        effect: sliderEffect,
        speed: sliderSpeed,
        pagination: {
          el: activePagination,
          clickable: true,
        },
        navigation: {
          nextEl: arrowRight,
          prevEl: arrowLeft,
        },
        slidesPerView: slidesPerView,
        breakpoints: sliderBreakpoints
      });
    }
  }


  /*--------------------------------------------------------------
    10. Parallx
  --------------------------------------------------------------*/
  function parallax() {
    if ($.exists('.ts-parallax')) {
      var numItems = $('.ts-parallax').length;
      for (var loopI = 0; loopI < numItems; loopI++) {
        $('body').find('.ts-parallax').eq(loopI).addClass('ts-parallax' + loopI);
        var speed = $('.ts-parallax' + loopI).data('speed');
        $('.ts-parallax' + loopI).parallax('50%', speed);
      }
    }
  }


  /*--------------------------------------------------------------
    11. Tabs
  --------------------------------------------------------------*/
  function tabs() {
    $('.ts-tabs.ts-fade-tabs .ts-tab-links a').on('click', function(e) {
      var currentAttrValue = $(this).attr('href');
      $('.ts-tabs ' + currentAttrValue).fadeIn(400).siblings().hide();
      $(this).parents('li').addClass('active').siblings().removeClass('active');
      e.preventDefault();
    });
  }


  /*--------------------------------------------------------------
    12. Isotop Initialize
  --------------------------------------------------------------*/
  function isotopMsSetup() {
    if ($.exists('.ts-isotop')) {
      $('.ts-isotop').isotope({
        itemSelector: '.ts-isotop-item',
        transitionDuration: '0.60s',
        percentPosition: true,
        masonry: {
          columnWidth: '.ts-grid-sizer'
        }
      });
      /* Active Class of Portfolio*/
      $('.ts-isotop-filter ul li').on('click', function(event) {
        $(this).siblings('.active').removeClass('active');
        $(this).addClass('active');
        event.preventDefault();
      });
      /*=== Portfolio filtering ===*/
      $('.ts-isotop-filter ul').on('click', 'a', function() {
        var filterElement = $(this).attr('data-filter');
        $(this).parents('.ts-isotop-filter').next().isotope({
          filter: filterElement
        });
      });
    }
  }


  /*--------------------------------------------------------------
    13. Accordian
  --------------------------------------------------------------*/

  function accordianSetup() {
    var $this = $(this);
    $('.ts-accordian').children('.ts-accordian-body').hide();
    $('.ts-accordian.active').children('.ts-accordian-body').show();
    $('.ts-accordian-title').on('click', function() {
      $(this).parent('.ts-accordian').siblings().children('.ts-accordian-body').slideUp(250);
      $(this).siblings().slideDown(250);
      /* Accordian Active Class */
      $(this).parents('.ts-accordian').addClass('active');
      $(this).parent('.ts-accordian').siblings().removeClass('active');
    });
  }


  /*--------------------------------------------------------------
    14. Mailchimp
  --------------------------------------------------------------*/
  function rippleSetup() {
    if ($.exists('.ripple-version')) {
      $('.ripple-version').ripples({
        resolution: 512,
        dropRadius: 20,
        perturbance: 0.04,
      });
    }
  }


  /*--------------------------------------------------------------
    15. Mailchimp
  --------------------------------------------------------------*/
  function layerParallax() {
    if ($.exists('#ts-sayer-parallax')) {
      var scene = document.getElementById('ts-sayer-parallax');
      var parallax = new Parallax(scene);
    }
  }


  /*--------------------------------------------------------------
    16. Overlay
  --------------------------------------------------------------*/
  function overlay() {
    $(".ts-overlay").each(function() {
      var overlayOpacity = $(this).attr("data-opacity");
      $(this).css('opacity', overlayOpacity);
    });
  }


  /*--------------------------------------------------------------
    17. Youtube Background
  --------------------------------------------------------------*/
  function youtubeBg() {
    if ($.exists('.player')) {
      $(".player").YTPlayer();
    }
  }


  /*--------------------------------------------------------------
    18. Mailchimp
  --------------------------------------------------------------*/
  if ($.exists('.mailchimp')) {
     // active mailchimp 
     if ($('.mailchimp').length > 0) {
      $('.mailchimp').ajaxChimp({
        language: 'es',
        callback: mailchimpCallback
      });
    }

    function mailchimpCallback(resp) {
        // Check For Available Email
        if (resp.result === 'success') {
          $('.subscription-success').html('<i class="fa fa-check"></i><br/>' + resp.msg).fadeIn(1000);
          $('.subscription-error').fadeOut(500);

        } else if (resp.result === 'error') {
          $('.subscription-error').html('<i class="fa fa-times"></i><br/>' + resp.msg).fadeIn(1000);
        }
      }
    // Mailchimp Alart Message
    $.ajaxChimp.translations.es = {
      'submit': 'Submitting...',
      0: 'We have sent you a confirmation email',
      1: 'Please enter a value',
      2: 'An email address must contain a single @',
      3: 'The domain portion of the email address is invalid (the portion after the @: )',
      4: 'The username portion of the email address is invalid (the portion before the @: )',
      5: 'This email address looks fake or invalid. Please enter a real email address'
    };
  }


  /*--------------------------------------------------------------
    19. Ajax Contact Form
  --------------------------------------------------------------*/

  function contactForm() {
    if ($.exists('#submit')) {
      $('#cf-msg').hide();
      $('#cf #submit').on('click', function() {
        var name = $('#name').val();
        var subject = $('#subject').val();
        var email = $('#email').val();
        var msg = $('#msg').val();
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (!regex.test(email)) {
          $('#cf-msg').fadeIn().html('<div class="alert alert-danger"><strong>Warning!</strong> Please Enter Valied Email.</div>');
          return false;
        }

        name = $.trim(name);
        subject = $.trim(subject);
        email = $.trim(email);
        msg = $.trim(msg);

        if (name != '' && email != '' && msg != '') {
          var values = "name=" + name + "&subject=" + subject + "&email=" + email + " &msg=" + msg;
          $.ajax({
            type: "POST",
            url: "assets/php/mail.php",
            data: values,
            success: function() {
              $('#name').val('');
              $('#subject').val('');
              $('#email').val('');
              $('#msg').val('');

              $('#cf-msg').fadeIn().html('<div class="alert alert-success"><strong>Success!</strong> Email has been sent successfully.</div>');
              setTimeout(function() {
                $('#cf-msg').fadeOut('slow');
              }, 4000);
            }
          });
        } else {
          $('#cf-msg').fadeIn().html('<div class="alert alert-danger"><strong>Warning!</strong> All fields are required.</div>');
        }
        return false;
      });
    }
  }


})(jQuery); // End of use strict
