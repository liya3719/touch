/**
 * 
 * @authors liya (liya3719@gmail.com)
 * @date    2015-07-06 11:19:58
 * @version $Id$
 */
define(function(require,exports,module){
	module.exports.touch = function(){
		var touchBox = document.getElementById('touchBox'),
			startX = 0,
			startY = 0,
			moveX = 0,
			moveY = 0,
			EndX = 0,
			EndY = 0,
			tapX = 0,
			tapY = 0,
			cssNum = 0,
			anginX = 0,
			anginY = 0,
			bWidth = $('#touchBox').width(),
		 	bHeight = $('#touchBox').height(),
		 	sWidth = $('.thumbnail').width(),
		 	sHeight = $('.thumbnail').height(),
		 	wScale = bWidth/sWidth,
		 	sScale = bHeight/sHeight,
	    	elem = document.getElementById('touchBox'),
	    	smallElem = document.getElementById('smallElem');
            
		// resize inner wrapper
		var innerWidth = $('#touchBox p').width();
		$('#touchBox').css('width', innerWidth);

		var seatScale = $('#seat-lst #touchBox'),
			smallScale = $('#smallElem'),
			rang = $('.thumbnail .range');
		//获取当前X、Y轴偏移量
		var cssObj = {X:'',Y:''};
		function getCss(){
			cssNum = $(elem).css('-webkit-transform');
			cssNum = cssNum.replace('translate3d(','');
			cssNum = cssNum.replace(')','');
			cssNum = cssNum.split(',');
			cssObj.X = parseInt(cssNum[0],10);
			cssObj.Y = parseInt(cssNum[1],10);
			return cssObj;
		}
		touchBox.addEventListener('touchstart',onStart,false);
		touchBox.addEventListener('touchmove',onMove,false);
		touchBox.addEventListener('touchend',onEnd,false);
		
		var lastX = 0, lastY = 0;
		var tranX = 0, tranY = 0;
        var moving = false;

        var os = $('#seat-lst').offset();
        var l = os.left, t = os.top, w = $('#seat-lst').width(), h = $('#seat-lst').height();
        document.addEventListener('DOMNodeInserted', function () {
            os = $('#seat-lst').offset();
            l = os.left; 
            t = os.top; 
            w = $('#seat-lst').width();
            h = $('#seat-lst').height();
            console.log('left: %s, top: %s, width: %s, height: %s', l, t, w, h);
            return false;
        }, false);
		
        console.log('left: %s, top: %s, width: %s, height: %s', l, t, w, h);
        var rangeCheck = function (x, y) {
            var inRange = x < l || x > l + w || y < t || y > t + h;
            console.log('in range %s', inRange);
            return inRange;
        }
		//开始拖动
		function onStart(e){
			var wHeight = $(window).height();
			$('#seat').css({'height':wHeight,'overflow':'hidden'});
			lastX = startX = e.touches[0].clientX;
			lastY = startY = e.touches[0].clientY;
			console.log('touch x: %s, y: %s', startX, startY);
			return false;
		}
		//拖动中
		function onMove(e){
			EndX = e.touches[0].clientX;
			EndY = e.touches[0].clientY;
			var deltaX = EndX - lastX;
			var deltaY = EndY - lastY;

            var inRange = !rangeCheck(EndX, EndY);
            if (!inRange) {
                // save last location
                lastX = EndX;
                lastY = EndY;
                return false;
            }
            console.log('x: %s, y:%s, in range: %s', EndX, EndY, inRange);
            if (moving || (Math.abs(EndX - startX) > 5 || Math.abs(EndY - startY) > 5)) {
                tranX += deltaX;
                tranY += deltaY;
                // save last location
                lastX = EndX;
                lastY = EndY;
                this.style.webkitTransform = 'translate3d('+tranX+'px,'+tranY+'px,0)';
                e.preventDefault();
                e.stopPropagation();
                moving = true;
                return true;
            } else {
                return false;
            }
		}
		//拖动结束
		function onEnd(e){
            moving = false;
			tapX = e.changedTouches[0].clientX;
			tapY = e.changedTouches[0].clientY;
			$('#seat').css({'height':'auto','overflow':'auto'});
			if(EndX == 0 && EndY == 0)return;
			if(tapX === startX || tapY === startY)return;
			moveX = EndX - startX;
			moveY = EndY - startY;
			getCss();
			anginX = moveX + cssObj.X;
			anginY = moveY + cssObj.Y;
			return true;
		}
	}
	//获取Css3正则
	module.exports.getCss = function(elem){
		var reg = /\-?[0-9]+\.?[0-9]*/g;
		var getCssNum = elem.style.transform;
		if(getCssNum !==''){
			cssNum = + getCssNum.match(reg);
		};
	}
});

