/*
  Final Project
  Sharon Shin

*/

'use strict';

//firebase stuff
var config = {
  apiKey: "AIzaSyBxlV_ylqaTrhlpL9wUCOREB4o5sw3tWjc",
  authDomain: "ga-project-73eb0.firebaseapp.com",
  databaseURL: "https://ga-project-73eb0.firebaseio.com",
  projectId: "ga-project-73eb0",
  storageBucket: "ga-project-73eb0.appspot.com",
  messagingSenderId: "977211349912"
};

firebase.initializeApp(config);

var messageAppReference = firebase.database();

  
var map;
var service;
var infowindow;

var napa = new google.maps.LatLng(38.2975,-122.2869);
var rutherford = new google.maps.LatLng(38.459010,-122.421932);
var calistoga = new google.maps.LatLng(38.578292,-122.580461);

$(document).ready(function(){

  initialize(napa);
  initialize(rutherford);
  initialize(calistoga);
  event.preventDefault()
});

function initialize(location) {
  //var napa = new google.maps.LatLng(38.459010,-122.421932);
  map = new google.maps.Map(document.getElementById('map'), {
      center: location,
      zoom: 15
    }
    );

  var request = {
    location: location,
    radius: '0.0005',
    query: 'winery',
  };

  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);

}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {

      //console.log(results[i]);
      //console.log(results[i].name);
      //console.log(results[i].formatted_address);
      //console.log(results[i].rating);

      var name = results[i].name;
      var address = results[i].formatted_address;
      var rating = results[i].rating; 
      var id = results[i].id;
      var photo = null;

      //if function to skip over undefined arrays in JSON response. 
      if(results[i].photos !=undefined){
        photo = results[i].photos[0].getUrl({'maxWidth': 150, 'maxHeight': 150});
      }
      else{
        photo = 'http://vignette2.wikia.nocookie.net/legendmarielu/images/b/b4/No_image_available.jpg/revision/latest?cb=20130511180903';
      }

      //use JSON info and pass to addDetails function
      addDetails(name, address, rating, photo, id);
    }
  
  }

}

//clicking about me takes user to bottom of page
$("a[href='#about']").click(function() {
  $("html, body").animate({ scrollTop: $(document).height() }, "slow");
  return false;
});

//clicking contact takes user to bottom of page
$("a[href='#contact']").click(function() {
  $("html, body").animate({ scrollTop: $(document).height() }, "slow");
  return false;
});


function addDetails(name, address, rating, photo, id){


  //create div container
  var $newDiv = $('<div >').addClass('w3-third w3-container w3-margin-bottom');

  //image
  var $newImg = $('<img src="' + photo + '" style="width:100%; height:210px;">').addClass('w3-hover-opacity');

  //div container for white box
  //var $newDiv2 = $('<div>').addClass('w3-container w3-white');
  var $newDiv2 = $('<div style="height:133.28px">').addClass('w3-container w3-white');

  //title
  var $newTitle = $('<p><b>'+name+'</b></p>');

  //address
  var $newAddress = $('<p>'+address+'</p>');

  // create up vote element
  var $upVoteElement = $('<i class="fa fa-thumbs-o-up"></i>');

  $upVoteElement.on('click', function(){
      getVotes(id, name);
  });

  //append items
  $('.test').append($newDiv);
  $newDiv.append($newImg);
  $newDiv.append($newDiv2);
  $newDiv2.append($newTitle);
  $newDiv2.append($newAddress);
  $newDiv2.append($upVoteElement);
}

//firebase get votes
function getVotes(id, name){
    event.preventDefault()
    // create a section for each winery likes data in db
    
    var databaseRef = firebase.database().ref('users').child(id).child('votes');

    var name = firebase.database().ref('users').child(id).update({"name": name});

      //increment votes by 1
      databaseRef.transaction(function(votes) {
          if (votes) {
              return votes+1;
          }
          return (votes || 0) + 1;
      })
}

$('button').click('click', function(event){
  if($(this).text() == "Napa"){
    event.preventDefault();
    $('.test').empty();
    initialize(napa);
    $('.Napa').addClass('w3-black');
    $('.All, .Rutherford, .Calistoga').removeClass('w3-black');
    $('.All, .Rutherford, .Calistoga').addClass('w3-white');

  }
  else if($(this).text() == "Rutherford"){
    event.preventDefault();
    $('.test').empty();
    initialize(rutherford);
    $('.Rutherford').addClass('w3-black');
    $('.All, .Napa, .Calistoga').removeClass('w3-black');
    $('.All, .Napa, .Calistoga').addClass('w3-white');
  }

  else if($(this).text() == "Calistoga"){
    event.preventDefault();
    $('.test').empty();
    initialize(calistoga);
    $('.Calistoga').addClass('w3-black');
    $('.All, .Rutherford, .Napa').removeClass('w3-black');
    $('.All, .Rutherford, .Napa').addClass('w3-white');
  }

    else if($(this).text() == "ALL"){
    event.preventDefault();
    $('.test').empty();
    initialize(rutherford);
    initialize(calistoga);
    initialize(napa);
    $('.All').addClass('w3-black');
    $('.Calistoga, .Rutherford, .Napa').removeClass('w3-black');
    $('.Calistoga, .Rutherford, .Napa').addClass('w3-white');
  }



});










