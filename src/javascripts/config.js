var config = (function(){

  var multiplier = 30;
  var poolWidth = 20;
  var poolLength = 30;
  var goalDepth = 0.5;
  var goalWidth = 3;

  return{
    multiplier : multiplier,
    poolWidth : poolWidth,
    poolLength : poolLength,
    goalDepth : goalDepth,
    goalWidth : goalWidth,
    CANVAS_WIDTH :(poolLength * multiplier) + (goalDepth * multiplier),
    CANVAS_HEIGHT : poolWidth * multiplier
  };
})();
