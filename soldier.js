var soldierSeenAtRegion = [0,0,0,0,0,0,0,0];

var directions = {
	LEFT : 0,
	RIGHT : 1,
	UP : 2,
	DOWN : 3,
};

var NOT_SEEN = {x: -10, y: -10};


var SoldierAI = function(x, y, color, size){
	//default values
	x = typeof x !== "undefined" ? x : 900;
	y = typeof y !== "undefined" ? y : 400;
	color = typeof color !== "undefined" ? color : "#0000FF";
	size = typeof size !== "undefined" ? size : 20;

	var currX = x;
	var currY = y;
	var seen = false;
	var soldierColor = color;
	var soldierSize = size;
	var isSoldierAlive = true;
	var sightValidator = new SightValidator();
	var strategy = false;

	this.visitedPositions = null;
	
	//private
	
	var soldierAction = function() {
		if (!isPlayerAlive) {
			return;
		}
		
		if (!isSoldierAlive) {
			ctx.clearRect(currX, currY, soldierSize, soldierSize);
			return;
		}

		var sumOfSeens = soldierSeenAtRegion[0] + soldierSeenAtRegion[1] + soldierSeenAtRegion[2] + soldierSeenAtRegion[3] + soldierSeenAtRegion[4] + soldierSeenAtRegion[5] + soldierSeenAtRegion[6] + soldierSeenAtRegion[7];

		// if (sumOfSeens >= 25) {
		// 	strategy = true;
		// } else {
		// 	strategy = false;
		// }

		setTimeout(function(){
			
			var seenAt = sightValidator.lookForOpponent(currX, currY);
			
			//TODO: create const coords for unseen 
			if (seenAt.x === NOT_SEEN.x && seenAt.y === NOT_SEEN.y) {
				
				// if (strategy) {
				// 	var section;
				// 	var max = 0;
				// 	for(int i = 0; i < 8; i++) {
				// 		if (soldierSeenAtRegion[i] > max) {
				// 			section = i;
				// 			max = soldierSeenAtRegion[i];
				// 		}	
				// 	}
				// }

				searchOpponent();
				//TODO: underquestioning:
				seen = false;
			} else {
				if(!seen) {
					markSoldierSeenPosition(seenAt.x, seenAt.y);
					seen = true;
				}
				fightOpponent(seenAt);
			}

			soldierAction();
		}, soldierSpeed);
	}

	var fightOpponent = function(opponentCoords){
		
		if (MoveValidator.isValidDirectedMove(currX, currY, opponentCoords.direction)){
			ctx.fillStyle = soldierColor;
			// moveWithDirection(currX, currY, opponentCoords.direction);
		}

		Shooting.shoot(currX, currY, opponentCoords.direction);
	};
	
	var searchOpponent = function() {
		var availablePos = [];
		// alert(visitedPositions[currX-stepMove][currY]);
		if(MoveValidator.isValidLeftMove(currX,currY) && !visitedPositions[currX - stepMove][currY])
			availablePos.push({x:currX - stepMove, y:currY}); 
		if(MoveValidator.isValidRightMove(currX,currY) && !visitedPositions[currX + stepMove][currY])
			availablePos.push({x:currX + stepMove, y:currY}); 
		if(MoveValidator.isValidUpMove(currX,currY) && !visitedPositions[currX][currY - stepMove])
			availablePos.push({x:currX, y:currY - stepMove}); 
		if(MoveValidator.isValidDownMove(currX,currY) && !visitedPositions[currX][currY + stepMove])
			availablePos.push({x:currX, y:currY + stepMove});

		if (availablePos.length == 0) {
			if(MoveValidator.isValidLeftMove(currX,currY))
				availablePos.push({x:currX - stepMove, y:currY}); 
			if(MoveValidator.isValidRightMove(currX,currY))
				availablePos.push({x:currX + stepMove, y:currY}); 
			if(MoveValidator.isValidUpMove(currX,currY))
				availablePos.push({x:currX, y:currY - stepMove}); 
			if(MoveValidator.isValidDownMove(currX,currY))
				availablePos.push({x:currX, y:currY + stepMove});			
		}

		var rndIndex = generateRandomNumber(0, availablePos.length-1);
		var nextMove = {};
		nextMove = availablePos[rndIndex] || {};
		
		ctx.fillStyle = soldierColor;
		if(undefined === nextMove || undefined === nextMove.x || undefined === nextMove.y) {
			nextMove.x = currX;
			nextMove.y = currY;
		}

		move(currX, currY, nextMove.x, nextMove.y);

		currX = nextMove.x;
		currY = nextMove.y;

		markAsVisited(currX, currY);
	}

	var create2DArray = function(rows) {
	  var arr = [];
	  for (var i=0;i<rows;i++) {
	     arr[i] = [];
	  }
	  return arr;
	}

	var markSoldierSeenPosition = function (x, y) {
		if(x<250)	
			if(y < 240)
				soldierSeenAtRegion[0]++;
			else
				soldierSeenAtRegion[1]++;
		else if(x < 500)
				if(y < 240)
					soldierSeenAtRegion[2]++;
				else
					soldierSeenAtRegion[3]++;
		else if(x < 750)
				if (y < 240)
					soldierSeenAtRegion[4]++;
				else
					soldierSeenAtRegion[5]++;
		else if(y < 240)
			soldierSeenAtRegion[6]++;
		else 
			soldierSeenAtRegion[7]++;
	}


	function markAsVisited(currX, currY) {
		for (var i=currX; i < currX+soldierSize; i++) {
			for (var j=currY; j < currY + soldierSize; j++) {
				visitedPositions[i][j] = 1;
			}
		}		
	}

	function start(){
		visitedPositions = create2DArray(1000);
		isSoldierAlive = true;
		ctx.fillStyle = soldierColor;
		ctx.fillRect(currX, currY, soldierSize, soldierSize);
		markAsVisited(currX, currY);
		soldierAction();
	}
	///public

	//Getters
	this.isSeen = function() { return seen; }
	this.getX = function() { return currX; }
	this.getY = function() { return currY; }
	this.getSoldierColor = function() { return soldierColor; }
	this.getSoldierSize = function() { return soldierSize; }

	this.startAI = function(){
		start();
	}

	this.restartAI = function() {
		currX = x;
		currY = y;
		soldierSize = size;
		soldierColor = color;

		start();
	}

	this.isInArea = function(areaX, areaY, size) {


		if((areaX + size >= currX) && (currX + soldierSize >= areaX)) {
			if (((currY <= areaY + size)) && (currY + soldierSize >= areaY))
				return true;
		}
		return false;

	}

	this.die = function() {
		if (isSoldierAlive) {
			isSoldierAlive = false;
			numberOfDead++;
			
			if (numberOfDead === numberOfSoldiers) {
				level++;
				alert("You win and go to te next level: " + level);
				restart();
			}
		}
	}
}