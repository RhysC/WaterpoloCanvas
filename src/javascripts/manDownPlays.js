var sixOnFive = (function(){
  //ZERO BASED ARRAY - naming them explcitly to avoid confusion
  var ONE_SPOT = 0;
  var TWO_SPOT = 1;
  var THREE_SPOT = 2;
  var FOUR_SPOT = 3;
  var FIVE_SPOT = 4;
  var SIX_SPOT = 5;

  var standardBlueAttack = function(){
    return [new entities.createBluePlayer(2,5),//1 spot
    new entities.createBluePlayer(7,8.5),//2 spot
    new entities.createBluePlayer(2,8.5),//3 spot and post man
    new entities.createBluePlayer(7,11.5),//4 spot
    new entities.createBluePlayer(2,16),//5 spot
    new entities.createBluePlayer(2,11.5)//6 spot and center fwd/Post man
    ];
  };

  var standardWhiteDefense = function(bluePlayers){
    var team =[];

    bluePlayers.forEach(function(enemy) {
      var temp = new entities.createWhitePlayer(0,0);
      temp.goalSideOf(enemy, 0.5);
      team.push(temp);
    });
    return team;
  };

  var standard = function(){
    var blue = standardBlueAttack();

    var one = new entities.createWhitePlayer(0,0);
    one.inBetween(blue[THREE_SPOT], blue[ONE_SPOT], 1);

  /*  var two = new entities.createWhitePlayer(0,0);
    two.inBetween(blue[TWO_SPOT], blue[THREE_SPOT], 1);

    var three = new entities.createWhitePlayer(0,0);
    three.inBetween(blue[FOUR_SPOT], blue[SIX_SPOT], 1);

    var four = new entities.createWhitePlayer(0,0);
    four.inBetween(blue[FIVE_SPOT], blue[SIX_SPOT], 1);

    var five = new entities.createWhitePlayer(0,0);
    five.inBetween(blue[THREE_SPOT], blue[SIX_SPOT], 1);
*/

    return {
      blue: blue,
      white: [one]//,two,three,four,five]
    };
  };

  return {
    standard:standard
  };
}());
