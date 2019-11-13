$(document).ready(initializeApp);

function initializeApp(){
  var card = $(".card > .back");
  card.on("click", handleCardClick);
}

function handleCardClick(event){
  console.log("event parameter: ", event);
  $(event.currentTarget).addClass("hidden");
}
