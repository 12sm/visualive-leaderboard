(function($){
  'use strict';
  $(document).ready(initialize);

  function initialize(){
    var $container = $('#container');
    $container.isotope({
      itemSelector : '.item',
      layoutMode   : 'vertical',
      getSortData  : {
        likes    : '.likes'
      }
    });
    // willLoad();
    didLoad($container);
    query();
    setInterval(query, 5000);
  }

  // function willLoad(){
  //   $('.instagram').on('willLoadInstagram', function(event, options) {
  //     console.log(options);
  //   });
  // }

  function didLoad(dom){
    $('.instagram').on('didLoadInstagram', function(event, response) {
      var mostPopular = [];
      var i;
      for (i = 0; i < 10; i++) {
        mostPopular.push(response.data[i]);
      };
      mostPopular.sort(sortByLikes);
      console.log(mostPopular);

      var likes = [];
      for (i = 0; i < 10; i++) {
        likes.push(mostPopular[i].likes.count);
      };
      console.log(likes);

      var $items = dom.find('.item');
      var $item;
      var $img;
      var $photoUrl;
      $items.each( function( i, item ) {
        $item = $(item);
        $item.find('.likes').text( mostPopular[i].likes.count );
        $item.find('.username').text( mostPopular[i].user.username );
        $photoUrl = mostPopular[i].images.standard_resolution.url;
        $img = $('<img>');
        $img.addClass('img');
        $img.attr('src', $photoUrl);
        $item.find('.photo').append($img);
      });
      dom.isotope('updateSortData', $items);
      dom.isotope({ sortBy: 'likes' });
    });
  }

  function sortByLikes(a, b){
    var aCount = a.likes.count;
    var bCount = b.likes.count;
    return ((bCount < aCount) ? -1 : ((bCount > aCount) ? 1 : 0));
  }

  function query(){
    console.log('query yo!');
    $('.instagram').instagram({
      userId      : 270865733,
      // hash        : 'nashville',
      count       : 10,
      accessToken : '234553568.467ede5.bae2604e97df4b3ba61e37a6c41e2245',
      clientId    : 'bf7acb5d25b841a7ae168fc0fea11208'
    });
  }

})(jQuery);
