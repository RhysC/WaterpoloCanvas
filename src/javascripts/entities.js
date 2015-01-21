var entities = (function() {
  var multiplier = 30;
  var poolWidth = 20;
  var poolLength = 30;
  var goalDepth = 0.5;
  var goalWidth = 3;
  var CANVAS_WIDTH = (poolLength * multiplier) + (goalDepth * multiplier);
  var CANVAS_HEIGHT = poolWidth * multiplier;
        		
  var PositionBoundary = function(x,color){
    var self = this;
    self.x = x;
    self.color = color;
    self.draw = function(){
      canvas.beginPath();
      canvas.moveTo(self.x, 0); 
      canvas.lineTo(self.x, CANVAS_HEIGHT); 
      canvas.strokeStyle = self.color;
      canvas.stroke();
    }
  }
  var Goal = function(x){
    var self = this;
    self.color= "#00A";
    self.x=x;
    self.y=(CANVAS_HEIGHT/2);
    self.width=goalDepth*multiplier;
    self.height=goalWidth*multiplier;
    self.draw = function(){
       canvas.fillRect(x, (CANVAS_HEIGHT/2)-(self.height/2), self.width, self.height);
    }					
  }
  
  var goal1 = new Goal(0);
  var goal2 = new Goal(CANVAS_WIDTH-(goalDepth*multiplier));
       
  var first2Meter = new PositionBoundary(2*multiplier, "#f00");
  var second2Meter = new PositionBoundary(28*multiplier, "#f00");
  var first5Meter = new PositionBoundary(5*multiplier, "#ff0");
  var second5Meter = new PositionBoundary(25*multiplier, "#ff0");
  var halfway = new PositionBoundary(15*multiplier, "#000");
    
  var drawField = function(){
    halfway.draw();
    first2Meter.draw();
    second2Meter.draw();
    first5Meter.draw();
    second5Meter.draw();
    goal1.draw();
    goal2.draw();
  }
  
  
  
  var InFieldEntity = function(x,y,sprite){
    var self = this;
    self.x = x*multiplier;
    self.y = (y)*multiplier;
    self.sprite = sprite;
    self.draw = function() {
      self.sprite.draw(canvas, self.x, self.y);
    };
  }
  
  var Enemy = function(x,y){
    InFieldEntity.call(this, x, y, Sprite("enemy"));    
  }
  var TeamMate = function(x,y){
    InFieldEntity.call(this, x, y, Sprite("player"));    
  }   
  var Ball = function(x,y){
    InFieldEntity.call(this, x, y, Sprite("ball"));    
  }     
  return {
    Enemy : Enemy,
    TeamMate : TeamMate,
    Ball: Ball,
    Goal:Goal,
    drawField : drawField, 
    CANVAS_WIDTH : CANVAS_WIDTH,
    CANVAS_HEIGHT : CANVAS_HEIGHT
  }
}());
