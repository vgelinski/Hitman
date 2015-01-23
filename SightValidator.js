function SightValidator(){
	
	var seenAt = { x: -10, y: -10 };
	

	var isOpponent = function(x,y) {
		var moveColor =  ctx.getImageData(x,y,1,1).data;
	  
	  	return (moveColor[0] == 0 && moveColor[1] == 255 
	  		&& moveColor[2] == 0 && moveColor[3] == 255);
	};

	var isWall = function(x,y) {
		var moveColor =  ctx.getImageData(x,y,1,1).data;
	 	
	  	return (moveColor[0] == 255 && moveColor[1] == 0 && 
	        	moveColor[2] == 0 && moveColor[3] == 255);
	};

	var valideteLeft = function(x,y) {
		var arr = [y, y+soldierSize-1];
		for (var i in arr) {
			for (var j=x; j>=0; j-=soldierSize) {
				if(isWall(j,arr[i])) break;
				if(isOpponent(j,arr[i])) {

					seenAt.x = j;
					seenAt.y = arr[i];
					seenAt.direction = directions.LEFT;

					return true;
				}
			}
		}
		return false;
	}

	var valideteRight = function(x,y) {
		var arr = [y, y+soldierSize-1];
		for (var i in arr) {
			for (var j=x+soldierSize; j<=950; j+=soldierSize) {
				if(isWall(j,arr[i])) return;
				if(isOpponent(j,arr[i])) {
					// alert("can shoot right");
		
					seenAt.x = j;
					seenAt.y = arr[i];
					seenAt.direction = directions.RIGHT;

					return true;
				}
			}
		}
		return false;
	};


	var valideteUp = function(x,y) {
		var arr = [x, x+soldierSize-1];
		for (var i in arr) {
			for (var j=y; j>=0; j-=soldierSize) {
				if(isWall(arr[i],j)) break;
				if(isOpponent(arr[i],j)) {
					// alert("can shoot up");

					seenAt.x = j;
					seenAt.y = arr[i];
					seenAt.direction = directions.UP;

					return true;
				}
			}
		}
		return false;
	};

	var valideteDown = function(x,y) {
		var arr = [x, x+soldierSize-1];
		for (var i in arr) {
			for (var j=y+soldierSize; j<=450; j+=soldierSize) {
				if(isWall(arr[i],j)) break;
				if(isOpponent(arr[i],j)) {
					// alert("can shoot down");
	
					seenAt.x = j;
					seenAt.y = arr[i];
					seenAt.direction = directions.DOWN;

					return true;
				}
			}
		}
		return false;
	};

	this.lookForOpponent = function(x, y){

		seenAt = { x: -10, y: -10 };

		if (valideteLeft(x,y)) return seenAt;
		if(valideteRight(x,y)) return seenAt;
		if (valideteUp(x,y)) return seenAt;
		if (valideteDown(x,y)) return seenAt;
		
		return NOT_SEEN;
	}
}