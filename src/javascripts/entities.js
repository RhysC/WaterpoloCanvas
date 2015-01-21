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
    self.x=x;
    self.y=(config.CANVAS_HEIGHT/2);
    self.width=config.goalDepth*config.multiplier;
    self.height=config.goalWidth*config.multiplier;
    self.draw = function(){
       canvas.fillRect(x, (config.CANVAS_HEIGHT/2)-(self.height/2), self.width, self.height);
    }					
  }
  
  var goal1 = new Goal(0);
  var goal2 = new Goal(config.CANVAS_WIDTH-(config.goalDepth*config.multiplier));
       
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
    self.x = x * config.multiplier;
    self.y = y * config.multiplier;
    self.sprite = sprite;
    self.draw = function() {
      self.sprite.draw(canvas, self.x, self.y);
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
    Goal:Goal,
    drawField : drawField, 
    CANVAS_WIDTH : config.CANVAS_WIDTH,
    CANVAS_HEIGHT : config.CANVAS_HEIGHT
  }
}());
