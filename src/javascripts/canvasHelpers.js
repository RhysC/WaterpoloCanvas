var canvasHelpers = (function() {
  var drawYAxisLine = function(canvas, x, color) {
    canvas.beginPath();
    canvas.moveTo(x * config.multiplier, 0);
    canvas.lineTo(x * config.multiplier, config.CANVAS_HEIGHT);
    canvas.strokeStyle = color;
    canvas.stroke();
  };

  var drawRect = function(canvas, x, y, length, height) {
    canvas.fillRect(
      (x * config.multiplier), (y * config.multiplier), (length * config.multiplier), (height * config.multiplier));
  };

  var drawSprite = function(canvas, position, sprite) {
    var x = position.getX() * config.multiplier;
    var y = position.getY() * config.multiplier;
    sprite.drawCentered(canvas, x, y);
  };
  var drawText = function(canvas, position, text) {
    var x = position.getX() * config.multiplier;
    var y = position.getY() * config.multiplier;
    canvas.font = "20pt Calibri";
    canvas.fillText(text, x, y);
  };

  return {
    drawYAxisLine: drawYAxisLine,
    drawRect: drawRect,
    drawSprite: drawSprite,
    drawText:drawText
  };
})();
