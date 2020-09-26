(function(){
	"use strict";
	const canvasWidth = 1200, canvasHeight = 500;
	let ctx;
    const fps = 20;
    let counter = 0;
    let n = 0;
    const divergence = 137.5; // play with this   
    let c = 5; // play with this
    let paused = true;
    let directionalX = 0;
    let directionalY = 0;
    let speed = 1;
    let x2 = 0, y2 = 0;
    let phyllotaxis = [];

    // Magic Numbers
    let negative = -1;
    let positive = 1;
    let nil = 0;
        
    window.onload = init;

	function init(){
		ctx = canvas.getContext("2d");
		canvas.width = canvasWidth;
		canvas.height = canvasHeight;
		ctx.fillRect(nil,nil,canvasWidth,canvasHeight);

        setupUI();
        loop();
	}
    
    function setupUI(){
            document.querySelector('#draw').onclick = function(){
                if (!paused) return;
                paused = false;
                loop();
            };
            document.querySelector('#pause').onclick = function(){
                paused = true;
            };
            document.querySelector('#moveL').onclick = function(){
                directionalX = negative;
            };
            document.querySelector('#moveR').onclick = function(){
                directionalX = positive;
            };
            document.querySelector('#moveU').onclick = function(){
                directionalY = negative;
            };
            document.querySelector('#moveD').onclick = function(){
                directionalY = positive;
            };
            document.querySelector('#stopX').onclick = function(){
                directionalX = nil;
            };
            document.querySelector('#stopY').onclick = function(){
                directionalY = nil;
            };
            document.querySelector('#stop').onclick = function(){
                directionalX = nil;
                directionalY = nil;
            };
            document.querySelector('#half').onclick = function(){
                speed *= 0.5;
            };
            document.querySelector('#double').onclick = function(){
                speed *= 2;
            };
        }
        
    function loop(){
        if (paused) return;
        
        setTimeout(loop,1000/fps);
        
        evhLIB.fade(ctx, canvasWidth, canvasHeight, fps);
        
        const increase = Math.PI * 2 / 100;
        
        evhLIB.drawPhyllotaxis(phyllotaxis, n, c, divergence, ctx, canvasWidth, canvasHeight);
        
        for (let i = nil; i < phyllotaxis.length; i++)
        {
            phyllotaxis[i].x += (directionalX*speed);
            phyllotaxis[i].y += (directionalY*speed);
            if (phyllotaxis[i].x > canvasWidth)
            {
                phyllotaxis[i].x = nil;
            }
            if (phyllotaxis[i].x < nil)
            {
                phyllotaxis[i].x = canvasWidth;
            }
            if (phyllotaxis[i].y < nil)
            {
                phyllotaxis[i].y = canvasHeight;
            }
            if (phyllotaxis[i].y > canvasHeight)
            {
                phyllotaxis[i].y = nil;
            }  
        }
        
        n++; 
    }
})()
