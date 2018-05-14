(function($) {
    var $window = $(window);
    var $body = $('body');
    var $mainHeader = $('#main-header');
    var $mainNav = $('#main-nav');
    var $menuBtn = $('#menu-btn');
    var $resizeEls = $('#main-header, #main-header-inner, #header-button-wrap, #property-gallery-wrap');
    var $resizeFullWidthEls = $('#main-nav, #contact');
    var $topImage = $('#top-image');
    var $propertyInfo = $('#property-info');

    var originalURL = window.location.href;

    function fullHeight() {
        $('.full-height').css('height', window.innerHeight);
    }

    function navHeight() {
        $('#main-nav-inner').css('height', $('#main-nav-wrap').outerHeight());
    }

    function onScreen() {
        $('.on-screen').not('.is-on-screen').each(function() {
            if($window.scrollTop() + (window.innerHeight/2) >= $(this).offset().top) {
                $(this).addClass('is-on-screen');
            }
        });
    }

    function showPopUp(bodyClass) {
        var bodyWidth = $body.width();

        $body.width(bodyWidth);
        $resizeEls.css('width', bodyWidth);
        $resizeFullWidthEls.css('width', window.innerWidth);
        $body.addClass(bodyClass);
        $body.css({'width': bodyWidth, 'overflow': 'hidden'});
    }

    function hidePopUp(bodyClass) {
        $body.removeClass(bodyClass);
        $body.css({'overflow': 'auto', 'width': 'auto'});
        $resizeEls.css('width', '100%');
    }

    function contact() {
        if(history.state !== null) {
            if(history.state.id !== undefined) {
                if(history.state.id == "contact") {
                    showPopUp('show-contact');
                } else {
                    hidePopUp('show-contact');
                }
            }
        } else {
            hidePopUp('show-contact');
        }
    }

    function header() {
        var winTopPos = $window.scrollTop();
        var $headerButtonWrap = $('#header-button-wrap');

        var menuBtnPos = 0;

        if(window.innerWidth >= 1720) {
            menuBtnPos = 60;
        } else if(window.innerWidth >= 1640) {
            menuBtnPos = 40;
        } else if(window.innerWidth >= 1500) {
            menuBtnPos = 20;
        }

        if(menuBtnPos) {
            if(winTopPos >= menuBtnPos) {
                $headerButtonWrap.addClass('fixed');
            } else {
                $headerButtonWrap.removeClass('fixed');
            }
        }
    }

    function propertyGallery() {
        $('#property-gallery').slick({
            appendArrows: $('#gallery-btns .container'),
            prevArrow: '<button class="icon-chevron-left"></button>',
            nextArrow: '<button class="icon-chevron-right"></button>',
            draggable: false,
            swipe: false,
            pauseOnHover: false
        });

        $('#property-gallery-btn a, #show-property-gallery-btn').click(function(e) {
            e.preventDefault();

            showPopUp('show-gallery');
        });

        $('#top-image .icon-chevron-left').click(function() {
            showPopUp('show-gallery');

            setTimeout(function() {
                $('#property-gallery').slick('slickPrev');
            }, 500);
        });

        $('#top-image .icon-chevron-right').click(function() {
            showPopUp('show-gallery');

            setTimeout(function() {
                $('#property-gallery').slick('slickNext');
            }, 500);
        });

        $('#close-gallery').click(function() {
            hidePopUp('show-gallery');
        });
    }

    function propertyInfoResize() {
        if($propertyInfo.hasClass('show')) {
            $propertyInfo.css('height', $('#property-info-inner').outerHeight());
        }

        if($body.hasClass('show-gallery')) {
            $('#property-gallery-wrap').css('width', window.innerWidth);
        }
    }

    function getDeviceType() {
        console.log(WURFL.is_mobile);
        if (WURFL.is_mobile === true) {
            $body.addClass('no-videoautoplay');
        } else {
            $body.addClass('videoautoplay');
        }
    }

    $menuBtn.click(function() {
        if($body.hasClass('show-nav')) {
            hidePopUp('show-nav');
        } else {
            showPopUp('show-nav');
        }
    });

    $('a[href$="#contact"]').click(function(e) {
        e.preventDefault();
        hidePopUp('show-nav');
        showPopUp('show-contact');
        history.pushState({id: 'contact'}, '', '/contact');
    });

    $('#to-top a').click(function(e) {
        e.preventDefault();

        $('html, body').animate({
            scrollTop: 0
        }, 1000);
    });

    $('#close-contact').click(function(){
        hidePopUp('show-contact');
        history.pushState({id: 'home'}, '', originalURL);
    });

    $('#close-nav button').click(function() {
        hidePopUp('show-nav');
    });

    $('#show-property-info-btn').click(function(e) {
        e.preventDefault();

        $propertyInfo.css('height', $('#property-info-inner').outerHeight()).addClass('show');

        $('html, body').animate({
            scrollTop: $propertyInfo.offset().top - $mainHeader.outerHeight()
        }, 1000);
    });

    $('#back-to-results').click(function(e) {
        e.preventDefault();
        history.back();
    });

    $('#property-map').click(function(e) {
        e.preventDefault();
        showPopUp('show-map');
    });

    $('#map-wrap .close-btn').click(function() {
        hidePopUp('show-map');
    });

    $(document).ready(function() {
        fullHeight();
        navHeight();
        onScreen();
        contact();
        header();
        propertyGallery();
        getDeviceType();
    });

    $window.scroll(function() {
        onScreen();
        header();
    });

    $window.resize(function() {
        if($body.hasClass('show-nav')) {
            hidePopUp('show-nav');
            showPopUp('show-nav');
        } else if($body.hasClass('show-contact')) {
            hidePopUp('show-contact');
            showPopUp('show-contact');
        }

        navHeight();
        header();
        propertyInfoResize();
    });

    $window.on('orientationchange', function() {
        if($body.hasClass('show-nav')) {
            hidePopUp('show-nav');
            showPopUp('show-nav');
        } else if($body.hasClass('show-contact')) {
            hidePopUp('show-contact');
            showPopUp('show-contact');
        }

        fullHeight();
        navHeight();
    });

    window.onpopstate = function(event) {
        contact();
    };

    /*------ Google Maps ------*/
    function initMap() {
        if ($(window).width() < 960) {
            vzoom = 8;
        } else {
            vzoom = 10;
        }
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: vzoom,
            center: {
                lat: 51.1809,
                lng: -0.7134
            },
            styles: [{
                "elementType": "labels.text",
                "stylers": [{
                    "color": "#ffffff"
                }, {
                    "visibility": "on"
                }]
            }, {
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "administrative",
                "stylers": [{
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "administrative.country",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "administrative.land_parcel",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "administrative.locality",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "administrative.neighborhood",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "administrative.province",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "landscape",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "landscape.man_made",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "landscape.natural",
                "stylers": [{
                    "visibility": "on"
                }]
            }, {
                "featureType": "landscape.natural",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#7e9179"
                }]
            }, {
                "featureType": "landscape.natural",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "landscape.natural.landcover",
                "stylers": [{
                    "color": "#ffffff"
                }, {
                    "visibility": "off"
                }]
            }, {
                "featureType": "landscape.natural.landcover",
                "elementType": "geometry.fill",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "landscape.natural.terrain",
                "stylers": [{
                    "color": "#ffffff"
                }, {
                    "visibility": "off"
                }]
            }, {
                "featureType": "landscape.natural.terrain",
                "elementType": "geometry.fill",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "poi",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "poi.attraction",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "poi.business",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "poi.government",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "poi.medical",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "poi.park",
                "stylers": [{
                    "visibility": "on"
                }]
            }, {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#6d8268"
                }, {
                    "visibility": "on"
                }]
            }, {
                "featureType": "poi.park",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "poi.place_of_worship",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "poi.school",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "poi.sports_complex",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road",
                "stylers": [{
                    "color": "#5e625c"
                }, {
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "road",
                "elementType": "labels.text",
                "stylers": [{
                    "color": "#ffffff"
                }, {
                    "visibility": "on"
                }]
            }, {
                "featureType": "road",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road.arterial",
                "stylers": [{
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#696d67"
                }, {
                    "visibility": "on"
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road.highway.controlled_access",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road.local",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "transit",
                "stylers": [{
                    "color": "#6e796a"
                }]
            }, {
                "featureType": "transit",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "water",
                "stylers": [{
                    "color": "#4f99aa"
                }, {
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "water",
                "elementType": "labels.text",
                "stylers": [{
                    "visibility": "off"
                }]
            }]

        });
        var infoWin = new google.maps.InfoWindow();
        // Add some markers to the map.
        // Note: The code uses the JavaScript Array.prototype.map() method to
        // create an array of markers based on a given "locations" array.
        // The map() method here has nothing to do with the Google Maps API.
        var markers = locations.map(function(location, i) {

            var circle = new google.maps.Circle({
                map: map,
                radius: 16000, // 10 miles in metres
                strokeOpacity: 0.8,
                strokeWeight: 0,
                fillColor: '#000000',
                fillOpacity: 0.25,
            })

            var marker = new google.maps.Marker({
                position: location,
                icon: '/wp-content/themes/house/images/house-icon.png',
            })

            // Add circle overlay and bind to marker
            circle.bindTo('center', marker, 'position');
            circle.bindTo('map', marker, 'map');

            google.maps.event.addListener(marker, 'click', function(evt) {
                infoWin.setContent(location.info);
                infoWin.open(map, marker);
            })
            return marker;
        });

        var markerIcons = [{
            url: '/wp-content/themes/house/images/house-icon-blank.png',
            width: 40,
            height: 46,
            textColor: '#000000',
            anchorText: [5, 0],
            textSize: 14
        }];
        var markerCluster = new MarkerClusterer(map, markers, {
            styles: markerIcons
        });

    }
    var locations = [{
            lat: 51.237982,
            lng: -0.570409,
            info: "<img src='/wp-content/themes/house/images/house-logo.png' /><br><strong>GUILDFORD AND THE SURREY HILLS</strong><br>Contact Nick Moulden<br><br><strong>+44 (0)1483 266700</strong><br><a href='mailto:guildford@housepartnership.co.uk'>guildford@housepartnership.co.uk</a>"
        },

        {
            lat: 50.868924,
            lng: -0.777386,
            info: "<img src='/wp-content/themes/house/images/house-logo.png' /><br><strong>CHICHESTER AND THE SOUTH DOWNS</strong><br>Contact Felicity Chetwood<br><br><strong>+44 (0)1243 717417</strong><br><a href='mailto:chichester@housepartnership.co.uk'>chichester@housepartnership.co.uk</a>"
        },

        {
            lat: 51.0909,
            lng: -0.7134,
            info: "<img src='/wp-content/themes/house/images/house-logo.png' /><br><strong>HASLEMERE AND FARNHAM</strong><br>Contact David Carter<br><br><strong>+44 (0)1428 748718</strong><br><a href='mailto:haslemere@housepartnership.co.uk'>haslemere@housepartnership.co.uk</a>"
        }, {
            lat: 51.370779,
            lng: -0.366,
            info: "<img src='/wp-content/themes/house/images/house-logo.png' /><br><strong>ESHER AND ELMBRIDGE</strong><br>Contact David Semple<br><br><strong>+44 (0)1932 283283</strong><br><a href='mailto:esher@housepartnership.co.uk'>esher@housepartnership.co.uk</a>"
        }, {
            lat: 51.4469,
            lng: -0.1384,
            info: "<img src='/wp-content/themes/house/images/house-logo.png' /><br><strong>SOUTH WEST LONDON</strong><br>Contact Andrew Giller<br><br><strong>+44 (0)203 5955395</strong><br><a href='mailto:clapham@housepartnership.co.uk'>clapham@housepartnership.co.uk</a>"
        }
    ];

    google.maps.event.addDomListener(window, "load", initMap);
})(jQuery);
