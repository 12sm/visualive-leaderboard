(function($){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
  
    $('.instagram').on('willLoadInstagram', function(event, options) {
      console.log(options);
    });
    $('.instagram').on('didLoadInstagram', function(event, response) {
      console.log(response);
    });
    $('.instagram').instagram({
      userId: 270865733,
      hash: 'nashville',
      count: 10,
      accessToken: '234553568.467ede5.bae2604e97df4b3ba61e37a6c41e2245',
      clientId: 'bf7acb5d25b841a7ae168fc0fea11208'
    });
    
    var $container = $('#container');
    // init
    $container.isotope({
	  getSortData: {
        likes: '.likes' // text from querySelector
      },  
      itemSelector: '.item',
      layoutMode: 'vertical',
      sortBy: 'likes'
    });
    
  };
  
  function ajaxCall(){
    $container.isotope('updateSortData').isotope();
  }

})(jQuery); 
