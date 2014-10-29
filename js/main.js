(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $('#start').click(showSearchSection);
    $('.btn').click(getPics);
    $('#next').click(showSelectedPics);
    $('#slideshow').click(showModal);
//     $('#invert').click(invertPic);
//     $('#sepia').click(sepiaPic);
//     $('#gray').click(grayscalePic);
//     $('#crazy').click(gangnam);
//     $('#rock').click(rockN);
    $(document).on('click','img',add2Q);
    $('#search-bar').keypress(function(e){
      if(e.keyCode===13){
        getPics();
      }
    });
  };
//
//
//   //------Minor Show and Hide Functions--------

  function showSelectedPics(){
    $('.selected-pics').show().addClass('animated fadeIn');
    $('#next-div').hide();

    $('#title').text('Your Queue').addClass('animated fadeInUp');
    $('#title-p').hide();
    $('.search-container').hide();
    $('#target').hide();
    $('.slideshow-div').show().addClass('animated fadeIn');
  }
//
//
  function showSearchSection(){
    $('.title').show();
    $('.mini').show().addClass('img animated fadeInUp');
    $('.search-container').show().addClass('animated fadeIn');
    $('#title').text('Search #Tag').addClass('animated fadeInDown').removeClass('title');
    $('#title-p').text('Search and Select 6 Pics.').addClass('animated fadeInUp');
    $('.start').hide();
  }

  function showModal(){
    $('.modal').show();
  }

//   function homeButton(){
//     emptyPics();
//     $('.selected-pics').empty();
//     $('#title').text('Mitch-sta-pic');
//     $('#title-p').text('');
//     $('.slideshow-div').hide();
//     $('.search-container').hide();
//     $('#search-bar').val('');
//     // $('.orbitSlider').empty();
//   }
// //
  function emptyPics(){
    $('#target').empty();

  }

//
//   //------Minor Show and Hide Functions--------
//
//   //------Music Functions----------------
//
//
//   function rockN(){
//     document.getElementById('black').play();
//     document.getElementById('gang').pause();
//   }
//
//   function gangnam(){
//     document.getElementById('gang').play();
//     document.getElementById('black').pause();
//   }
//
//
//
//
//
//   //------Music Functions----------------
//
//   //------Filter Functions---------------
//
//   function invertPic(){
//     $('.orbitSlider img').removeClass();
//     $('.orbitSlider img').addClass('inverted');
//
//   }
//
//   function grayscalePic(){
//     $('.orbitSlider img').removeClass();
//     $('.orbitSlider img').addClass('grayscale');
//
//   }
//
//   function sepiaPic(){
//     $('.orbitSlider img').removeClass();
//     $('.orbitSlider img').addClass('sepia');
//
//   }

   //------Filter Functions---------------

   //------Adding To Q Functions----------

  function add2Q(){
    if($('.selected-pics').children('img').length < 6 || !$('.selected-pics').children('img').length){
      $('.selected-pics').append(this);
      $('#next-div').show().addClass('img animated fadeIn');
      // var $li = $('<li>');
      // var $bigPic = $(this).clone().attr('src');
      // $bigPic = $bigPic.replace('_5','_6');
      // $li.append('<img src="' +$bigPic+ '">');
      // $('.orbi').append($li);
    }
  }
   //------Adding To Q Functions----------

   //------Instagram API Functions--------


  function getPics(){
    emptyPics();
    var tag = $('#search-bar').val().replace(/\s/gi,"");
    var count = 6;
    var url = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?client_id=86cecf102fdd46599736c4deac452424&callback=?&count=' + count;
    $.getJSON(url, displayPics);
  }

  function displayPics(instaData){
    var pics = instaData.data;
    for(var i=0; i < pics.length; i++){
      $('#target').append('<img class="img animated fadeInDown" src="'+pics[i].images.thumbnail.url+'">');
    }
  }

   //------Instagram API Functions--------

})();
