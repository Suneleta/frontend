$(function() {
  function fillModal(id) {
    $('#modal .title').text(modalText[id].title);
    $('#modal .detail').text(modalText[id].detail);
    $('#modal .tag').text(modalText[id].tag);
    if (modalText[id].link)
      $('#modal .button')
        .addClass('visible')
        .parent()
        .attr('href', modalText[id].link);

    $.each($('#modal li'), function(index, value) {
      $(this).text(modalText[id].bullets[index]);
    });
    $.each($('#modal .slide'), function(index, value) {
      $(this).css({
        background:
          "url('images/slides/" + id + '-' + index + ".jpg') center center/cover",
        backgroundSize: 'cover'
      });
    });
  }
  var modalText = {
    vueling: {
      title: 'Vueling Airlines',
      tag: 'AIRLINE INDUSTRY APPS',
      detail:
      'Vueling Airlines is the largest low cost airline in Spain with over 100 destinations around Europe. We create frontend solutions for its multiple platforms and apps, using Angular, Vue.js, SCSS and HTML.',
      link: 'https://vueling.com/'
    },
    swapskills: {
      title: 'SwapSkills',
      tag: 'INTERCHANGING SERVICES APP FOR THE COMMUNITY',
      detail:
        'SwapSkills is an app to help interchanging services in the neighbourhoods of Barcelona. The target is to serve people´s needs easily and help create social bonds that contribute to better everyday life and the overall happiness of the individual.',
      link: 'https://swapskill-456e8.firebaseapp.com/'
    },
    uxavant: {
      title: 'uxavant',
      tag: 'UX DESIGN EVENT PROGRAM',
      detail:
        'UxAvant is a festival about UX held every year by Elisava University in Barcelona.',
      link: 'http://ux-avant.elisava.net/'
    },
    movies: {
      title: 'Movies filter',
      tag: 'API INTEGRATION FILTERING',
      detail:
        'Movies filter is quite self-explanatorily an app filtering through a movies API.',
      link: 'https://suneleta.github.io/movies-react/'
    },
    beers: {
      title: 'Choose your beer',
      tag: 'API INTEGRATION FILTERING',
      detail:
        'A fun application helping the user go through a vast array of beers and find out the one.',
      link: 'https://suneleta.github.io/beers-api/'
    },
    travelmate: {
      title: 'Travelmate',
      tag: 'TRAVEL APP DESIGN DEVELOPMENT',
      detail:
          'Travelmate is an app supporting sustainable tourism in Barcelona. Ari, the friendly chatbot that is the heart of the app, shows you around the hidden gems of the city while promoting an eco-friendly behaviour as well as respect for the local customs.',
      link: 'https://projects.invisionapp.com/share/WKM751QJTU7#/screens'
    },
  };
  
  var carousel = $('#carousel'),
  slideWidth = 700,
  threshold = slideWidth / 3,
  dragStart,
  dragEnd;

$('#next').click(function() {
  shiftSlide(-1);
});
$('#prev').click(function() {
  shiftSlide(1);
});

carousel.on('mousedown', function() {
  if (carousel.hasClass('transition')) return;
  dragStart = event.pageX;
  $(this).on('mousemove', function() {
    dragEnd = event.pageX;
    $(this).css('transform', 'translateX(' + dragPos() + 'px)');
  });
  $(document).on('mouseup', function() {
    if (dragPos() > threshold) {
      return shiftSlide(1);
    }
    if (dragPos() < -threshold) {
      return shiftSlide(-1);
    }
    shiftSlide(0);
  });
});

function dragPos() {
  return dragEnd - dragStart;
}

function shiftSlide(direction) {
  if (carousel.hasClass('transition')) return;
  dragEnd = dragStart;
  $(document).off('mouseup');
  carousel
    .off('mousemove')
    .addClass('transition')
    .css('transform', 'translateX(' + direction * slideWidth + 'px)');
  setTimeout(function() {
    if (direction === 1) {
      $('.slide:first').before($('.slide:last'));
    } else if (direction === -1) {
      $('.slide:last').after($('.slide:first'));
    }
    carousel.removeClass('transition');
    carousel.css('transform', 'translateX(0px)');
  }, 700);
}

setDimensions();
function setDimensions() {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    slideWidth = $(window).innerWidth();
  }
  $('.carousel-wrap, .slide').css('width', slideWidth);
  $('.modal').css('max-width', slideWidth);
  $('#carousel').css('left', slideWidth * -1);
}
    //Set Date to Current Year
    var date = new Date().getFullYear();
    $('#footer-date').html(date);
    $('#gallery .button').on('click', function() {
      $('.modal-wrap').addClass('visible');
      fillModal(this.id);
    });

  $('.close').on('click', function() {
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  $('.mask').on('click', function() {
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  var isMobile;
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    isMobile = true;

    // Mobile height fix
    $('.height-fix').each(function() {
      var h = $(this).height();
      $(this).height(h);
    });
  }

  // RESIZE RESETS
  $(window).resize(function() {
    posFilterBar($('.filter').first());
  });

  // Sticky Nav on Mobile
  if (isMobile) {
    $('nav').addClass('fixed');
  } else {
    $('nav').addClass('desk');
  }

  // NAV POSITION
  var navPos = $('nav').position().top;
  var lastPos = 0;
  var lockTimer;

  $(window).on('scroll', function() {
    var pos = $(window).scrollTop();
    var pos2 = pos + 50;
    var scrollBottom = pos + $(window).height();

    if (!isMobile) {
      if (pos >= navPos + $('nav').height() && lastPos < pos) {
        $('nav').addClass('fixed');
      }
      if (pos < navPos && lastPos > pos) {
        $('nav').removeClass('fixed');
      }
      lastPos = pos;
    }

    // Link Highlighting
    if (pos2 > $('#home').offset().top) {
      highlightLink('home');
    }
    if (pos2 > $('#about').offset().top) {
      highlightLink('about');
    }
    if (pos2 > $('#portfolio').offset().top) {
      highlightLink('portfolio');
    }
    if (pos2 > $('#blog').offset().top) {
      highlightLink('blog');
    }
    if (
      pos2 > $('#contact').offset().top ||
      pos + $(window).height() === $(document).height()
    ) {
      highlightLink('contact');
    }

    // Prevent Hover on Scroll
    clearTimeout(lockTimer);
    if (!$('body').hasClass('disable-hover')) {
      $('body').addClass('disable-hover');
    }

    lockTimer = setTimeout(function() {
      $('body').removeClass('disable-hover');
    }, 500);
  });

  function highlightLink(anchor) {
    $('nav .active').removeClass('active');
    $('nav')
      .find('[dest="' + anchor + '"]')
      .addClass('active');
  }

  // EVENT HANDLERS
  $('.page-link').click(function() {
    var anchor = $(this).attr('dest');
    $('.link-wrap').removeClass('visible');

    $('nav span').removeClass('active');
    $('nav')
      .find('[dest="' + anchor + '"]')
      .addClass('active');

    $('html, body').animate(
      {
        scrollTop: $('#' + anchor).offset().top
      },
      400
    );
  });

  $('.mdi-menu').click(function() {
    $('.link-wrap').toggleClass('visible');
  });

  $('.blog-wrap').hover(
    function() {
      $('.blog-wrap')
        .not(this)
        .addClass('fade');
      $(this).addClass('hover');
    },
    function() {
      $(this).removeClass('hover');
      $('.blog-wrap').removeClass('fade');
    }
  );

  posFilterBar($('.filter').first());

  $('.filter').click(function() {
    posFilterBar(this);
  });

  function posFilterBar(elem) {
    var origin = $(elem)
      .parent()
      .offset().left;
    var pos = $(elem).offset().left;
    $('.float-bar').css({
      left: pos - origin,
      width: $(elem).innerWidth()
    });
    $('.float-bar .row').css('left', (pos - origin) * -1);
  }

  // GALLERY
  $('#gallery').mixItUp({});

  function mixClear() {
    setTimeout(function() {
      $('#gallery').removeClass('waypoint');
    }, 2000);
  }

  // SCROLL ANIMATIONS
  function onScrollInit(items, elemTrigger) {
    var offset = $(window).height() / 1.6;
    items.each(function() {
      var elem = $(this),
        animationClass = elem.attr('data-animation'),
        animationDelay = elem.attr('data-delay');

      elem.css({
        '-webkit-animation-delay': animationDelay,
        '-moz-animation-delay': animationDelay,
        'animation-delay': animationDelay
      });

      var trigger = elemTrigger ? trigger : elem;

      trigger.waypoint(
        function() {
          elem.addClass('animated').addClass(animationClass);
          if (elem.get(0).id === 'gallery') mixClear(); //OPTIONAL
        },
        {
          triggerOnce: true,
          offset: offset
        }
      );
    });
  }

  setTimeout(function() {
    onScrollInit($('.waypoint'));
  }, 10);


});
