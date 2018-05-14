(function($) {
    var $window = $(window);
    var $body = $('body');
    var $mainHeader = $('#main-header');
    var $mainHeaderLogo = $('#main-header-logo');
    var $topImage = $('#top-image');
    
    function headerLogo() {
        var homeTopHeight = $topImage.height();
        var mainHeaderPos = $topImage.offset().top + (homeTopHeight/2);
        var winTopPos = $window.scrollTop();
        var headerPos = winTopPos + $mainHeader.height()/2;
        
        if(winTopPos >= homeTopHeight - $mainHeader.height()) {
            $('#page').addClass('header-white');
        } else {
            $('#page').removeClass('header-white');
        }
        
        if(mainHeaderPos < headerPos) {
            $mainHeader.addClass('fix-logo');
            $mainHeaderLogo.css('width', 123);
        } else {
            $mainHeader.removeClass('fix-logo');
            $mainHeaderLogo.css('width', $mainHeaderLogo.parent('div').width());
        }

        if(winTopPos > 0) {
            $mainHeaderLogo.addClass('shrink-logo');
        } else {
            $mainHeaderLogo.removeClass('shrink-logo');
        }
    }
    
    $(document).ready(function() {
        headerLogo();
    });
    
    $window.resize(function() {
        headerLogo();
    });
    
    $window.scroll(function() {
        headerLogo();
    });
})(jQuery);