/*
Water polo uses a numbering system to define position in the pool
(this is completly independant of hat numbers)
There are two main numbering systesm adn we will be using the "european" style

As the teams are defined as arrays the team indexes represent the  position
number - 1, ie 1 spot is 0, 2 spot is 1

More more explanatin of the different numbering systems see :
http://www.waterpoloplanet.com/HTML_Jim_pages/js01_shot_doctor_extra.html


    Euro                               US NCAA (not used)
5    6    1                             1     6     5
  4     2                                  2     4
     3                                        3


*/
var sixOnSix = (function(){
  //ZERO BASED ARRAY - naming them explcitly to avoid confusion
  var ONE_SPOT = 0;
  var TWO_SPOT = 1;
  var THREE_SPOT = 2;
  var FOUR_SPOT = 3;
  var FIVE_SPOT = 4;
  var SIX_SPOT = 5;
  var CENTRE_FORWARD = 5;

  var standardBlueAttack = function(){
    return [new entities.createBluePlayer(2,5),//1 spot
            new entities.createBluePlayer(6,7),//2 spot
            new entities.createBluePlayer(8,10),//3 spot
            new entities.createBluePlayer(6,14),//4 spot
            new entities.createBluePlayer(2,16),//5 spot
            new entities.createBluePlayer(2,10)//6 spot and center fwd
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
    var white = standardWhiteDefense(blue);
    return {
     blue: blue,
     white: white
   };
  };

  var dropOff2Spot = function(){
    var blue = standardBlueAttack();
    var white = standardWhiteDefense(blue);
    var drop = white[TWO_SPOT];
    drop.inBetween(blue[CENTRE_FORWARD], blue[TWO_SPOT], 3);
    return {
      blue: blue,
      white: white
    };
  };

  return {
    standard:standard,
    dropOff2Spot:dropOff2Spot
  };
}());
