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
    let directional = 0; // 1 -> right    -1 -> left    0 -> static
    let futureDirection = 1;
    let oldDirection = 1;
    let x2 = 0, y2 = 0;
    let phyllotaxis = [];
        
    window.onload = init;

	function init(){
		ctx = canvas.getContext("2d");
		canvas.width = canvasWidth;
		canvas.height = canvasHeight;
		ctx.fillRect(0,0,canvasWidth,canvasHeight);

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
            document.querySelector('#reverse').onclick = function(){
                if (directional == 0)
                {
                    futureDirection = oldDirection * -1;
                }
                else{
                    directional *= -1;
                }
            };
            document.querySelector('#move').onclick = function(){
                if (directional == 0)
                {
                    directional = futureDirection;
                }
                else{
                    directional = oldDirection;
                }
            };
            document.querySelector('#stop').onclick = function(){
                oldDirection = directional;
                directional = 0;
            };
        }
        
    function loop(){
        if (paused) return;
        
        setTimeout(loop,1000/fps);
        
        evhLIB.fade(ctx, canvasWidth, canvasHeight, fps);
        
        const increase = Math.PI * 2 / 100;
        
        evhLIB.drawPhyllotaxis(phyllotaxis, n, c, divergence, ctx, canvasWidth, canvasHeight);
        
        for (let i = 0; i < phyllotaxis.length; i++)
        {
            phyllotaxis[i].x += directional;
            if (phyllotaxis[i].x >= canvasWidth)
            {
                phyllotaxis[i].x = 0;
            }
            if (phyllotaxis[i].x <= 0)
            {
                phyllotaxis[i].x = canvasWidth;
            }
            if (phyllotaxis[i].y <= 0)
            {
                phyllotaxis[i].y = canvasHeight;
            }
            if (phyllotaxis[i].y >= canvasHeight)
            {
                phyllotaxis[i].y = 0;
            }
        }
        
        n++; 
    }
    
    function loop2(){
        
    }
})()
