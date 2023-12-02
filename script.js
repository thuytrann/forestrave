
    var container = document.querySelector("#cont");
    var glow = document.querySelector("#glow");
    var maskSlider = document.getElementById('molecule');
    var activeItem = null;
    var guide = document.getElementById('guide');

    var active = false;

    container.addEventListener("touchstart", dragStart, false);
    container.addEventListener("touchend", dragEnd, false);
    container.addEventListener("touchmove", drag, false);

    container.addEventListener("mousedown", dragStart, false);
    container.addEventListener("mouseup", dragEnd, false);
    container.addEventListener("mousemove", drag, false);

    function dragStart(e) {

      if (e.target !== e.currentTarget) {
        active = true;

        // this is the item we are interacting with
        activeItem = e.target;

        if (activeItem !== null) {
          if (!activeItem.xOffset) {
            activeItem.xOffset = 0;
          }

          if (!activeItem.yOffset) {
            activeItem.yOffset = 0;
          }

          if (e.type === "touchstart") {
            activeItem.initialX = e.touches[0].clientX - activeItem.xOffset;
            activeItem.initialY = e.touches[0].clientY - activeItem.yOffset;
          } else {
            console.log("doing something!");
            activeItem.initialX = e.clientX - activeItem.xOffset;
            activeItem.initialY = e.clientY - activeItem.yOffset;
          }
        }
      }
    }

    function dragEnd(e) {
      if (activeItem !== null) {
        activeItem.initialX = activeItem.currentX;
        activeItem.initialY = activeItem.currentY;
      }

      active = false;
      activeItem = null;
    }

    function drag(e) {
      if (active) {
        e.preventDefault();
				if(e.type === "touchmove"){
                    
          activeItem.currentX = e.touches[0].clientX - activeItem.initialX;
          activeItem.currentY = e.touches[0].clientY - activeItem.initialY;
          
          
        } else {
          activeItem.currentX = e.clientX - activeItem.initialX;
          activeItem.currentY = e.clientY - activeItem.initialY;
        }

        activeItem.xOffset = activeItem.currentX;
        activeItem.yOffset = activeItem.currentY;

        setTranslate(activeItem.currentX, activeItem.currentY, activeItem);
      }
    }

    function setTranslate(xPos, yPos, el) {
      el.style.transform = "translate3d(" + 0 + "px, " + 0 + "px, 0)";
      console.log(xPos, yPos,el.width);
      xPos = xPos + (el.width*.3);
      yPos = yPos + (el.height*.3 );
      guide.style.opacity = "0";
      $(document).ready(function(){
      $('#glow').css('-webkit-mask-position-x', xPos );
      $('#glow').css('-webkit-mask-position-y', yPos );

      console.log(xPos, yPos);
    });
  
      /*glow.addEventListener("change", (event) => { 
        element.style.webkitMaskPosition = xPos;
        console.log(element.style.webkitMaskPosition,xPos);
      });
      console.log(glow)
      /*var xx = xPos;
                    var z = "-webkit-gradient(linear, left center, right center, color-stop(0.5, black), color-stop(0.5, transparent)) no-repeat scroll " + xx + "px padding padding";
                    //el.style.webkitMask = z;
                    el.style.webkitMaskPosition = xPos;
                    console.log(xPos, xx, z);
                    console.log(window.getComputedStyle(el).webkitMaskPosition);*/
                    /*var style = document.createElement('style');
                    var cssStr = '<style id="glow">#glow{' +
                    '-webkit-mask-size: 200% 200%;' +
                    '-webkit-mask-repeat: no-repeat;' +
                    '-webkit-animation: wipe 2s;' +
                    '-webkit-animation-direction: normal;' +
                    '-webkit-animation-iteration-count: 1;' +
                    '-webkit-animation-fill-mode: forwards;' +
                    '-webkit-mask-position: offsetLeftS;' +
                    '-webkit-mask-image: -webkit-gradient(linear, left top, right top, ' +
                    'color-stop(0%, transparent), color-stop(20%, transparent), ' +
                    'color-stop(25%, transparent), color-stop(30%, transparent), ' +
                    'color-stop(50%, rgba(0, 0, 0, 1)), color-stop(98%, rgba(0, 0, 0, 1)), ' +
                    'color-stop(100%, rgba(0, 0, 0, 1)));}' +
                    '@-webkit-keyframes wipe {' +
                    '0% { -webkit-mask-position: offsetLeftS 0; }' +
                    '100% { -webkit-mask-position: offsetLeftD 0; }' +
                    '}' +
                    '</style>';
                    cssStr = cssStr.replace(/offsetLeftS/g, xPos + 'px');
                cssStr = cssStr.replace(/offsetLeftD/g, xPos + 'px');
                    style.setAttribute("type", "text/css");
                    var head = document.getElementsByTagName('head')[0];
                    head.appendChild(style);
                    if (style.styleSheet)
                    {   // IE only
                        style.styleSheet.cssText = cssStr;
                    }
                    else
                    {   // other browsers
                        console.log(style, cssStr );
                        console.log(window.getComputedStyle(el).webkitMaskPosition);
                        style.appendChild(document.createTextNode(cssStr));
                    }
                /*var compStyle = getComputedStyle(el);
                var width = parseInt(compStyle.getPropertyValue("width"));
                var height = parseInt(compStyle.getPropertyValue("height"));
                cssStr = cssStr.replace(/offsetLeftS/g, xPos + 'px');
                cssStr = cssStr.replace(/offsetLeftD/g, xPos + 'px');
                console.log(cssStr);
                document.head.append(cssStr);
                
               /*
                var linkElement = this.document.createElement('link');
                var cssStr = '<style id="glow">#glow{' +
                '-webkit-mask-size: 200% 200%;' +
                '-webkit-mask-repeat: no-repeat;' +
                '-webkit-animation: wipe 2s;' +
                '-webkit-animation-direction: normal;' +
                '-webkit-animation-iteration-count: 1;' +
                '-webkit-animation-fill-mode: forwards;' +
                '-webkit-mask-position: offsetLeftS;' +
                '-webkit-mask-image: -webkit-gradient(linear, left top, right top, ' +
                'color-stop(0%, transparent), color-stop(20%, transparent), ' +
                'color-stop(25%, transparent), color-stop(30%, transparent), ' +
                'color-stop(50%, rgba(0, 0, 0, 1)), color-stop(98%, rgba(0, 0, 0, 1)), ' +
                'color-stop(100%, rgba(0, 0, 0, 1)));}' +
                '@-webkit-keyframes wipe {' +
                '0% { -webkit-mask-position: offsetLeftS 0; }' +
                '100% { -webkit-mask-position: offsetLeftD 0; }' +
                '}' +
                '</style>';
            var compStyle = getComputedStyle(el);
            var width = parseInt(compStyle.getPropertyValue("width"));
            var height = parseInt(compStyle.getPropertyValue("height"));
            cssStr = cssStr.replace(/offsetLeftS/g, xPos + 'px');
            cssStr = cssStr.replace(/offsetLeftD/g, xPos + 'px');

                linkElement.setAttribute('rel', 'stylesheet');
                linkElement.setAttribute('type', 'text/css');
                linkElement.setAttribute('href', 'data:text/css;charset=UTF-8,' + encodeURIComponent(cssStr));
                */
    }
