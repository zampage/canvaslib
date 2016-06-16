var stage;

$(document).ready(function(){

    stage = mclib.createStage($('#my-canvas'));

    var child = mclib.createRect({
        width: 100,
        height: 100,
        color: '#FF9900'
    });

    stage.addChild(child);

    console.log(stage);

});