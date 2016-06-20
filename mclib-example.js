var stage;

$(document).ready(function(){

    // CREATE A STAGE
    stage = mclib.createStage($('#my-canvas'));

    // CREATE A RECT
    var rect = mclib.createRect({
        width: 100,
        height: 100,
        color: '#FF9900',
    });

    // ADD FUNCTION WHICH FIRES BEFORE DRAWN
    rect.onbeforedraw = function(ctx){
        ctx.fillStyle = '#0099FF';
    };

    // ADD RECT TO STAGE
    stage.addChild(rect);

    // CREATE A CIRCLE
    var circle = mclib.createCircle({
        x: 200,
        y: 200,
        r: 50,
        color: '#00FF00'
    });

    // ADD CIRCLE TO STAGE
    stage.addChild(circle);

});