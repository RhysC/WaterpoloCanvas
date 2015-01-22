var canvasHelpers = (function(){
  var drawYAxisLine = function(canvas, x, color){
    console.log({canvas:canvas, x:x, color:color});
    canvas.beginPath();
    canvas.moveTo(x*config.multiplier, 0); 
    canvas.lineTo(x*config.multiplier, config.CANVAS_HEIGHT); 
    canvas.strokeStyle = color;
    canvas.stroke();
  }

  var drawRect = function(canvas, x, y, length, height){
    canvas.fillRect(
      (x * config.multiplier), 
      (y * config.multiplier), 
      (length * config.multiplier), 
      (height * config.multiplier));    
  }

  var drawSprite = function(canvas, position, sprite){
    var x = position.getX() * config.multiplier;
    var y = position.getY() * config.multiplier;
    sprite.drawCentered(canvas, x, y);
  }
  return {
    drawYAxisLine:drawYAxisLine,
    drawRect:drawRect,
    drawSprite: drawSprite
  };
})();

var entities = (function(positioning) {
  console.log(positioning);
  var FieldPosition = function(x,y){
    this.getX = function(){ return x; };
    this.getY = function(){ return y; };
  };
  
  var PositionBoundary = function(x,color){
    this.draw = function(canvas){
      canvasHelpers.drawYAxisLine(canvas, x, color);    
    }
  }
  
  var Goal = function(x){
    var self = this;
    self.fieldPosition = new FieldPosition(x, config.poolWidth/2);
    self.draw = function(canvas){
      canvasHelpers.drawRect(canvas, x, (config.poolWidth/2)-(config.goalWidth/2), config.goalDepth, config.goalWidth);
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
      var point = positioning.getPointBetween(goal.fieldPosition, player.fieldPosition, distanceFromPlayer);
      self.setPosition(point.x,point.y);
    };
    
    self.draw = function(canvas) {
      canvasHelpers.drawSprite(canvas, self.fieldPosition, self.sprite);
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
    
  var field = {
    draw : function(canvas){
      halfway.draw(canvas);
      first2Meter.draw(canvas);
      second2Meter.draw(canvas);
      first5Meter.draw(canvas);
      second5Meter.draw(canvas);
      goal1.draw(canvas);
      goal2.draw(canvas);
    }
  };
  
  return {
    createBluePlayer : createBluePlayer,
    createWhitePlayer : createWhitePlayer,
    createBall: createBall,
    goal1:goal1,
    goal2:goal2,
    field : field    
  }
}(positioning));
