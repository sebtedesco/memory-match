$(document).ready(initializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var matches = 0;
var maxMatches = 9;
var attempts = 0;
var gamesPlayed = 0;
var winModal;
var accuracyPercentage = 0;
var canBeClicked = true;

function initializeApp(){
  shuffleCards();
  var card = $(".card > .back");
  card.on("click", handleCardClick);
  $("div.reset-game-button").on("click", resetStats);
}

function handleCardClick(event){
  if(!canBeClicked) {
    return;
  }
  console.log("event parameter: ", event);
  $(event.currentTarget).addClass("hidden");

  if(!firstCardClicked){
    firstCardClicked = $(event.currentTarget);
    console.log("firstCardClicked stuff: ", firstCardClicked);

  } else {
    canBeClicked = false;
    secondCardClicked = $(event.currentTarget);
    console.log("SECOND card clicked: " + secondCardClicked);

    var firstCardBackground = firstCardClicked.prev().css('background-image');
    var secondCardBackground = secondCardClicked.prev().css('background-image');

    if(firstCardBackground === secondCardBackground){
      console.log("it's a match!");
      matches++;
      attempts++;
      displayStats();
      firstCardClicked = null;
      secondCardClicked = null;
      canBeClicked = true;

        if(matches === maxMatches){
          gamesPlayed++;
          displayStats();
          winModal = $("div.you-win-modal");
          winModal.removeClass("hidden");
        }
    }else{
      setTimeout(function (){
        firstCardClicked.removeClass("hidden");
        secondCardClicked.removeClass("hidden");
        firstCardClicked = 0;
        secondCardClicked = 0;
        gamesPlayed++;
        attempts++;
        displayStats();
        firstCardClicked = null;
        secondCardClicked = null;
        canBeClicked = true;
       }, 1500);
    }
  }
}
  function calculateAccuracy(){
    accuracyPercentage = ((matches / attempts) * 100).toFixed(2) + "%";
    return accuracyPercentage;
  }

  function displayStats(){
    $(".stats-box #attempts").text(attempts);
    $(".stats-box #games-played").text(gamesPlayed);
    $(".stats-box #accuracy").text(calculateAccuracy());
  }

  function resetStats(){
    matches = 0;
    attempts = 0;
    gamesPlayed++;
    displayStats();
    $(".main div").removeClass("hidden");
    winModal.addClass("hidden");
    $(".main").empty();
    initializeApp();
  }

  function shuffleCards(){
    var arrOfCardUrls = ["html-logo", "html-logo", "gitHub-logo", "gitHub-logo", "css-logo",
    "css-logo", "docker-logo", "docker-logo", "js-logo", "js-logo", "react-logo",
    "react-logo", "mysql-logo", "mysql-logo", "node-logo", "node-logo", "php-logo", "php-logo"];
    for(var index = 0; index < 3; index++){
      var rowDiv = $("<div>").addClass("row");
      for(var arrayIndex = 0; arrayIndex < 6; arrayIndex++){
        var randomIndex = Math.floor(Math.random() * arrOfCardUrls.length);
        var randomFrontCardLogoClass = arrOfCardUrls[randomIndex];
        var frontSkelDiv = $("<div>").addClass("front");
        var newFrontCard = frontSkelDiv.addClass(randomFrontCardLogoClass);
        var backCardDiv = $("<div>").addClass("back");
        var card = $("<div>").addClass("card");
        card.append(newFrontCard, backCardDiv);
        rowDiv.append(card);
        arrOfCardUrls.splice(randomIndex, 1);
      }
      $("div.main").append(rowDiv);
      }
  }
