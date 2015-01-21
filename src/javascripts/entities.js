var entities = (function() {
          		
  var PositionBoundary = function(x,color){
    var self = this;
    self.x = x*config.multiplier;
    self.color = color;
    self.draw = function(){
      canvas.beginPath();
      canvas.moveTo(self.x, 0); 
      canvas.lineTo(self.x, config.CANVAS_HEIGHT); 
      canvas.strokeStyle = self.color;
      canvas.stroke();
    }
  }
  var Goal = function(x){
    var self = this;
    self.color= "#00A";
    self.getX = function(){ return x; };
    self.getY = function(){ return (config.poolWidth/2); };
    self.draw = function(){
       canvas.fillRect((x * config.multiplier), 
                       (config.CANVAS_HEIGHT/2)-(config.goalWidth*config.multiplier/2), 
                       (config.goalDepth*config.multiplier), 
                       (config.goalWidth*config.multiplier));
    }					
  }
  
  var goal1 = new Goal(0);
  var goal2 = new Goal(config.poolLength-config.goalDepth);
       
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
  
  var InFieldEntity = function(x,y,sprite){
    var self = this;
    self.field = { x:x, y:y };
    self.getX = function(){ return self.field.x * config.multiplier;};
    self.getY = function(){ return self.field.y * config.multiplier;};
    self.sprite = sprite;    
    self.draw = function() {
      self.sprite.draw(canvas, self.getX(), self.getY());
    };
    self.setPosition = function(x, y) {
      self.field.x = x;
      self.field.y = y;
    };
    self.goalSideOf = function(goal, player) {
      var distanceFromPlayer = 0.5;
      console.log(goal);
      var opposite = goal.getY() - player.field.y;
      var adjacent = goal.getX() - player.field.x;
      var angle = Math.atan(opposite/adjacent);
      var hypotenuseLength = Math.sqrt((opposite*opposite)+(adjacent*adjacent));
      var goalSideLength = hypotenuseLength - distanceFromPlayer;
      
      self.field.x = goal.getX() + (Math.cos(angle)*goalSideLength);
      self.field.y = goal.getY() + (Math.sin(angle)*goalSideLength);
    };
  }
  
  var BluePlayer = function(x,y){
    InFieldEntity.call(this, x, y, Sprite("enemy"));    
  }
  var WhitePlayer = function(x,y){
    InFieldEntity.call(this, x, y, Sprite("player"));    
  }   
  var Ball = function(x,y){
    InFieldEntity.call(this, x, y, Sprite("ball"));    
  }     
  return {
    BluePlayer : BluePlayer,
    WhitePlayer : WhitePlayer,
    Ball: Ball,
    goal1:goal1,
    goal2:goal2,
    drawField : drawField, 
    CANVAS_WIDTH : config.CANVAS_WIDTH,
    CANVAS_HEIGHT : config.CANVAS_HEIGHT
  }
}());
