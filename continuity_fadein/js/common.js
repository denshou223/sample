      $(document).ready(function(){
          var EffectTime = 500;
          var DelayTime = 500;
          $('.list li').css({ opacity: 0 });
          $(window).on('scroll load', function() {
            var scMiddle = $(this).scrollTop() + $(this).height() / 2;
            var listPos = $('.list').offset().top;
            if ( listPos < scMiddle ) {
              $('.list li').each( function(index) {
                $(this).delay(DelayTime * index).animate({'opacity': 1}, EffectTime);
              });
            }
        });
      });