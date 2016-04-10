// code from:
// https://fazli.sapuan.org/blog/fast-cartoon-fluid-simulation/
// . . . . . . . = . . . . . . . . 
// . . . . . . . = . . . . . . . . 
// . . . . . . . = . . . . . . . . 
// . . . . . . . = . . . . = . . . 
// . . . . . . . = . . . = = . . . 
// . = = = = = . = . . = . . . . . 
// . . . . . = . = = = . . . . . . 
// . . . . . = . = = . . . . . . . 
// . . . . = . . = . = . . . . . . 
// . . . . = . . = . . = . . . . . 
// . . . = . . . = . . . = . . . . 
// . . = . . . . = . . . . = = = . 
// . = . . . . . = . . . . . = . . 
// = . . . . . . = . . . . . . . . 
// . . . . . = . = . . . . . . . . 
// . . . . . . = . . . . . . . . . 


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

    var particleWidth = 2;
    var numParticles = Math.floor((engine.render.options.width) / (particleWidth + 2));

    var particleOpts = {
        restitution: 0.7,
        friction: 0.2,
        frictionAir: 0,
        density: 0.1,
        render: {
             fillStyle: '#fff',
             lineWidth: 0,
             strokeStyle: '#fff'
        }
    };
	
	var particleOpts2 = {
        restitution: 0.7,
        friction: 0.2,
        frictionAir: 0.05,
        density: 0.1,
        render: {
             fillStyle: '#fff',
             lineWidth: 0,
             strokeStyle: '#fff'
        }
    };
	
	var particleOpts3 = {
        restitution: 0.7,
        friction: 0.2,
        frictionAir: 0.1,
        density: 0.1,
        render: {
             fillStyle: '#fff',
             lineWidth: 0,
             strokeStyle: '#fff'
        }
    };

    var particles = Composites.stack(0, engine.render.options.height, 20, 1, 0, 0, function(x, y, column, row) {
        return Bodies.circle(x, y, 10,  particleOpts, 100);
    });
	
	// var particles2 = Composites.stack(0, engine.render.options.height - 100, 20, 2, 0, 0, function(x, y, column, row) {
    //     return Bodies.circle(x, y, particleWidth, particleOpts, 100);
    // });
	
	var ph = 8;
	var pw = 8;
	var leftOffset = 200;
	var particleBlock = 2;
	
	// hardcoded examples
	
	var p1 = Composites.stack(leftOffset + ph*8, engine.render.options.height - 400 + pw * 1, particleBlock, particleBlock,  0, 0, function(x, y, column, row) {
        return Bodies.circle(x, y, particleWidth, particleOpts, 100);
    });
	
	var p2 = Composites.stack(leftOffset + ph*8, engine.render.options.height - 400 + pw * 2, particleBlock, particleBlock,  0, 0, function(x, y, column, row) {
			return Bodies.circle(x, y, particleWidth, particleOpts, 100);
		});

	var p3 = Composites.stack(leftOffset + ph*8, engine.render.options.height - 400 + pw * 3, particleBlock, particleBlock,  0, 0, function(x, y, column, row) {
			return Bodies.circle(x, y, particleWidth, particleOpts, 100);
		});
		
	var p40 = Composites.stack(leftOffset + ph*8, engine.render.options.height - 400 + pw * 4, particleBlock, particleBlock,  0, 0, function(x, y, column, row) {
			return Bodies.circle(x, y, particleWidth, particleOpts, 100);
		});
		
	var p41 =  Composites.stack(leftOffset + ph*13, engine.render.options.height - 400 + pw * 4, particleBlock, particleBlock,  0, 0, function(x, y, column, row) {
			return Bodies.circle(x, y, particleWidth, particleOpts3, 100);
		});
		
	var p50 =  Composites.stack(leftOffset + ph*8, engine.render.options.height - 400 + pw * 5, particleBlock, particleBlock,  0, 0, function(x, y, column, row) {
			return Bodies.circle(x, y, particleWidth, particleOpts, 100);
		});

	var p51 =  Composites.stack(leftOffset + ph*12, engine.render.options.height - 400 + pw * 5, particleBlock * 2, particleBlock,  0, 0, function(x, y, column, row) {
			return Bodies.circle(x, y, particleWidth, particleOpts3, 100);
		});
		
	var p60 =  Composites.stack(leftOffset + ph*1, engine.render.options.height - 400 + pw * 6, particleBlock * 5, particleBlock,  0, 0, function(x, y, column, row) {
			return Bodies.circle(x, y, particleWidth, particleOpts2, 100);
		});

	var p61 =  Composites.stack(leftOffset + ph*8, engine.render.options.height - 400 + pw * 6, particleBlock * 1, particleBlock,  0, 0, function(x, y, column, row) {
			return Bodies.circle(x, y, particleWidth, particleOpts, 100);
		});

	var p62 =  Composites.stack(leftOffset + ph*11, engine.render.options.height - 400 + pw * 6, particleBlock * 1, particleBlock,  0, 0, function(x, y, column, row) {
			return Bodies.circle(x, y, particleWidth, particleOpts3, 100);
		});

	var p70 =  Composites.stack(leftOffset + ph*6, engine.render.options.height - 400 + pw * 7, particleBlock * 1, particleBlock,  0, 0, function(x, y, column, row) {
			return Bodies.circle(x, y, particleWidth, particleOpts2, 100);
		});

	var p71 =  Composites.stack(leftOffset + ph*8, engine.render.options.height - 400 + pw * 7, particleBlock * 3, particleBlock,  0, 0, function(x, y, column, row) {
			return Bodies.circle(x, y, particleWidth, particleOpts3, 100);
		});

	var p80 =  Composites.stack(leftOffset + ph*6, engine.render.options.height - 400 + pw * 8, particleBlock * 1, particleBlock,  0, 0, function(x, y, column, row) {
			return Bodies.circle(x, y, particleWidth, particleOpts2, 100);
		});

	var p81 =  Composites.stack(leftOffset + ph*8, engine.render.options.height - 400 + pw * 8, particleBlock * 2, particleBlock,  0, 0, function(x, y, column, row) {
			return Bodies.circle(x, y, particleWidth, particleOpts, 100);
		});

	var p90 =  Composites.stack(leftOffset + ph*5, engine.render.options.height - 400 + pw * 9, particleBlock * 1, particleBlock,  0, 0, function(x, y, column, row) {
			return Bodies.circle(x, y, particleWidth, particleOpts2, 100);
		});

	var p91 =  Composites.stack(leftOffset + ph*8, engine.render.options.height - 400 + pw * 9, particleBlock * 1, particleBlock,  0, 0, function(x, y, column, row) {
			return Bodies.circle(x, y, particleWidth, particleOpts, 100);
		});

	var p92 =  Composites.stack(leftOffset + ph*10, engine.render.options.height - 400 + pw * 9, particleBlock * 1, particleBlock,  0, 0, function(x, y, column, row) {
			return Bodies.circle(x, y, particleWidth, particleOpts3, 100);
		});

	var p100 =  Composites.stack(leftOffset + ph*5, engine.render.options.height - 400 + pw * 10, particleBlock * 1, particleBlock,  0, 0, function(x, y, column, row) {
			return Bodies.circle(x, y, particleWidth, particleOpts2, 100);
		});

	var p101 =  Composites.stack(leftOffset + ph*8, engine.render.options.height - 400 + pw * 10, particleBlock * 1, particleBlock,  0, 0, function(x, y, column, row) {
			return Bodies.circle(x, y, particleWidth, particleOpts, 100);
		});

	var p102 =  Composites.stack(leftOffset + ph*11, engine.render.options.height - 400 + pw * 10, particleBlock * 1, particleBlock,  0, 0, function(x, y, column, row) {
			return Bodies.circle(x, y, particleWidth, particleOpts3, 100);
		});


	var p110 =  Composites.stack(leftOffset + ph*4, engine.render.options.height - 400 + pw * 11, particleBlock * 1, particleBlock,  0, 0, function(x, y, column, row) {
			return Bodies.circle(x, y, particleWidth, particleOpts2, 100);
		});

	var p111 =  Composites.stack(leftOffset + ph*8, engine.render.options.height - 400 + pw * 11, particleBlock * 1, particleBlock,  0, 0, function(x, y, column, row) {
			return Bodies.circle(x, y, particleWidth, particleOpts, 100);
		});

	var p112 =  Composites.stack(leftOffset + ph*12, engine.render.options.height - 400 + pw * 11, particleBlock * 1, particleBlock,  0, 0, function(x, y, column, row) {
			return Bodies.circle(x, y, particleWidth, particleOpts3, 100);
		});

	var p120 =  Composites.stack(leftOffset + ph*3, engine.render.options.height - 400 + pw * 12, particleBlock * 1, particleBlock,  0, 0, function(x, y, column, row) {
			return Bodies.circle(x, y, particleWidth, particleOpts2, 100);
		});

	var p121 =  Composites.stack(leftOffset + ph*8, engine.render.options.height - 400 + pw * 12, particleBlock * 1, particleBlock,  0, 0, function(x, y, column, row) {
			return Bodies.circle(x, y, particleWidth, particleOpts, 100);
		});

	var p122 =  Composites.stack(leftOffset + ph*13, engine.render.options.height - 400 + pw * 12, particleBlock * 3, particleBlock,  0, 0, function(x, y, column, row) {
			return Bodies.circle(x, y, particleWidth, particleOpts3, 100);
		});
		

	var p130 =  Composites.stack(leftOffset + ph*2, engine.render.options.height - 400 + pw * 13, particleBlock * 1, particleBlock,  0, 0, function(x, y, column, row) {
			return Bodies.circle(x, y, particleWidth, particleOpts2, 100);
		});

	var p131 =  Composites.stack(leftOffset + ph*8, engine.render.options.height - 400 + pw * 13, particleBlock * 1, particleBlock,  0, 0, function(x, y, column, row) {
			return Bodies.circle(x, y, particleWidth, particleOpts, 100);
		});

	var p132 =  Composites.stack(leftOffset + ph*14, engine.render.options.height - 400 + pw * 13, particleBlock * 1, particleBlock,  0, 0, function(x, y, column, row) {
			return Bodies.circle(x, y, particleWidth, particleOpts3, 100);
		});

	var p140 =  Composites.stack(leftOffset + ph*1, engine.render.options.height - 400 + pw * 14, particleBlock * 1, particleBlock,  0, 0, function(x, y, column, row) {
			return Bodies.circle(x, y, particleWidth, particleOpts2, 100);
		});

	var p141 =  Composites.stack(leftOffset + ph*8, engine.render.options.height - 400 + pw * 14, particleBlock * 1, particleBlock,  0, 0, function(x, y, column, row) {
			return Bodies.circle(x, y, particleWidth, particleOpts, 100);
		});


	var p150 =  Composites.stack(leftOffset + ph*6, engine.render.options.height - 400 + pw * 15, particleBlock * 1, particleBlock,  0, 0, function(x, y, column, row) {
			return Bodies.circle(x, y, particleWidth, particleOpts, 100);
		});

	var p151 =  Composites.stack(leftOffset + ph*8, engine.render.options.height - 400 + pw * 15, particleBlock * 1, particleBlock,  0, 0, function(x, y, column, row) {
			return Bodies.circle(x, y, particleWidth, particleOpts, 100);
		});

	var p16 =  Composites.stack(leftOffset + ph*7, engine.render.options.height - 400 + pw * 16, particleBlock * 1, particleBlock,  0, 0, function(x, y, column, row) {
			return Bodies.circle(x, y, particleWidth, particleOpts, 100);
		});


    World.add(engine.world, [
        p1, p2, p3, p40, p41, p50, p51, p60, p61, p62, p70, p71, p80, p81, p90, p91, p92, p100, p101, p102, p111, p112, p110, p120, p121, p122, p130, p131, p132, p140, p141, p150, p151, p16,
        waterBlock
    ]);

    Events.on(engine, 'beforeUpdate', function(event) {
        var bodies = particles.bodies;
        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i];
			
            if (!body.isStatic) {
                /*var forceMagnitude = 0.0001;
                Body.applyForce(body, { x: 0, y: 0 }, {
                    x: forceMagnitude * Common.random(-1, 1),
                    y: forceMagnitude * Common.random(-1, 1),
                });*/

                Body.translate(body, {
                    x: Common.random(-1, 1) * 0.25,
                    y: Common.random(-1, 1) * 0.25
                });
            }
        }
    });

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