var fieldPositioning = (function() {
    
  var getPointBetween = function(target, origin, distanceFromOrigin) {
    var opposite = target.getY() - origin.getY();
    var adjacent = target.getX() - origin.getX();
    var angle = Math.atan(opposite/adjacent);
    var hypotenuseLength = Math.sqrt((opposite*opposite)+(adjacent*adjacent));
    var newHypotenuseLength = hypotenuseLength - distanceFromOrigin;
    
    var newX = target.getX() + (Math.cos(angle)*newHypotenuseLength);
    var newY = target.getY() + (Math.sin(angle)*newHypotenuseLength);
    return { 
      x: newX, 
      y: newY
    };
  };

  return {
    getPointBetween : getPointBetween,    
  }
}());
