$(document).ready(initializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var matches = 0;
var maxMatches = 9;
var attempts = 0;
var gamesPlayed = 0;
var winModal;;
var loseModal;
var accuracyPercentage = 0;
var canBeClicked = true;
var bugsBunnyPosition = 40;
var elmerFuddPosition = 0;

function initializeApp(){
  shuffleCards();
  var card = $(".card > .back");
  card.on("click", handleCardClick);
  $("div.start-button").on("click", hideStartModal);
  $("div.reset-game-button").on("click", resetStats);
  $("div.try-again-button").on("click", tryAgain);
}

function hideStartModal() {
  var startModal = $("div.start-modal");
  startModal.addClass("hidden");
}

function handleCardClick(event){
  if(!canBeClicked) {
    return;
  }
  $(event.currentTarget).addClass("hidden");

  if(!firstCardClicked){
    firstCardClicked = $(event.currentTarget);
  } else {
    canBeClicked = false;
    secondCardClicked = $(event.currentTarget);
    var firstCardBackground = firstCardClicked.prev().css('background-image');
    var secondCardBackground = secondCardClicked.prev().css('background-image');

      if(firstCardBackground === secondCardBackground){
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
          winModal =  = $("div.win-modal");
          winModal.removeClass("hidden");
        }
      }else{
        elmerFuddPosition += 5;
        $(".bad-guy").css("left", elmerFuddPosition + "%");
        if(elmerFuddPosition === (bugsBunnyPosition-5)) {
          // canBeClicked = false;
          loseModal = $("div.lose-modal");
          loseModal.removeClass("hidden");
        }else{
          setTimeout(function (){
            firstCardClicked.removeClass("hidden");
            secondCardClicked.removeClass("hidden");
            attempts++;
            displayStats();
            firstCardClicked = null;
            secondCardClicked = null;
            canBeClicked = true;
          }, 1500);
        }
      }
    }
}

  function calculateAccuracy(){
    if(attempts === 0) {
      return '-'
    };
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
    displayStats();
    $(".container-around-cards div").removeClass("hidden");
    winModal.addClass("hidden");
    $(".container-around-cards").empty();
    initializeApp();
  }
  function tryAgain() {
    matches = 0;
    attempts = 0;
    accuracyPercentage = 0;
    gamesPlayed++;
    bugsBunnyPosition = 40;
    elmerFuddPosition = 0;
    firstCardClicked = null;
    secondCardClicked = null;
    $(".bad-guy").css("left", elmerFuddPosition + "%");
    $(".bugs-bunny").css("left", bugsBunnyPosition + "%");
    displayStats();
    $(".container-around-cards div").removeClass("hidden");
    loseModal.addClass("hidden");
    $(".container-around-cards").empty();
    initializeApp();
    setTimeout(function () {
      canBeClicked = true;
    }, 2000);
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
