function moveWithDirection(cx,cy,direction){
  if (directions.LEFT === direction){
    moveLeft(cx, cy);
  } else if (directions.RIGHT === direction){
    moveRight(cx, cy);
  } else if (directions.UP === direction){
    moveUp(cx, cy);
  } else if (directions.DOWN === direction){
    moveDown(cx, cy);
  } 
}

function moveLeft(cx,cy){
	move(cx, cy, cx - stepMove, cy);
}

function moveRight(cx,cy){
	move(cx, cy, cx + stepMove, cy);
}

function moveUp(cx,cy){
	move(cx, cy, cx, cy - stepMove);
}

function moveDown(cx,cy){
	move(cx, cy, cx, cy + stepMove);
}

function move(cx,cy, nextX, nextY){
	ctx.clearRect(cx, cy, soldierSize, soldierSize);
  ctx.fillRect(nextX, nextY, soldierSize, soldierSize);
}