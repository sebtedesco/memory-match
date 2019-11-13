$(document).ready(initializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;

function initializeApp(){
  var card = $(".card > .back");
  card.on("click", handleCardClick);
}

function handleCardClick(event){
  console.log("event parameter: ", event);
  $(event.currentTarget).addClass("hidden");
  if(!firstCardClicked){
    firstCardClicked = $(event.currentTarget);
    console.log("firstCardClicked stuff: ", firstCardClicked);
  }
}
