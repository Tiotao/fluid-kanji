// code from:
// https://fazli.sapuan.org/blog/fast-cartoon-fluid-simulation/
var kanji = [['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '1', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '1', '1', '1', '1', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'], 
['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '1', '1', '1', '1', '.', '.', '.', '.', '.', '1', '1', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'] ,
['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '1', '1', '1', '.', '.', '.', '.', '.', '.', '.', '1', '1', '1', '1', '1', '.', '.', '.', '.', '.', '.', '.', '.', '.'] ,
['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '1', '.', '.', '.', '.', '.', '.', '.', '1', '1', '1', '.', '.', '.', '.', '.', '.', '.', '.', '1', '1', '1', '1', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '1', '1', '1', '.', '.', '.', '.', '.', '1', '1', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '1', '1', '.', '.', '.', '.', '.', '.', '.', '.', '.'] ,
['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '1', '1', '1', '.', '.', '.', '.', '1', '1', '1', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'] ,
['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '1', '1', '.', '.', '.', '.', '.', '1', '1', '1', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'] ,
['.', '.', '.', '.', '.', '.', '.', '.', '.', '1', '1', '1', '.', '.', '.', '.', '.', '1', '1', '.', '.', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'] ,
['.', '.', '.', '.', '.', '.', '.', '.', '1', '1', '1', '.', '.', '.', '.', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'] ,
['.', '.', '.', '.', '.', '.', '.', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'] ,
['.', '.', '.', '.', '.', '.', '.', '1', '1', '1', '1', '1', '.', '.', '.', '1', '1', '1', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'] ,
['.', '.', '.', '.', '.', '.', '.', '1', '1', '.', '.', '.', '.', '.', '.', '1', '1', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'] ,
['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '1', '1', '1', '.', '.', '.', '.', '.', '.', '.', '1', '1', '1', '1', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'] ,
['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '1', '1', '1', '.', '.', '.', '1', '1', '1', '1', '1', '1', '1', '1', '1', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'] ,
['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '1', '1', '1', '.', '1', '1', '1', '1', '.', '.', '.', '1', '1', '1', '1', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'] ,
['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '1', '1', '1', '.', '.', '.', '.', '.', '.', '.', '.', '.', '1', '1', '1', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'] ,
['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '1', '1', '.', '.', '1', '1', '.', '.', '.', '.', '.', '.', '1', '1', '1', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'] ,
['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '1', '1', '1', '.', '.', '.', '1', '1', '1', '.', '.', '.', '.', '1', '1', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'] ,
['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '1', '1', '1', '.', '.', '.', '.', '.', '.', '1', '1', '.', '.', '1', '1', '1', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'] ,
['.', '.', '.', '.', '.', '.', '.', '.', '.', '1', '1', '1', '.', '.', '.', '.', '.', '.', '.', '.', '1', '1', '1', '1', '1', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'] ,
['.', '.', '.', '.', '.', '.', '.', '.', '1', '1', '1', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '1', '1', '1', '1', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'] ,
['.', '.', '.', '.', '.', '.', '.', '1', '1', '1', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '1', '1', '1', '1', '1', '1', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'] ,
['.', '.', '.', '.', '.', '.', '1', '1', '1', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '1', '1', '1', '.', '.', '1', '1', '1', '1', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'] ,
['.', '.', '.', '.', '.', '1', '1', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '1', '1', '1', '1', '.', '.', '.', '.', '1', '1', '1', '1', '1', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'] ,
['.', '.', '.', '1', '1', '1', '.', '.', '.', '.', '.', '.', '.', '.', '1', '1', '1', '1', '.', '.', '.', '.', '.', '.', '.', '.', '1', '1', '1', '1', '1', '1', '1', '.', '.', '.', '.', '.', '.', '.', '.', '.'] ,
['.', '.', '1', '1', '.', '.', '.', '.', '.', '.', '.', '.', '1', '1', '1', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '1', '1', '1', '1', '1', '1', '1', '1', '.', '.', '.', '.', '.', '.'],
['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '.', '.', '.'] ,
['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.']]; 


var Common = Matter.Common;  
var World = Matter.World;  
var Composite = Matter.Composite;  
var Composites = Matter.Composites;  
var Bounds = Matter.Bounds;  
var Body = Matter.Body;  
var Bodies = Matter.Bodies;  
var Engine = Matter.Engine;  
var Events = Matter.Events;

var engine;  
var waterBlock;

var oldLevel = 0;  
var tween;  

function setLevel(level, _time) {  
    var autoTime = Math.abs(oldLevel - level) * 1.5;
    var time = _time || autoTime;
    var pos = { y: waterBlock.position.y };

    var emptyY = engine.render.options.height + engine.render.options.height / 2;
    var fullY = engine.render.options.height / 2 + 10;

    var targetY = emptyY + (fullY - emptyY) * level;

    if (tween) tween.kill();
    tween = TweenLite.to(pos, time, { y: targetY, ease: Power1.easeInOut, onUpdate: function() {
        oldLevel = (pos.y - emptyY) / (fullY - emptyY);
        Body.translate(waterBlock, {
            x: 0,
            y: pos.y - waterBlock.position.y
        });
    }, onComplete: function() {
        oldLevel = level;
    }});
}

function fill() {  
    setLevel(1);
}

function empty() {  
    setLevel(0);
}

$(function() {
    var container = document.getElementById('canvas-container');
    var engineOpts = {
        /*enableSleeping: true,*/
        render: {
            options: {
                hasBounds: true,
                height: 400,
                width: 400
            },
            controller: RenderCustom
        }
    };
    engine = Engine.create(container, engineOpts);
    Engine.run(engine);

    var w = engine.render.options.width;
    var h = engine.render.options.height;

    var offset = 25;
    World.add(engine.world, [
        Bodies.rectangle(w/2, -offset, w + 2 * offset, 50, { isStatic: true, render: { visible: false } }),
        Bodies.rectangle(w/2, h + offset, w + 2 * offset, 50, { isStatic: true, render: { visible: false } }),
        Bodies.rectangle(w + offset, h/2, 50, h + 2 * offset, { isStatic: true, render: { visible: false } }),
        Bodies.rectangle(-offset, h/2, 50, h + 2 * offset, { isStatic: true, render: { visible: false } })
    ]);

    var waterBlockOpts = {
       isStatic: true,
        render: {
             fillStyle: '#fff',
             lineWidth: 0
        }
    };

    waterBlock = Bodies.rectangle(engine.render.options.width * 0.5,
                                  engine.render.options.height * 1.5,
                                  engine.render.options.width * 2,
                                  engine.render.options.height,
                                  waterBlockOpts);
	
	console.log([engine.render.options.width * 0.5,
                                  engine.render.options.height * 1.5,
                                  engine.render.options.width * 2,
                                  engine.render.options.height]);

    var particleWidth = 3;
    var numParticles = Math.floor((engine.render.options.width) / (particleWidth + 2));

    // var particles = Composites.stack(0, engine.render.options.height, 20, 1, 0, 0, function(x, y, column, row) {
    //     return Bodies.circle(x, y, 10,  particleOpts, 100);
    // });
	
	var ph = 8;
	var pw = 8;
	var leftOffset = 0;
	var particleBlock = 1;
	
	// hardcoded examples
    
    var pointConstructor = function(frictionAir) {
        var particleOpts = {
            restitution: 0.7,
            friction: 0.2,
            frictionAir: frictionAir,
            density: 0.1,
            render: {
                fillStyle: '#fff',
                lineWidth: 0,
                strokeStyle: '#fff'
            }
        };
        return function(x, y, column, row) {
            return Bodies.circle(x, y, particleWidth, particleOpts, 100);
        };
    };
    
    points = [];
    
    for (i = 0; i < kanji.length; i++) {
        for (j = 0; j < kanji[i].length; j++) {
            if(kanji[i][j] !== ".") {
                var friction = parseInt(kanji[i][j]) / 200;
                var point = Composites.stack(leftOffset + ph*j, engine.render.options.height - 400 + pw * i, particleBlock, particleBlock,  0, 0, pointConstructor(friction));
                points.push(point);
            }
        }
    }
    

    World.add(engine.world, points);

    engine.render.options.background = '#000';
    engine.render.options.wireframes = false;
    engine.render.options.blurFilter = true;
    engine.render.options.thresholdFilter = true;

    $('#canvas-container canvas').click(function(e){
        var offset = $(this).offset();
        var relY = e.pageY - offset.top;
        setLevel(1 - relY / engine.render.options.height);
    });

});