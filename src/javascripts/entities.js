var canvasHelpers = (function(){
  var drawYAxisLine = function(x, color){
    canvas.beginPath();
    canvas.moveTo(x*config.multiplier, 0); 
    canvas.lineTo(x*config.multiplier, config.CANVAS_HEIGHT); 
    canvas.strokeStyle = color;
    canvas.stroke();
  }

  var drawRect = function(x, y, length, height){
    canvas.fillRect(
      (x * config.multiplier), 
      (y * config.multiplier), 
      (length * config.multiplier), 
      (height * config.multiplier));    
  }

  var drawSprite = function(position,sprite){
    var x = position.getX() * config.multiplier;
    var y = position.getY() * config.multiplier;
    sprite.draw(canvas, x, y);
  }
  return {
    drawYAxisLine:drawYAxisLine,
    drawRect:drawRect,
    drawSprite: drawSprite
  };
})();

var entities = (function(field) {
  var FieldPosition = function(x,y){
    this.getX = function(){ return x; };
    this.getY = function(){ return y; };
  };
  
  var PositionBoundary = function(x,color){
    this.draw = function(){
      canvasHelpers.drawYAxisLine(x,color);    
    }
  }
  
  var Goal = function(x){
    var self = this;
    self.fieldPosition = new FieldPosition(x, config.poolWidth/2);
    self.draw = function(){
      canvasHelpers.drawRect(x,(config.poolWidth/2)-(config.goalWidth/2),config.goalDepth,config.goalWidth);
    }					
  }
   
  //IN-FIELD ELEMENTS
  var InFieldEntity = function(x,y,sprite){
    var self = this;
    self.fieldPosition = new FieldPosition(x,y);
    self.sprite = sprite;   
    
    self.setPosition = function(x, y) {
      self.fieldPosition = new FieldPosition(x,y);
    };
    self.goalSideOf = function(goal, player, distanceFromPlayer) {
      var point = field.getPointBetween(goal.fieldPosition, player.fieldPosition, distanceFromPlayer);
      self.setPosition(point.x,point.y);
    };
    
    self.draw = function() {
      canvasHelpers.drawSprite(self.fieldPosition, self.sprite);
    };  
  }
  
  var createBluePlayer = function(x,y){
    return new InFieldEntity(x, y, Sprite("enemy"));    
  }
  var createWhitePlayer = function(x,y){
     return new InFieldEntity(x, y, Sprite("player"));    
  }   
  var createBall = function(x,y){
     return new InFieldEntity(x, y, Sprite("ball"));    
  }     
     
  var goal1 = new Goal(0);
  var goal2 = new Goal(config.poolLength);
       
  var first2Meter = new PositionBoundary(2, "#f00");
  var second2Meter = new PositionBoundary(config.poolLength -2, "#f00");
  var first5Meter = new PositionBoundary(5, "#ff0");
  var second5Meter = new PositionBoundary(config.poolLength-5, "#ff0");
  var halfway = new PositionBoundary(config.poolLength/2, "#000");
    
  var drawField = function(){
    halfway.draw();
    first2Meter.draw();
    second2Meter.draw();
    first5Meter.draw();
    second5Meter.draw();
    goal1.draw();
    goal2.draw();
  }
  
  return {
    createBluePlayer : createBluePlayer,
    createWhitePlayer : createWhitePlayer,
    createBall: createBall,
    goal1:goal1,
    goal2:goal2,
    drawField : drawField    
  }
}(fieldPositioning));
