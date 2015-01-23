if(MoveValidator === undefined){
  var MoveValidator = {}; 
}

MoveValidator.isValidDirectedMove = function(x, y, direction){
  if (directions.LEFT === direction){
    return MoveValidator.isValidLeftMove(x, y);
  } else if (directions.RIGHT === direction){
    return MoveValidator.isValidRightMove(x, y);
  } else if (directions.UP === direction){
    return MoveValidator.isValidUpMove(x, y);
  } else if (directions.DOWN === direction){
    return MoveValidator.isValidDownMove(x, y);
  }
};

MoveValidator.isValidLeftMove = function(x, y) {
  return x - stepMove >= 0 && MoveValidator.isValidMove(x - stepMove, y, x - stepMove, y + soldierSize);
};

MoveValidator.isValidRightMove = function(x, y) {
  return x + stepMove + soldierSize <= 960 && MoveValidator.isValidMove(x + soldierSize + stepMove, y, x + soldierSize + stepMove, y + soldierSize);
};

MoveValidator.isValidUpMove = function(x, y) {
  return y - stepMove >= 0 && MoveValidator.isValidMove(x, y - stepMove, x + soldierSize, y - stepMove);
};

MoveValidator.isValidDownMove = function(x, y) {  
  return y + stepMove + soldierSize <= 450 && MoveValidator.isValidMove(x, y + stepMove + soldierSize, x + soldierSize, y + stepMove + soldierSize);
};

MoveValidator.isValidMove = function(x_near, y_near, x_far, y_far) {

  var moveColor = {};
  moveColor.near = ctx.getImageData(x_near,y_near,1,1).data;
  moveColor.far = ctx.getImageData(x_far, y_far,1,1).data;
  
  return (moveColor.near[0] == 0 && moveColor.near[1] == 0 && moveColor.near[2] == 0 && moveColor.near[3] == 0)
        && 
        (moveColor.far[0] == 0 && moveColor.far[1] == 0 && moveColor.far[2] == 0 && moveColor.far[3] == 0);
};

MoveValidator.isInBoard = function(cx, cy) {
  if (cx-stepMove < 0 || cy-stepMove < 0 || cx+stepMove>960 || cy+stepMove>450) return false;
  return true; 
};