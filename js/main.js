(function($){
  'use strict';
  $(document).ready(initialize);

  var photos, mostPopular, i;
  var counter = 0;

  function initialize(){
    var $container = $('#container');
    $container.isotope({
      itemSelector : '.item',
      layoutMode   : 'vertical',
      getSortData  : {
        likes      : '.likes'
      }
    });
    didLoad($container);
    query();
    setInterval(query, 5000);
    setInterval(changePhoto, 3000);
  }

  function didLoad(dom){
    $('.instagram').on('didLoadInstagram', function(event, response) {
      sortPopular(response);
      rank(dom);
    });
  }

  function sortPopular(response){
    mostPopular = [];
    for (i = 0; i < 10; i++){
      mostPopular.push(response.data[i]);
    };
    mostPopular.sort(sortByLikes);
  }

  function sortByLikes(a, b){
    var aCount = a.likes.count;
    var bCount = b.likes.count;
    return ((bCount < aCount) ? -1 : ((bCount > aCount) ? 1 : 0));
  }

  function rank(dom){
    var $items = dom.find('.item');
    $items.each( function( i, item ) {
      var $item = $(item);
      $item.find('.likes').text( mostPopular[i].likes.count );
      $item.find('.username').text( mostPopular[i].user.username );
      var $photoUrl = mostPopular[i].images.standard_resolution.url;
      var $img = $('<img>');
      $img.addClass('img');
      $img.attr('src', $photoUrl);
      $item.find('.photo').append($img);
    });
    dom.isotope('updateSortData', $items);
    dom.isotope({ sortBy: 'likes', sortAscending: false });
  }

  function query(){
    $('.instagram').instagram({
      userId      : 270865733,
      // hash        : 'nashville',
      count       : 10,
      accessToken : '234553568.467ede5.bae2604e97df4b3ba61e37a6c41e2245',
      clientId    : 'bf7acb5d25b841a7ae168fc0fea11208'
    });
  }

  function changePhoto(){
    if (counter == 10){
      counter = 0;
    }
    document.getElementById('slider').style.backgroundImage = 'url(' + mostPopular[counter].images.standard_resolution.url + ')';
    counter++
  }

})(jQuery);
