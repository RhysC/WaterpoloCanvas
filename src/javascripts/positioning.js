var positioning = (function() {

  var getPointBetween = function(target, origin, distanceFromOrigin) {
    var opposite =  Math.abs(target.getY() - origin.getY());
    var adjacent =  Math.abs(target.getX() - origin.getX());
    var angle = Math.atan(opposite/adjacent);
    var hypotenuseLength = Math.sqrt((opposite*opposite)+(adjacent*adjacent));
    var newHypotenuseLength = 0;hypotenuseLength - distanceFromOrigin;
    var newX, 
        newY;
    if(origin.getX() > target.getX()){
      var newHypotenuseLength = hypotenuseLength - distanceFromOrigin;
      var newX = Math.min(target.getX(), origin.getX()) + (Math.cos(angle)*newHypotenuseLength);
    }else{
      var newHypotenuseLength = distanceFromOrigin;
      var newX = Math.min(target.getX(), origin.getX()) + (Math.cos(angle)*newHypotenuseLength);
    }
    
    if(origin.getY() > target.getY()){
      var newHypotenuseLength = hypotenuseLength - distanceFromOrigin;
      var newY = Math.min(target.getY(), origin.getY()) + (Math.sin(angle)*newHypotenuseLength);
    }else{
      var newHypotenuseLength = distanceFromOrigin;
      var newY = Math.min(target.getY(), origin.getY()) + (Math.sin(angle)*newHypotenuseLength);
    }
       
    return {
      x: newX,
      y: newY
    };
  };

  return {
    getPointBetween : getPointBetween,
  };
}());
