(function($) {
    var $window = $(window);
    var $body = $('body');
    var $mainHeader = $('#main-header');
    var $topImage = $('#top-images');
    var $videoWrap = $('#video-wrap');
    var $video = $('#video-wrap').find('video');
    var $resizeEls = $('#main-header, #main-header-inner, #header-button-wrap');
    
    /*
     * Functions
     */
    
    // Home Top Height
    
    function homeTopHeight() {
        $topImage.css('height', window.innerHeight);
    }
    
    function headerFullHeight() {
        $('#main-header-inner').css('height', window.innerHeight);
    }
    
    function playVideo() {
        if(window.innerWidth >= 768) {
            var headerHeight = $mainHeader.height();

            if($video.get(0).paused || !$videoWrap.hasClass('playing')) {
                if(!$videoWrap.hasClass('playing') && !$videoWrap.hasClass('paused')) {
                    $video.get(0).currentTime = 0;
                }
                
                $videoWrap.addClass('playing').removeClass('paused');

                $video.get(0).play();

                if($video.outerHeight() > window.innerHeight - headerHeight) {
                    $video.css('height', $video.height());

                    setTimeout(function() {
                        $video.css('height', window.innerHeight - headerHeight);
                    }, 100);

                    $('html, body').animate({
                        scrollTop: $video.offset().top - headerHeight
                    }, 1000);
                } else {
                    $('html, body').animate({
                        scrollTop: $video.offset().top - (($window.height() - $video.height() + headerHeight)/2)
                    }, 1000);
                }
                
                $video.animate({volume: 1}, 1000);
            } else {
                $video.get(0).pause();
                $videoWrap.removeClass('playing').addClass('paused');
            }
        }
    }
    
    function featuredCount() {
        var liCount = $('#featured-properties-inner ul li').length;
        
        $('#featured-properties-inner ul').addClass('featured-'+liCount);
    }
    

    function homeSlider() {
        $('#home-slider').slick({
            autoplay: true,
            arrows: false,
            fade: true,
            speed: 2000
        });
    }
    

    
    function hidePopUp(bodyClass) {
        $body.removeClass(bodyClass);
        $body.css({'overflow': 'auto', 'width': 'auto'});
        $resizeEls.css('width', '100%');
    }




    
    /*
     * Events
     */
    
    $('.load-more-instagram-images').click(function() {
        var requestURL = $(this).data('url');
        var lastID = $(this).data('last-id');
        getMoreImages(requestURL, lastID);
    });
    
    $('#video-play-btn, #video-wrap video').click(function() {
        playVideo();
    });
    
    $('.open-map-popup').click(function() {
        $('#map').addClass('show-map-popup');
        $('.map-popup').eq($(this).data('location-id')).addClass('show');
    });
    
    $('.close-map-popup').click(function() {
        $('#map').removeClass('show-map-popup');
        $('.map-popup.show').removeClass('show');
    })
    
	$('a[href$="#why-house"]').click(function() {
        hidePopUp('show-nav');
        
        $('html, body').animate({
            scrollTop: $('#why-house').offset().top - $mainHeader.outerHeight()
        }, 1000);
    });
    
    $video.on('ended',function(){
        $videoWrap.removeClass('playing').addClass('paused');
        
        $video.get(0).currentTime = 0;
    });
    
    $(document).ready(function() {
        $body.addClass('ready');
        homeTopHeight();
        headerFullHeight();
        featuredCount();
        homeSlider();
    });

})(jQuery);