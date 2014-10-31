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
        rank       : '.rank'
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
    for (i = 0; i < 33; i++){
      mostPopular.push(response.data[i]);
    };
    mostPopular.sort(sortByLikes);
    console.log(mostPopular);
  }

  function sortByLikes(a, b){
    var aCount = a.likes.count;
    var bCount = b.likes.count;
    return ((bCount < aCount) ? -1 : ((bCount > aCount) ? 1 : 0));
  }

  function rank(dom){
    var $items = dom.find('.item');
    $('.img').remove();
    $items.each( function( i, item ) {
      var $item = $(item);
      var $img = $('<img>');
      var position = i + 1;
      var photoUrl = mostPopular[i].images.standard_resolution.url;
      var caption = mostPopular[i].caption.text;
      caption = caption.split("@", 2);
      caption = caption[1].split(" ", 1);
      $item.find('.username').text( '@' + caption[0] );
      $item.find('.rank').text( position );
      $item.find('.likes').text( mostPopular[i].likes.count );
      $img.addClass('img');
      $img.attr('src', photoUrl);
      $item.find('.photo').append($img);
    });
    dom.isotope('updateSortData', $items);
    dom.isotope({ sortBy: 'rank', sortAscending: true });
  }

  function query(){
    $('.instagram').instagram({
      userId      : 492006858,
      // hash        : 'nashville',
      count       : 33,
      accessToken : '234553568.467ede5.bae2604e97df4b3ba61e37a6c41e2245',
      clientId    : 'bf7acb5d25b841a7ae168fc0fea11208'
    });
  }

  function changePhoto(){
    if (counter == 10){
      counter = 0;
    }
    $('.bigImg').remove();
    var $option = $('<img>');
    var spot = counter + 1;
    var imaj = mostPopular[counter].images.standard_resolution.url;
    // var capshun = mostPopular[counter].caption.text;
    // capshun = capshun.split("@", 2);
    // capshun = capshun[1].split(" ", 1);
    // $('.user').text( "@" + capshun[0] );
    $('.ranking').text( spot );
    $('.lykes').text( mostPopular[counter].likes.count );
    $option.addClass('bigImg');
    $option.attr('src', imaj);
    $('#slider').append($option);
    counter++
  }

})(jQuery);
