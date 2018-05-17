jQuery(function(){


     new WOW().init();
 

	jQuery('.cookie-button').on('click',function(e){
		e.preventDefault();

		jQuery('#cookie-message').fadeOut('fast');

	});


	jQuery('.ajax-search-trigger').on('click',function(e){
		e.preventDefault();

		jQuery('#ajax-search').fadeIn('fast');

	});
	
	jQuery('.close-ajax-search ').on('click',function(e){
		e.preventDefault();

		jQuery('#ajax-search').fadeOut('fast');

	});

    jQuery('#mobile-menu').on('click',function(e){
        e.preventDefault();

        jQuery('body').toggleClass('showMobileMenu');

    });

	

  window.mainCarousel = $('.main-carousel').flickity({
  // options
        cellAlign: 'left',
        contain: true
    });

});

