var entities = (function(positioning, canvasHelpers) {
  var FieldPosition = function(x, y) {
    this.getX = function() {
      return x;
    };
    this.getY = function() {
      return y;
    };
  };

  var PositionBoundary = function(x, color) {
    this.draw = function(canvas) {
      canvasHelpers.drawYAxisLine(canvas, x, color);
    };
  };

  var Goal = function(x) {
    var self = this;
    self.fieldPosition = new FieldPosition(x, config.poolWidth / 2);
    self.draw = function(canvas) {
      canvasHelpers.drawRect(
        canvas,
        x, (config.poolWidth / 2) - (config.goalWidth / 2),
        config.goalDepth,
        config.goalWidth);
    };
  };

  //IN-FIELD ELEMENTS
  var InFieldEntity = function(x, y, spriteName) {
    var self = this,
      pendingCallbacks = [];

    self.fieldPosition = new FieldPosition(x, y);

    self.sprite = new Sprite(spriteName, function() {
      pendingCallbacks.forEach(function(callback) {
        callback();
      });
      pendingCallbacks = [];
    });

    self.setPosition = function(x, y) {
      self.fieldPosition = new FieldPosition(x, y);
    };

    self.draw = function(canvas) {
      var func = function() {
        canvasHelpers.drawSprite(canvas, self.fieldPosition, self.sprite);
      };
      if (self.sprite.canDraw()) {
        func();
      } else {
        pendingCallbacks.push(func);
      }
    };
  };
  var Player = function(x, y, spriteName, goal) {
    var self = this;
    InFieldEntity.call(self, x, y, spriteName);
    self.goal = goal;
    self.goalSideOf = function(player, distanceFromPlayer) {
      var point = positioning.getPointBetween(self.goal.fieldPosition, player.fieldPosition, distanceFromPlayer);
      self.setPosition(point.x, point.y);
    };
    self.inBetween = function(playerA, playerB, distanceFromPlayerB) {
      var point = positioning.getPointBetween(playerA.fieldPosition, playerB.fieldPosition, distanceFromPlayerB);
      self.setPosition(point.x, point.y);
    };
  };

  var whiteGoal = new Goal(0);
  var blueGoal = new Goal(config.poolLength);

  var createBluePlayer = function(x, y) {
    return new Player(x, y, "blue", blueGoal);
  };
  var createWhitePlayer = function(x, y) {
    return new Player(x, y, "white", whiteGoal);
  };
  var createBall = function(x, y) {
    return new InFieldEntity(x, y, "ball");
  };


  var first2Meter = new PositionBoundary(2, "#f00");
  var second2Meter = new PositionBoundary(config.poolLength - 2, "#f00");
  var first5Meter = new PositionBoundary(5, "#ff0");
  var second5Meter = new PositionBoundary(config.poolLength - 5, "#ff0");
  var halfway = new PositionBoundary(config.poolLength / 2, "#000");

  var field = {
    draw: function(canvas) {
      halfway.draw(canvas);
      first2Meter.draw(canvas);
      second2Meter.draw(canvas);
      first5Meter.draw(canvas);
      second5Meter.draw(canvas);
      whiteGoal.draw(canvas);
      blueGoal.draw(canvas);
    }
  };

  return {
    createBluePlayer: createBluePlayer,
    createWhitePlayer: createWhitePlayer,
    createBall: createBall,
    field: field
  };
}(positioning, canvasHelpers));
