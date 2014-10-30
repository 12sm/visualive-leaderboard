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
      console.log(response);

      var mostPopular = [];
      for (var i = 0; i < 10; i++) {
        mostPopular.push(response.data[i]);
      };
      mostPopular.sort(sortByLikes);
      console.log(mostPopular);

      var likes = [];
      for (var i = 0; i < 10; i++) {
        likes.push(mostPopular[i].likes.count);
      };
      console.log(likes);

      gridIt();
    });
  }

  function sortByLikes(a, b){
    var aCount = a.likes.count;
    var bCount = b.likes.count;
    return ((bCount < aCount) ? -1 : ((bCount > aCount) ? 1 : 0));
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
