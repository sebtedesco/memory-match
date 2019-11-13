$(document).ready(initializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;

function initializeApp(){
  var card = $(".card > .back");
  card.on("click", handleCardClick);
}
function handleCardClick(event){
  // var frontCardUrl = $(".card .front").css("background-image");
  console.log("event parameter: ", event);
  $(event.currentTarget).addClass("hidden");
  if(!firstCardClicked){
    firstCardClicked = $(event.currentTarget);
    console.log("firstCardClicked stuff: ", firstCardClicked);
  } else {
    secondCardClicked = $(event.currentTarget);
    console.log("SECOND card clicked: " + secondCardClicked);
    var firstCardBackground = firstCardClicked.prev().css('background-image');
    var secondCardBackground = secondCardClicked.prev().css('background-image');
    if(firstCardBackground === secondCardBackground){
      console.log("it's a match!");
      matches++;
    }else{
      setTimeout(function (){
        firstCardClicked.removeClass("hidden");
        secondCardClicked.removeClass("hidden");
       }, 1500);
    }
  }




  // if (firstCardClicked.frontCardUrl === secondCardClicked.frontCardUrl){
  //   console.log("cards match");
  // }
}
