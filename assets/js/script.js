$(document).ready(initializeApp);

var firstCardClicked = null; //Variable for the value of the first card click to identify it
var secondCardClicked = null; //Variable for the value of the second card click to identify it
var matches = 0; //Number of matches
var maxMatches = 9; //When number of matches equals maxMatches, the game ends and win modal appears
var attempts = 0;
var gamesPlayed = 0;
var winModal;
var loseModal;
var accuracyPercentage = 0;
var canBeClicked = true;
var bugsBunnyPosition = 40;
var elmerFuddPosition = 0;

function initializeApp(){ //When the doument is loaded, this function is called
  shuffleCards(); //Runs shuffleCards function which shuffles all cards randomnly
  var card = $(".card > .back");
  card.on("click", handleCardClick); //handleCardClick is called when a card is clicked
  $("div.reset-game-button").on("click", resetStats);
  $("div.try-again-button").on("click", tryAgain); //When resetStats is clicked (in win modal), game is reset
}

function handleCardClick(event){
  if(!canBeClicked) { //Conditional for is cards are in timeout period, for no cards to be able to get flipped
    return;
  }
  $(event.currentTarget).addClass("hidden"); //This flips the first card clicked on in the turn

  //EVENT FOR WHEN FIRST CARD IS CLICKED:

  if(!firstCardClicked){ //If firstCardClicked is null, make firstCardClicked value the value of the card clicked
    firstCardClicked = $(event.currentTarget);
    // console.log("firstCardClicked stuff: ", firstCardClicked);

    //EVENT FOR WHEN SECOND CARD IS CLICKED:
  } else {
    canBeClicked = false; //If the second card is clicked, turn canBeClicked to false
    secondCardClicked = $(event.currentTarget); //This gives secondCardClicked the value of the card clicked

    var firstCardBackground = firstCardClicked.prev().css('background-image'); //DRY??
    var secondCardBackground = secondCardClicked.prev().css('background-image'); //DRY??

      if(firstCardBackground === secondCardBackground){
        console.log("it's a match!");
        $(".bugs-bunny").addClass("bugs-running");
        bugsBunnyPosition+=5;
        $(".bugs-bunny").css("left", bugsBunnyPosition + "%");
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
        elmerFuddPosition += 5;
        $(".bad-guy").css("left", elmerFuddPosition + "%");
      }
        if(elmerFuddPosition === (bugsBunnyPosition-5)) {
          loseModal = $("div.you-lose-modal");
          loseModal.removeClass("hidden");
      }else{
          setTimeout(function (){
          firstCardClicked.removeClass("hidden");
          secondCardClicked.removeClass("hidden");
          firstCardClicked = 0;
          secondCardClicked = 0;
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
    accuracyPercentage = ((matches / attempts) * 100).toFixed(0) + "%";
    return accuracyPercentage;
  }

  function displayStats(){
    $(".stats-box #attempts-value").text(attempts);
    $(".stats-box #games-played-value").text(gamesPlayed);
    $(".stats-box #accuracy-value").text(calculateAccuracy());
  }

  function resetStats(){
    matches = 0;
    attempts = 0;
    gamesPlayed++;
    bugsBunnyPosition = 40;
    elmerFuddPosition = 0;
    $(".bad-guy").css("left", elmerFuddPosition + "%");
    $(".bugs-bunny").css("left", bugsBunnyPosition + "%");
    canBeClicked = true;
    displayStats();
    $(".container-around-cards div").removeClass("hidden");
    winModal.addClass("hidden");
    $(".container-around-cards").empty();
    initializeApp();
  }
  function tryAgain() {
    matches = 0;
    attempts = 0;
    gamesPlayed++;
    bugsBunnyPosition = 40;
    elmerFuddPosition = 0;
    $(".bad-guy").css("left", elmerFuddPosition + "%");
    $(".bugs-bunny").css("left", bugsBunnyPosition + "%");
    canBeClicked = true;
    displayStats();
    $(".container-around-cards div").removeClass("hidden");
    loseModal.addClass("hidden");
    $(".container-around-cards").empty();
    initializeApp();
  }

  function shuffleCards(){
    var arrOfCardUrls = ["yosemite-sam", "yosemite-sam", "carrots", "carrots", "daffy-duck",
    "daffy-duck", "tweety-bird", "tweety-bird", "taz", "taz", "alien",
    "alien", "lola", "lola", "coyote", "coyote", "fudd-happy", "fudd-happy"];
    for(var arrayIndex = 0; arrayIndex < arrOfCardUrls.length;){
      var randomIndex = Math.floor(Math.random() * arrOfCardUrls.length);
      var randomFrontCardLogoClass = arrOfCardUrls[randomIndex];
      var frontSkelDiv = $("<div>").addClass("front");
      var newFrontCard = frontSkelDiv.addClass(randomFrontCardLogoClass);
      var backCardDiv = $("<div>").addClass("back");
      var card = $("<div>").addClass("card");
      card.append(newFrontCard, backCardDiv);
      $("div.container-around-cards").append(card);
      arrOfCardUrls.splice(randomIndex, 1);
    }
  }
