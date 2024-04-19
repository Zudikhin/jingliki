$(document).ready(function() {
    "use strict";

    if($(window).width() > 1199) {

        let mouseArray = [];

        jQuery(".js-mousemove").each(function(ind){
            mouseArray[ind] = {
                el: jQuery(this),
                layer: jQuery(this).attr("data-layer"),
                active: false,
            }
        });

        jQuery(window).on("mousemove",function(e){
            for(let ind in mouseArray) {
                if (mouseArray[ind].active == true) {
                    let layer = 1;
                    if (mouseArray[ind].layer) {
                        layer = mouseArray[ind].layer;
                    }
                    let move = (100 / window.innerWidth * e.clientX - 50) / (10 * layer)
                    mouseArray[ind].el.css("transform", "translateX("+ move +"%)");
                }
            }
        });

        function scroll_fn(){
            let new_scroll = jQuery(window).scrollTop();
            // progress-line
            let prcnt = 100 / (jQuery("html").height() - window.innerHeight) * new_scroll;
            for(let ind in mouseArray) {
                if (window.innerWidth > 1200) {
                    if ( new_scroll + window.innerHeight > mouseArray[ind].el.offset().top && new_scroll < mouseArray[ind].el.offset().top + mouseArray[ind].el.height()) {
                        mouseArray[ind].active = true;
                    }
                    else {
                        mouseArray[ind].active = false;
                    }
                }
                else {
                    mouseArray[ind].active = false;
                    mouseArray[ind].el.css("transform", "translateX("+ 0 +"%)");
                }
            }
        };

        jQuery(window).on("resize",function(){
            scroll_fn();
        });
        jQuery(window).on("scroll",function(){
            scroll_fn();
        });

        scroll_fn();
    }

    $(".header_block_burger").click(function() {
        $(".header").toggleClass("show");
        $(".header_drop").slideToggle();
    });

    $(".header_block_switcher_wrap").hover(function() {
        $(".header_block_switcher_wrap_list").slideToggle();
    });

    $(".header_drop_block_switcher_lang").click(function() {
        $(this).parent().toggleClass("active");
        $(this).parent().find(".header_drop_block_switcher_list").slideToggle();
    });

    if ($(window).width() > 1199) {
        var $slider = $('.news_slider');
        var $progressBar = $('.progress');
        
        $slider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {   
            var calc = ( (nextSlide) / (slick.slideCount-1) ) * 100; 
            $progressBar.css('background-size', calc + '% 100%').attr('aria-valuenow', calc );
        });
        
        $slider.slick({
            slidesToShow: 3,
            arrows: false,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            cssEase: 'linear',
            speed: 400
        });
    }

});