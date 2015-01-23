var bullittSize = 5;
var bullitStep = 5;

if (Shooting === undefined) {
	var Shooting = {};
}

Shooting.shootLeft = function(x,y) {
	setTimeout(function(){
		if(!isPlayerAlive) {
			return;
		}

		if(x - bullitStep < 0) {
			// go out of board
			ctx.clearRect(x, y, bullittSize, bullittSize);
			return;
		}

		var nextToBullit = ctx.getImageData(x - bullitStep, y, 1, 1).data;

		if(nextToBullit[0] === 255 && nextToBullit[1] === 0 && nextToBullit[2] === 0 && nextToBullit[3] === 255) {
			//hit wall - stop
			ctx.clearRect(x, y, bullittSize, bullittSize);	
			return;
		}
		
		
		if(nextToBullit[0] === 0 && nextToBullit[1] === 0 && nextToBullit[2] === 255 && nextToBullit[3] === 255) {
			//shootted, return custom event
			soldiers.forEach(function(soldier){
	  			if(soldier.isInArea(x - bullitStep, y, bullittSize)){
	  				soldier.die();
	  			}
			});

			return;
		}

		ctx.clearRect(x, y, bullittSize, bullittSize);
        ctx.fillStyle="#000000";
    	ctx.fillRect(x - bullitStep, y, bullittSize, bullittSize);
		
		if (Shooting.isPlayerShooted(nextToBullit)) {
    		restart();
    		return;
    	}
		
		Shooting.shootLeft(x-bullitStep, y);
	},20);
};

Shooting.shootRight = function (x,y) {
	if(!isPlayerAlive) {
		return;
	}
	setTimeout(function(){
		if(x + bullitStep + bullittSize > 960) {
			// go out of board
			ctx.clearRect(x, y, bullittSize, bullittSize);
			return;
		}

		var nextToBullit = ctx.getImageData(x + bullitStep + bullittSize, y, 1, 1).data;

		if(nextToBullit[0] === 255 && nextToBullit[1] === 0 && nextToBullit[2] === 0 && nextToBullit[3] === 255) {
			//hit wall - stop
			ctx.clearRect(x, y, bullittSize, bullittSize);	
			return;
		}
		
		
		if(nextToBullit[0] === 0 && nextToBullit[1] === 0 && nextToBullit[2] === 255 && nextToBullit[3] === 255) {
			//shootted, return custom event
			soldiers.forEach(function(soldier){
	  			if(soldier.isInArea(x + bullitStep, y, bullittSize)){
	  				soldier.die();
	  			}
			});

			return;
		}
		
		ctx.clearRect(x, y, bullittSize, bullittSize);
        ctx.fillStyle="#000000";
    	ctx.fillRect(x + bullitStep + bullittSize, y, bullittSize, bullittSize);

    	if (Shooting.isPlayerShooted(nextToBullit)) {
    		restart();
    		return;
    	}

		Shooting.shootRight(x + bullitStep + bullittSize, y);
	},20);
};

Shooting.shootUp = function(x,y) {
	if(!isPlayerAlive) {
		return;
	}
	setTimeout(function() {
		if(y - bullitStep <= 0) {
			// go out of board
			ctx.clearRect(x, y, bullittSize, bullittSize);
			return;
		}

		var nextToBullit = ctx.getImageData(x, y - bullitStep, 1, 1).data;

		if(nextToBullit[0] === 255 && nextToBullit[1] === 0 && nextToBullit[2] === 0 && nextToBullit[3] === 255) {
			//hit wall - stop
			ctx.clearRect(x, y, bullittSize, bullittSize);	
			return;
		}

		
		if(nextToBullit[0] === 0 && nextToBullit[1] === 0 && nextToBullit[2] === 255 && nextToBullit[3] === 255) {
			//shootted, return custom event
			soldiers.forEach(function(soldier){
	  			if(soldier.isInArea(x, y - bullitStep, bullittSize)){
	  				soldier.die();
	  			}
			});

			return;
		}

		ctx.clearRect(x, y, bullittSize, bullittSize);
        ctx.fillStyle="#000000";
    	ctx.fillRect(x, y - bullitStep, bullittSize, bullittSize);

		if (Shooting.isPlayerShooted(nextToBullit)) {
    		restart();
    		return;
    	}		

		Shooting.shootUp(x, y - bullitStep);
	},20);
};

Shooting.shootDown = function(x,y) {
	if(!isPlayerAlive) {
		return;
	}
	setTimeout(function() {
		if(y + bullitStep + bullittSize > 450) {
			// go out of board
			ctx.clearRect(x, y, bullittSize, bullittSize);
			return;
		}

		var nextToBullit = ctx.getImageData(x, y + bullitStep + bullittSize, 1, 1).data;

		if(nextToBullit[0] === 255 && nextToBullit[1] === 0 && nextToBullit[2] === 0 && nextToBullit[3] === 255) {
			//hit wall - stop
			ctx.clearRect(x, y, bullittSize, bullittSize);	
			return;
		}
		
		// if(nextToBullit[0] === 0 && nextToBullit[1] === 255 && nextToBullit[2] === 0 && nextToBullit[3] === 255) {
		// 	//shootted, return custom event
		// 	// alert("Player down!")
		// 	// restart();
		// 	return;
		// }

		if(nextToBullit[0] === 0 && nextToBullit[1] === 0 && nextToBullit[2] === 255 && nextToBullit[3] === 255) {
			//shootted, return custom event
			soldiers.forEach(function(soldier){
	  			if(soldier.isInArea(x, y + bullitStep, bullittSize)){
	  				soldier.die();
	  			}
			});

			return;	
		}
		
		ctx.clearRect(x, y, bullittSize, bullittSize);
        ctx.fillStyle="#000000";
    	ctx.fillRect(x, y + bullitStep + bullittSize, bullittSize, bullittSize);

    	if (Shooting.isPlayerShooted(nextToBullit)) {
    		restart();
    		return;
    	}

		Shooting.shootDown(x, y + bullitStep + bullittSize);
	},20);
};


Shooting.shoot = function(x, y, direction) {
	if (directions.LEFT === direction){
		Shooting.shootLeft(x - bullittSize - 1,y);
	} else if (directions.RIGHT === direction) {
		Shooting.shootRight(x + 35, y);
	} else if (directions.UP === direction) {
		Shooting.shootUp(x,y - bullittSize - 1);
	} else if (directions.DOWN === direction) {
		Shooting.shootDown(x,y + 35);
	}
};

Shooting.isPlayerShooted = function(nextToBullit){
	if(nextToBullit[0] === 0 && nextToBullit[1] === 255 && nextToBullit[2] === 0 && nextToBullit[3] === 255) {
			//shootted, return custom event -> may be later
			level--;
			alert("You die! You are back to level: " + level	);
			return true;
	}

	return false;
};
