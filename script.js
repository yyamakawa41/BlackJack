var deck = [];
var placeInDeck = 0;
var playerTotalCards = 2;
var dealerTotalCards = 2;
var playerHand;
var dealerHand;
var message;
var bustMessage;

function shuffleDeck(){
	var deck =[];	
	var suit = "";
	for(s = 1; s <=4; s++){
		if( s === 1){
			suit = "h";
		} else if(s === 2){
			suit = "s";
		} else if(s === 3){
			suit = "d";
		} else if(s ===4){
			suit = "c";
		}
		for(i = 1; i <= 13; i++){
			deck.push(i+suit);
		}
	}
	console.log(deck);


	var numberOfTimesToShuffle = Math.floor( Math.random() * 500 + 500);
	for(i = 0; i < numberOfTimesToShuffle; i++){
		var card1 = Math.floor(Math.random() * 52);
		var card2 = Math.floor(Math.random() * 52);
		var temp = deck[card2];
		deck[card2] = deck[card1];
		deck[card1] = temp;
	}
	console.log(deck);
	return deck;
}

	function placeCard(cardText, who, slot){
		var currId = who + '-card-' + slot;
		var currElement = document.getElementById(currId);
		currElement.className = "card";
		currElement.innerHTML = cardText;
	}

	function bust(who){
		if(who === "player"){
			bustedMessage = "You have busted, better luck next time! "
		} else if (who ==="dealer"){
			bustedMessage = "The dealer has busted! "
		}
		checkWin();
	}

	function calculateTotal(hand, who){
		var total = 0;
		for (i=0; i<hand.length; i++){
			var cardValue = Number(hand[i].slice(0, -1));
			if (cardValue >10){
				cardValue=10
			}
			total = total + cardValue; //total += cardValue;
		}
		var idWhoToGet = who + '-total';
		var element=document.getElementById(idWhoToGet);
		console.dir(element);
		element.innerHTML = total;


		if(total > 21){
			bust(who);
			console.log(total);
		}
		return total;
	}	

	function deal(){
		reset()
		deck = shuffleDeck();
		playerHand = [ deck[0], deck[2] ];
		dealerHand = [ deck[1], deck[3] ];
		placeInDeck = 4;	

		placeCard(playerHand[0], 'player', 'one');
		placeCard(dealerHand[0], 'dealer', 'one');
		placeCard(playerHand[1], 'player', 'two');
		placeCard(dealerHand[1], 'dealer', 'two');	

		calculateTotal(playerHand, 'player');
		calculateTotal(dealerHand, 'dealer');
	}	

	function hit(){
		var slot;
		if (playerTotalCards === 2){slot = "three";}
		else if (playerTotalCards === 3){slot = "four";}
		else if (playerTotalCards === 4){slot = "five";}
		else if (playerTotalCards === 5){slot = "six";}	

		placeCard(deck[placeInDeck], 'player', slot);
		playerHand.push(deck[placeInDeck]);
		playerTotalCards++;
		placeInDeck++;
		calculateTotal(playerHand, 'player');
		
	}	

	function checkWin(){
		// alert(document.getElementById('message').innerHTML);
		var playerTotal = Number(document.getElementById('player-total').innerHTML);
		var dealerTotal = Number(document.getElementById('dealer-total').innerHTML);
		var winner
		if (((playerTotal > dealerTotal) && (playerTotal <= 21)) || ((playerTotal <= 21) && (dealerTotal > 21))){
			message = "You Win!";
		} else if ((playerTotal===dealerTotal)&&(playerTotal<=21)){
			message = "It's a push!";
		}else{
			message ="Dealer Wins!"
		}
		document.getElementById('message').innerHTML=bustedMessage + message;
	}

	function reset(){
		deck = [];
	 	placeInDeck = 0;
 		playerTotalCards = 2;
 		dealerTotalCards = 2;
 		playerHand;
 		dealerHand;
 		bustedMessage="";
 		message = "";
		document.getElementById('message').innerHTML = "";

		var cards = document.getElementsByClassName("card");
		console.log(cards);
		for( i=0; i < cards.length; i++){
			cards[i].className = cards[i].className + " empty";
			cards[i].innerHTML = "";
		}
	}

	function stand(){	
		var dealerHas = calculateTotal(dealerHand, 'dealer');
		// var dealerHas = Number(document.getElementById('dealer-total').innerHTML);
		var slot;
		while (dealerHas < 17){
			if (dealerTotalCards === 2){slot = "three";}
			else if (dealerTotalCards === 3){slot = "four";}
			else if (dealerTotalCards === 4){slot = "five";}
			else if (dealerTotalCards === 5){slot = "six";}	
			placeCard(deck[placeInDeck], 'dealer', slot);
			dealerHand.push(deck[placeInDeck]);
			dealerHas = calculateTotal(dealerHand, 'dealer');
			placeInDeck++;
			dealerTotalCards++;
		}
		checkWin();
	}	

