function Player(x, y, color, inStepSize, inPlayerSize){
	//default values
	x = typeof x !== "undefined" ? x : 0;
	y = typeof y !== "undefined" ? y : 0;
	color = typeof color !== "undefined" ? color : "#00FF00";
	inPlayerSize = typeof inPlayerSize !== "undefined" ? inPlayerSize : 20;
	inStepSize = typeof inStepSize !== "undefined" ? inStepSize : 20;

	var cx = x;
	var cy = y;
	var playerColor = color;
	var playerSize = inPlayerSize;
	var stepMove = inStepSize;
	var playerLastDirection = 37;

	function initParameters() {
		cx = x;
		cy = y;
		playerColor = color;
		playerSize = inPlayerSize;
		stepMove = inStepSize;
		playerLastDirection = 37;		
	}

	function initKeys(){
		$(document).bind("keydown", function(e){
		    switch(e.keyCode) {
		      //left
		      case 37:
		    		if (cx-stepMove < 0 || !MoveValidator.isValidLeftMove(cx,cy)) break;
		        
		        playerLastDirection = e.keyCode;

		        ctx.fillStyle = playerColor;
		        moveLeft(cx, cy);
		        cx -= stepMove;
		      break;
		          
		      //up
		      case 38:
		    		if (cy-stepMove < 0 || !MoveValidator.isValidUpMove(cx,cy)) break;

		        playerLastDirection = e.keyCode;

		        ctx.fillStyle = playerColor;
		        moveUp(cx, cy);
		        cy -= stepMove;
		      break;
		          
		      //right
		      case 39:
		    		if (cx+stepMove>960 || !MoveValidator.isValidRightMove(cx,cy)) break;

		        playerLastDirection = e.keyCode;

		        ctx.fillStyle = playerColor;
		        moveRight(cx, cy);
		        cx += stepMove;
		      break;
		      
		      //down
		      case 40:
		    		if (cy+stepMove>450 || !MoveValidator.isValidDownMove(cx,cy)) break;

		        playerLastDirection = e.keyCode;

		        ctx.fillStyle = playerColor;
		        moveDown(cx, cy);
		        cy += stepMove;
		      break;

		      case 32:
		        if(playerLastDirection === 37) Shooting.shootLeft(cx - soldierSize, cy);
		        if(playerLastDirection === 38) Shooting.shootUp(cx, cy - soldierSize);
		        if(playerLastDirection === 39) Shooting.shootRight(cx + 2 * soldierSize, cy);
		        if(playerLastDirection === 40) Shooting.shootDown(cx, cy + 2 * soldierSize);
		      break;
		    }
		});

	}

	this.start = function() {
		initParameters();
		initKeys();
	}

	this.restart = function() {
		initParameters();
		// initKeys();
	}
}