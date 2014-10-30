(function($){

  'use strict';

  $(document).ready(initialize);

  var $container = $('#container');

  function initialize(){
    willLoad();
    didLoad();
    query();
    setInterval(query, 5000);
  }

  // function ajaxCall(){
  //   // $.ajax({
  //   //   type     : "GET",
  //   //   dataType : "jsonp",
  //   //   cache    : false,
  //   //   url      : "https://api.instagram.com/v1/users/270865733/media/recent/?access_token=234553568.467ede5.bae2604e97df4b3ba61e37a6c41e2245",
  //   //   success  : didLoad
  //   // });
  //   $container.isotope('updateSortData').isotope();
  // }

  function willLoad(){
    $('.instagram').on('willLoadInstagram', function(event, options) {
      console.log(options);
    });
  }

  function didLoad(){
    $('.instagram').on('didLoadInstagram', function(event, response) {
      var likes = [];
      var data = response;
      console.log(response);
      for (var i = 0; i < 10; i++) {
        likes.push(response.data[i].likes.count);
      };
      var order = likes.sort(function(a, b){return b - a});
      console.log(order);
      gridIt();
    });
  }

  function query(){
    $('.instagram').instagram({
      // userId      : 270865733,
      hash        : 'nashville',
      count       : 10,
      accessToken : '234553568.467ede5.bae2604e97df4b3ba61e37a6c41e2245',
      clientId    : 'bf7acb5d25b841a7ae168fc0fea11208'
    });
  }

  function gridIt(){
    console.log("grid refresh");
    $container.isotope({
      getSortData  : {
        likes      : '.likes'
      },
      itemSelector : '.item',
      layoutMode   : 'vertical',
      sortBy       : 'likes'
    });
  }

})(jQuery);
