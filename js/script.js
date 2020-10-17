$(function () {

    // nav fixed start
    var OfsetTop = $('.custome_nav').offset().top;
    $(window).on('scroll', function () {
        var scroltop = $(window).scrollTop();

        if (scroltop > OfsetTop) {
            $('.custome_nav').addClass('stky');
        } else {
            $('.custome_nav').removeClass('stky');
        }

    });
    // nav fixed end

    // slick slider start
    $('.monial-slider').slick({
        dots: false,
        infinite: true,
        arrows: true,
        autoplay: false,
        autoplaySpeed: 3000,
        speed: 800,
        nextArrow: ".pointer-cont-left",
        prevArrow: ".pointer-cont-right",
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });
    // slick slider end

    // back to top button start
    $(window).scroll(function () {
        var windoscroll = $(window).scrollTop();

        if (windoscroll > 800) {
            $('.backtop').fadeIn(800);
        } else {
            $('.backtop').fadeOut(800);
        }
    });

    $(".backtop").click(function () {
        $('html,body').animate({
            scrollTop: 0
        }, 1000)
    });
    // back to top button end

    //nav scroll start
    //scrollspy menu
    $('body').scrollspy({
        target: '.custome_nav',
        offset: 160
    });

    //animation scroll js
    $('ul li a').on('click', function () {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - 80
                }, 1000);
                return false;
            }
        }
    });
    //nav scroll end

    // video js plugin

    var videoSelector = $('#html5');
    // Initialize with some custom config
    videoSelector.lightsOff({
        color: '#222',
        switchSelector: '#switch-button',
        durationLightsOff: 1000,
        durationLightsOn: 1000,
        allowScrolling: true
    });

    videoSelector.on('play playing', function () {
        videoSelector.lightsOff('show');
    });
    videoSelector.on('pause ended', function () {
        videoSelector.lightsOff('hide');
    });

    // Pause video when the overlay hidden (usually when the user clicks the overlay itself)
    $(document).on('lightsOn', function () {
        videoSelector.get(0).pause()
    });


});