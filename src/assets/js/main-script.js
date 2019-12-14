"use strict";
/************* Ajax Mailchimp ****************/

$('#mc-form').ajaxChimp({
   url: 'http://doelit.us10.list-manage.com/subscribe/post?u=b02e4f21e264536eff4820875&amp;id=4d57faf2cb'
      /* Replace Your AjaxChimp Subscription Link */
});

/************* Count Down Timmer ****************/

$('.countdown').downCount({
   date: '12/31/2018 12:00:00', // date in format MM/DD/YYYY HH:MM:SS
   offset: +10
}, function() {
   
});

/*************************************************

    NO NEED TO CHANGE ANYTHING BELOW THIS LINE 
    
**************************************************/
/*************** waypoint jQuery *****************/

$(function() {
   function onScrollInit(items, trigger) {
      items.each(function() {
         var Element = $(this),
            AnimationDelay = Element.attr('data-animation-delay'),
            AnimationDuration = Element.attr('data-animation-duration');

         var Trigger = (trigger) ? trigger : Element;

         Trigger.waypoint(function(direction) {
            Element.css({
               '-webkit-animation-delay': AnimationDelay,
               '-moz-animation-delay': AnimationDelay,
               'animation-delay': AnimationDelay,
               '-webkit-animation-duration': AnimationDuration,
               '-moz-animation-duration': AnimationDuration,
               'animation-duration': AnimationDuration
            });
            Element.addClass('animated');
         }, {
            triggerOnce: true,
            offset: '90%'
         });
      });
   }
   onScrollInit($('.animation'));

   function commaSeparateNumber(val) {
      while (/(\d+)(\d{3})/.test(val.toString())) {
         val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
      }
      return val;
   }

   $('.project-content').waypoint(function(direction) {
      $('.counter').each(function() {
         $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
         }, {
            duration: 4000,
            easing: 'swing',
            step: function(now) {
               $(this).text(commaSeparateNumber(Math.ceil(now)));
            }
         });
      });
   }, {
      triggerOnce: true,
      offset: '90%'
   });

   /************* Bootstrap ToolTip ****************/

   $('[data-toggle="tooltip"]').tooltip();

   /************* Preloader jQuery ****************/

   setTimeout(function() {
      $('body').addClass('loaded');
   }, 3000);

   /************* Smooth scroll ****************/

   $('.scroll a[href*=#]').on("click", function() {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {

         var target = $(this.hash);
         target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
         if (target.length) {
            $('html,body').animate({
               scrollTop: target.offset().top
            }, 800);
            return false;
         }
      }
   });

   /************* custom class add in modal jQuery ****************/

   $(document)
      .on('hidden.bs.modal', '.modal', function() {
         $(document.body).removeClass('modal-scrollbar');
      })
      .on('show.bs.modal', '.modal', function() {
         // Bootstrap's .modal-open class hides any scrollbar on the body,
         // so if there IS a scrollbar on the body at modal open time, then
         // add a right margin to take its place.
         if ($(window).height() < $(document).height()) {
            $(document.body).addClass('modal-scrollbar');
         }
      });

});

/************* Scroll To Top ****************/
$(window).scroll(function() {
   if ($(this).scrollTop() > 100) {
      $('.scroll-up').fadeIn();
   } else {
      $('.scroll-up').fadeOut();
   }
});

/************* stellar ****************/
$.stellar({
   horizontalScrolling: false,
   responsive: true
});

/************* Feature iphone ****************/
// bootstrap scroll spy
$('body').scrollspy({
   target: '.sidebar'
});

/************* Sidebar menu ****************/
$("#menu-toggle").on("click", function(e) {
   e.preventDefault();
   $("#sidebar-wrapper").toggleClass("active");
   e.stopPropagation();
});

$("#menu-close").on("click", function(e) {
   e.preventDefault();
   $("#sidebar-wrapper").removeClass("active");
   e.stopPropagation();
});