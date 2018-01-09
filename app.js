/* Create a list that holds all of your cards */
let cards = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o", "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf", "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"];
// Create array to hold opened cards
let cardOpen = [];
let moves = 0;
let matchFound = 0;
let starNumber = 3;
let timer;

// Shuffle cards (function from http://stackoverflow.com/a/2450976)
function shuffle(array) {
 var currentIndex = array.length,
  temporaryValue, randomIndex;

 while (currentIndex !== 0) {
  randomIndex = Math.floor(Math.random() * currentIndex);
  currentIndex -= 1;
  temporaryValue = array[currentIndex];
  array[currentIndex] = array[randomIndex];
  array[randomIndex] = temporaryValue;
 }
 return array;
}

shuffle(cards);

// Create and append each card's HTMl
function createCard() {
 let cardList = shuffle(cards);
 cardList.forEach(function(card) {
  $(".deck").append('<li><i class="card fa ' + card + '"></i></li>');

 });
}
createCard();

// Function for matched cards
function matchCards() {

 // Show cards 
 $(".card").on("click", function() {
  if ($(this).hasClass("open show")) {
   return
  }
  $(this).toggleClass(" flipInY open show");
  cardOpen.push($(this));

  // Check cards if they matched or not
  if (cardOpen.length === 2) {
   if (cardOpen[0][0].classList[2] === cardOpen[1][0].classList[2]) {
    cardOpen[0][0].classList.add("flash", "match");
    cardOpen[1][0].classList.add("flash", "match");
    $(cardOpen[0]).off('click');
    $(cardOpen[1]).off('click');
    matchFound += 1;
    moves++;
    removeOpenCards();
    endOfGame();
   } else {
    // If classes don't match, add "wobble" class
    cardOpen[0][0].classList.add("wobble", "wrong");
    cardOpen[1][0].classList.add("wobble", "wrong");
    // Timeout to remove cards
    setTimeout(removeClasses, 800);
    setTimeout(removeOpenCards, 800);
    moves++;
   }
  }

  UpdateMoves();
 });

}

matchCards();

//Set Timer on click
function gameTimer() {
 let clicks = 0;
 $(".card").on("click", function() {
  clicks += 1;
  if (clicks === 1) {
   var sec = 0;

   function time(val) {
    return val > 9 ? val : "0" + val;
   }
   timer = setInterval(function() {
    let current_time = new Date().getTime();
    $(".seconds").html(time(++sec % 60));
    $(".minutes").html(time(parseInt(sec / 60, 10)));
   }, 500);
  }
 })
}
gameTimer();

// Update HTML with number of moves
function UpdateMoves() {

 $("#moves").text(moves.toString());
 // Update star's number
 if (moves >= 0 && moves <= 8) {
  starNumber = '3';
  // Remove 1st Star
 } else if (moves >= 9 && moves <= 18) {
  $("#starOne").removeClass("fa-star");
  starNumber = '2';
  // Remove 2nd Star    
 } else if (moves >= 19 && moves <= 25) {
  $("#starTwo").removeClass("fa-star");
  starNumber = '1';
 }
}


// Open module when game is completed 
function endOfGame() {

 if (matchFound === 8) {
  window.clearInterval(timer);
  var modal = document.getElementById('message');
  var span = document.getElementsByClassName("close")[0];

  $("#total-moves").text(moves);
  $("#total-stars").text(starNumber);

  modal.style.display = "block";


  span.onclick = function() {
   modal.style.display = "none";
  };
  // Play again button
  $("#play-again-btn").on("click", function() {
   location.reload()
  });

  clearInterval(timer);
 }
}
// Function to remove open cards
function removeOpenCards() {
 cardOpen = [];

}

// Remove all classes except "match"
function removeClasses() {
 $(".card").removeClass("show open wobble wrong");
 removeOpenCards();
}

//Reset the game 
function resetGame() {
 $("#restart").on("click", function() {
  location.reload()
 });
}

resetGame();