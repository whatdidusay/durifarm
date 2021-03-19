var loadSection = function () {
  $('.loading').addClass('load-complete')
  $('body').removeClass('noscroll')
}

$(function () {
  if (!window.load) {
    setTimeout(loadSection, 8000)
  }

  // 프레임 비디오
  var checkDevice = ''
  var moMaxFrame = 594
  var pcMaxFrame = 653
  var deviceSize = $(window).width();
  if (deviceSize > 768) {
    pcFrame();
    checkDevice = 'PC'
  } else {
    mobileFrame();
    checkDevice = 'MO'
  }

  console.log(checkDevice)

  function pcFrame() {
    var imgs = "";
    for (var i = 1; i < pcMaxFrame; i++) {
      imgs += "<img src= './frame/pc/frame" + i + ".png'>"
    };
    $(".frame-img").html(imgs);
    $('.frame').css('height', '250vh').css('height', '+=' + pcMaxFrame + 'px')
  }

  function mobileFrame() {
    var imgs = "";
    for (var i = 1; i < moMaxFrame; i++) {
      imgs += "<img src= './frame/mobile/frame" + i + ".png'>"
    };
    $(".frame-img").html(imgs);
    $('.frame').css('height', '250vh').css('height', '+=' + moMaxFrame + 'px')
  }

  // 배경음악
  // var music = $('audio')[0]

  // if(!music.paused){
  //   $('.audio').addClass('active')
  // }else{
  //   $('.audio').removeClass('active')
  // }

  // $('.audio').click(function () {
  //   if (!$(this).is('.active')) {
  //     $(this).addClass('active')
  //     music.play()
  //   } else {
  //     $(this).removeClass('active')
  //     music.pause()
  //   }
  // })

  // 네비게이션
  $(".nav li").click(function () {
    var nav = $(this).attr("id")
    var sectionPos = $("." + nav).offset().top
    $('html, body').animate({
      scrollTop: sectionPos - 50
    }, 700)
    return false
  });

  // 스크롤 이벤트
  var sectionSpot = []
  $(window).scroll(function () {
    var sct = $(window).scrollTop()
    var winH = $(window).height()
    var winY = $(window).scrollTop() + winH
    var frameSpot = $('.frame').offset().top
    var facilitiesSpot = $('.facilities').offset().top
    var frameEnd = $('.frame').offset().top + $('.frame').height()
    // var percent = sct - frameSpot;
    var percent = Math.floor(((sct - frameSpot) / winH) * 200);
    sectionSpot = []
    faciliSpot = []
    listSpot = []

    $('section').each(function (i, e) {
      sectionSpot.push($(e).offset().top)
      switch (i) {
        // enter
        case 0:
          // if (sct > 0) music.play()
          var introScale = (sct / winY) * 0.2 + 1
          $('.enter .wrap img').css({
            'transform': 'translateX(-50%) scale(' + introScale + ')'
          })
          break;

        // frame
        case 1:
          break;

        // facilities
        case 2:
          $('.facilities-list li').each(function (i, e) {
            faciliSpot.push($(e).offset().top)
            if (winY >= faciliSpot[i] && !$(e).is('.on') && !sct == 0) {
              $(e).addClass('on')
            } else if (winY < faciliSpot[i] && $(e).is('.on')) {
              $(e).removeClass('on')
            } else if (sct == 0) {
              $(e).removeClass('on')
            }
          })
          break;

        // activity
        case 3:
          break;

        // nearby
        case 4:
          break;

        // footer
        case 5:
          break;
      }

      $('ul li').each(function (i, e) {
        listSpot.push($(e).offset().top + 150)
        if (winY >= listSpot[i] && !$(e).is('.on') && !sct == 0) {
          $(e).addClass('on')
        } else if (winY < listSpot[i] && $(e).is('.on')) {
          $(e).removeClass('on')
        } else if (sct == 0) {
          $(e).removeClass('on')
        }
      })

      if (winY >= sectionSpot[i] && !$(e).is('.on') && !sct == 0) {
        $(e).addClass('on')
        $(e).find('.section-title, .inter').addClass('active')
      } else if (winY < sectionSpot[i] && $(e).is('.on')) {
        $(e).removeClass('on')
        $(e).find('.section-title, .inter').removeClass('active')
      } else if (sct == 0) {
        $(e).removeClass('on')
        $(e).find('.section-title, .inter').removeClass('active')
      }

      if (winY > sectionSpot[i]) {
        $('.nav li').eq(i).addClass('active').siblings().removeClass('active')
      } else if (sct == 0) {
        $('.nav li').eq(0).addClass('active').siblings().removeClass('active')
      }
    })

    // 동영상 프레임
    if (sct >= frameSpot && !sct == 0) {
      $('.frame-wrap').addClass('start')
      $('.frame-txt').removeClass('on')
      $('.frame-txt1').addClass('on')
      if (percent > 70) {
        $('.frame-txt2').addClass('on')
      }
      if (percent > 140) {
        $('.frame-txt3').addClass('on')
      }
      if (percent > 210) {
        $('.frame-txt4').addClass('on')
      }
      if (checkDevice == 'MO') {
        if (percent < moMaxFrame - 2) {
          $(".frame-wrap img").hide();
          $(".frame-wrap img").eq(percent).css('display', 'block');
        } else if (percent == moMaxFrame) {
          $(".frame-wrap img").eq(moMaxFrame).css('display', 'block');
        }
      } else if (checkDevice == 'PC') {
        if (percent < pcMaxFrame - 2) {
          $(".frame-wrap img").hide();
          $(".frame-wrap img").eq(percent).css('display', 'block');
        } else if (percent == pcMaxFrame) {
          $(".frame-wrap img").eq(pcMaxFrame).css('display', 'block');
        }
      }

    }
    if (winY > frameEnd && $('.frame').next().is('.on')) {
      $('.frame-wrap').addClass('end')
    } else if (sct < frameSpot && $('.frame-wrap').is('.start')) {
      $('.frame-wrap').removeClass('start')
    } else if (winY < frameEnd && !$('.frame').next().is('.on')) {
      $('.frame-wrap').removeClass('end')
    }
    // 동영상 프레임 끝
  })
})

// 페이지 로딩시
$(window).load(function () {
  setTimeout(loadSection, 8000);
})