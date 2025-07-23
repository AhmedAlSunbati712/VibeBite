$(document).ready(function () {
    function checkFadeIn() {
      var windowBottom = $(window).scrollTop() + $(window).height();
  
      $(".fade-in-element").each(function () {
        var elemTop = $(this).offset().top;
  
        if (elemTop < windowBottom - 50) { // 50px before element fully in view
          $(this).addClass("visible");
        }
      });
    }
  
    // Run on page load and on scroll
    $(window).on("scroll", checkFadeIn);
    checkFadeIn();
  });
  