function skate(a){wheels.forEach(function(b){ang="front"==a?ang+1:ang-1,b.transform("r"+[10*ang])})}function hairback(){hair.animate({transform:"r"+[-10,pivots.hair]},10)}function hairfront(){hair.animate({transform:"r"+[0,pivots.hair]},0)}function eat(){for(var a=foodPoints.length-1;a>=0;a--){var b=foodPoints[a];window.scrollX>b.el.node.offsetLeft-330&&!b.isEaten&&(lookLeft(),openMouth()),window.scrollX>b.el.node.offsetLeft-150&&!b.isEaten&&(b.el.node.style.display="none",closeMouth(),changePants("#1572b6"),lookStraight(),b.isEaten=!0)}}function blinkEyes(){eyes.forEach(function(a){a.attr({r:0})}),setTimeout(function(){eyes.forEach(function(a){a.attr({r:4.08})})},100)}function changePants(a){pants.forEach(function(b){b.animate({fill:a},300)})}function lookLeft(){"left"!=looking&&(eyes.forEach(function(a){a.animate({transform:"t"+[10,0]},50)}),looking="left")}function lookRight(){"right"!=looking&&(eyes.forEach(function(a){a.animate({transform:"t"+[-10,0]},50)}),looking="right")}function openMouth(){smile.attr("display","none"),mouth.attr("display","inline").animate({transform:"t"+[-26,0]},80)}function closeMouth(){smile.attr("display","inline"),mouth.attr("display","none").animate({transform:"t"+[0,0]},80)}function lookStraight(){eyes.forEach(function(a){a.animate({transform:"t"+[0,0]},50)})}function moveClouds(){setInterval(function(){cloud.transform("t"+[i++,0])},200)}function dance(){pant1.animate({transform:"t"+[-10,0]},200),pant2.animate({transform:"t"+[-10,0]},200),spine.animate({transform:"r"+[5,pivots.spine]},200),hand1.animate({transform:"r"+[-15,pivots.spine]},200),hand2.animate({transform:"r"+[-15,pivots.spine]},200),belt.animate({transform:"t"+[-10,0]},200),setTimeout(function(){pant1.animate({transform:"t"+[10,0]},200),pant2.animate({transform:"t"+[10,0]},200),spine.animate({transform:"r"+[-5,pivots.spine]},200),hand1.animate({transform:"r"+[15,pivots.spine]},200),hand2.animate({transform:"r"+[15,pivots.spine]},200),belt.animate({transform:"t"+[10,0]},200)},250)}var looking=null,cloud=Snap.select(".cloud"),fancypants=Snap.select(".fp"),hair=Snap.select("#Hair"),head=Snap.select("#Face"),eyes=Snap.selectAll("#Right_eye,#Left_eye"),smile=Snap.select("#Smile"),mouth=Snap.select("#Open_mouth_1_"),spine=Snap.select("#Spine"),hand1=Snap.select("#Left_hand"),hand2=Snap.select("#Right_hand"),belt=Snap.select("#Belt_1_"),pant1=Snap.select("#Left_leg"),pant2=Snap.select("#Right_leg"),pant2=Snap.select("#Right_leg"),pants=Snap.selectAll("#Right_leg,#Left_leg"),wheels=Snap.selectAll("#wheel,#wheel_1_"),eatables=Snap.selectAll(".eatable"),i=0,pivots={spine:[spine.attr("x1"),spine.attr("y1")],hand1:[hand1.attr("x1"),hand1.attr("y1")],hand2:[hand2.attr("x1"),hand2.attr("y1")],hair:[head.attr("cx"),head.attr("cy")]},foodPoints=[];eatables.forEach(function(a){var b={el:a,isEaten:!1};foodPoints.push(b)}),setTimeout(function(){lookLeft(),initSKate=setInterval(function(){skate("front")},20),fancypants.attr("class","fp"),setTimeout(function(){clearTimeout(initSKate),lookStraight(),setTimeout(blinkEyes,1e3)},1500)},1e3),k=!1,j=!1,scrollTimer=null,danceTimer=null,lookTimer=null,dancing=null,prevScrollX=0,document.addEventListener("scroll",function(a){a.preventDefault(),clearInterval(dancing),hairback(),scrollTimer&&(clearTimeout(scrollTimer),lookTimer&&clearTimeout(lookTimer),window.scrollX-prevScrollX>0?(skate("front"),lookLeft()):(skate("back"),lookRight()),lookTimer=setTimeout(lookStraight,100)),danceTimer&&clearTimeout(danceTimer),scrollTimer=setTimeout(function(){prevScrollX=window.scrollX,hairfront(),eat()},1),danceTimer=setTimeout(function(){dancing=setInterval(dance,500)},3e3)}),ang=0;