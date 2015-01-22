var sixOnSix = (function(){
  var standard = function(){
    thingsToDraw = [entities.field];
    var enemies = [ new entities.createBluePlayer(2,5),
                    new entities.createBluePlayer(6,7),
                    new entities.createBluePlayer(8,10),
                    new entities.createBluePlayer(6,14),
                    new entities.createBluePlayer(2,16),
                    new entities.createBluePlayer(2,10)];
    var team =[];
    enemies.forEach(function(enemy) {
      var temp = new entities.createWhitePlayer(0,0);
      temp.goalSideOf(enemy, 0.5);
      team.push(temp);
    });
    Array.prototype.push.apply(thingsToDraw, enemies);
    Array.prototype.push.apply(thingsToDraw, team);
    return thingsToDraw;
  };

  return {
    standard:standard
  };
}());
