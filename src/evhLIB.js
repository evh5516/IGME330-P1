(function(){
	"use strict";
	
    // helpers
	function dtr(degrees){
		return degrees * (Math.PI/180);
	}

	function drawCircle(ctx,x,y,radius,color){
		ctx.save();
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(x,y,radius,0,Math.PI * 2);
		ctx.closePath();
		ctx.fill();
		ctx.restore();
	}
    
    function fade(ctx, width, height, fps){
        // fade
        ctx.save();
        ctx.fillStyle = 'black';
        ctx.globalAlpha = 1/fps;
        ctx.fillRect(0,0,width,height);
        ctx.restore();
    }
    
    function drawPhyllotaxis(phyllos, n, c, div, ctx, width, height){
        let a = n * dtr(div);
        let r = c * Math.sqrt(n);
        
        // now calculate the `x` and `y`
        let x = r * Math.cos(a) + width/2;
        let y = r * Math.sin(a) + height/2;
        
        let color = `hsl(${n/5 % 361},100%,50%)`; 
        let circle = {x:x, y:y, color:color};
        phyllos.push(circle);
        for (let i = 0; i < phyllos.length; i++)
        {
            drawCircle(ctx, phyllos[i].x, phyllos[i].y, 2, phyllos[i].color);
        }
    }
    
    window.evhLIB = {drawCircle, dtr, fade, drawPhyllotaxis};
})()