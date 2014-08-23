'use strict';

var $           = Snap.select,
    $$          = Snap.selectAll,
    i           = 0,
    ang         = 0,
    scrollTimer = null,
    danceTimer  = null,
    lookTimer   = null,
    initSkate   = null,
    dancing     = null,
    danceDelay  = 5000,
    prevScrollX = 0,
    foodPoints  = [],
    windowWidth = window.outerWidth;

var cloud       = $('.cloud'),
    fancypants  = $('.fp'),
    hair        = $('#Hair'),
    head        = $('#Face'),
    eyes        = $$('#Right_eye,#Left_eye'),
    smile       = $('#Smile'),
    mouth       = $('#Open_mouth_1_'),
    spine       = $('#Spine'),
    hand1       = $('#Left_hand'),
    hand2       = $('#Right_hand'),
    belt        = $('#Belt_1_'),
    pant1       = $('#Left_leg'),
    pant2       = $('#Right_leg'),
    wheels      = $$('#wheel,#wheel_1_'),
    legCrack    = $('#Leg_crack'),
    leftFolds   = $('#Left_pant_folds'),
    rightFolds  = $('#Right_pant_folds'),
    pants       = $$('#Right_leg,#Left_leg'),
    wheels      = $$('#wheel,#wheel_1_'),
    eatables    = $$('.eatable');

var story = "Hey there! I'm Swapnil Singh. I build web stuff. After i finished my college i always wanted to build awesome web experiences. I started building webapps as a backend developer and very soon I realised that i prefer talking to my users than servers. I've switched to frontend development and loved it :) I love getting my hands dirty at design and i feel 9 out 10 websites i visit everyday have serious tone to them and i wish to make lot of happy websites in contrast. Besides working as a frontend developer I also am a professional KFC eater :d RocknRoll fan and a budding guitarist. So far I've worked on . If you want to build awesome stuff together or just have a chat feel free to reach me on github or twitter."
var words = story.split(" ");

var pivots = {
  'spine':[spine.attr('x1'),spine.attr('y1')],
  'hand1':[hand1.attr('x1'),hand1.attr('y1')],
  'hand2':[hand2.attr('x1'),hand2.attr('y1')],
  'hair':[head.attr('cx'),head.attr('cy')],
  'folds': [legCrack.attr('x2'), legCrack.attr('y2')]
};


//moveClouds();
var init = function(){
  eatables.forEach(function(el){
    var point = {'el':el,'isEaten': false};
    foodPoints.push(point);
  });

  setTimeout(function(){
    lookLeft();
    initSkate = setInterval(function(){skate('front');},20);
    fancypants.attr('class','fp');
    setTimeout(function(){
      clearTimeout(initSkate);
      lookStraight();
      setTimeout(blinkEyes,1000);
    },1500);
  },1000);

  document.addEventListener('scroll',function(e){
    e.preventDefault();
    onScroll();
  });

  danceTimer = setTimeout(function(){
    dancing = setInterval(dance,500);
  }, danceDelay);

};

window.addEventListener('load', init, false);

function onScroll(){
  
  clearInterval(dancing);
  
  if (danceTimer)  {
    resetFancyPants();
    clearTimeout(danceTimer);
  }
  
  danceTimer = setTimeout(function(){
    dancing = setInterval(dance,500);
  },danceDelay);

  var isScrollingForward = window.scrollX - prevScrollX > 0;
  prevScrollX = window.scrollX;

  if(isScrollingForward) {
    skate('front');
    moveHair(-10);
    lookLeft();
  } else {
    skate('back');
    moveHair(10);
    lookRight();
  }

  if (scrollTimer) {
    clearTimeout(scrollTimer);
  }

  scrollTimer = setTimeout(function(){
    moveHair(0);
    eat();
    scrollContent(window.pageXOffset);
  }, 1);

  if(lookTimer) {
    clearTimeout(lookTimer);
  }

  lookTimer = setTimeout(lookStraight,100);
}

// var listItems = document.querySelectorAll('.story li');
var para = document.querySelector('.storyline');
var lastIndex = 0;

function scrollContent(pos){
  var activeIndex = Math.floor(pos/100);
  if(activeIndex > lastIndex)
  para.innerHTML += " " + words[activeIndex];
  lastIndex = activeIndex;
  //document.querySelector('.story li:nth-child('+activeIndex+')').className = 'active';
}

function skate(dir){
  wheels.forEach(function(el){
    ang = (dir === 'front' ? ang+1 : ang-1);
    el.transform('r'+[10*ang]);
  });
}

function moveHair(angle){
  hair.animate({transform: 'r'+[angle,pivots.hair]},10);
}

function eat(){
  for (var i = foodPoints.length - 1; i >= 0; i--) {
    var food = foodPoints[i];
    if(window.scrollX > food.el.node.offsetLeft - 330 && !food.isEaten){
      //lookLeft();
      openMouth();
    }
    if(window.scrollX > food.el.node.offsetLeft - 150 && !food.isEaten){
      food.el.node.style.display = 'none';
      closeMouth();
      changePants(food.el.node.getAttribute('color'));
      //lookStraight();
      food.isEaten = true;
    }
  }
}

function blinkEyes(){
  eyes.forEach(function(el){
    el.attr({'r':0});
  });
  setTimeout(function(){
    eyes.forEach(function(el){
      el.attr({'r':4.08});
    });
  },100);
}

function changePants(color){
  pants.forEach(function(el){
    el.animate({'fill': color},200);
  });
}

function lookLeft(){
  eyes.forEach(function(el){
    el.animate({transform:'t'+[10,0]},50);
  });
}

function lookRight(){
  eyes.forEach(function(el){
    el.animate({transform:'t'+[-10,0]},50);
  });
}

function openMouth(){
  smile.attr('display','none');
  mouth.attr('display','inline').animate({transform:'t'+[-26,0]},20);
}

function closeMouth(){
  smile.attr('display','inline');
  mouth.attr('display','none').animate({transform:'t'+[0,0]},20);
}

function lookStraight(){
  eyes.forEach(function(el){
    el.animate({transform:'t'+[0,0]},50);
  });
}

function moveClouds() {
  setInterval(function () {
    cloud.transform('t'+[i++,0]);
  },200);
}

function dance(){
  pant1.animate({transform:'t'+[-7,0]},200);
  pant2.animate({transform:'t'+[-7,0]},200);
  spine.animate({transform:'r'+[5,pivots.spine]},200);
  legCrack.animate({transform:'t'+[-7,0]+'r'+[-10,pivots.folds]},200);
  leftFolds.animate({transform:'t'+[-7,0]+'r'+[-10,pivots.folds]},200);
  rightFolds.animate({transform:'t'+[-7,0]+'r'+[-10,pivots.folds]},200);
  hand1.animate({transform:'r'+[-7,pivots.spine]},200);
  hand2.animate({transform:'r'+[-7,pivots.spine]},200);
  belt.animate({transform:'t'+[-7,0]},200);
  setTimeout(function(){
    pant1.animate({transform:'t'+[7,0]},200);
    pant2.animate({transform:'t'+[7,0]},200);
    spine.animate({transform:'r'+[-5,pivots.spine]},200);
    legCrack.animate({transform:'t'+[7,0]+'r'+[15,pivots.folds]},200);
    leftFolds.animate({transform:'t'+[7,0]+'r'+[15,pivots.folds]},200);
    rightFolds.animate({transform:'t'+[7,0]+'r'+[15,pivots.folds]},200);
    hand1.animate({transform:'r'+[7,pivots.spine]},200);
    hand2.animate({transform:'r'+[7,pivots.spine]},200);
    belt.animate({transform:'t'+[7,0]},200);
  }, 250);
}

function resetFancyPants(){
  pant1.animate({transform:'t'+[0,0]},200);
  pant2.animate({transform:'t'+[0,0]},200);
  spine.animate({transform:'r'+[0,pivots.spine]},200);
  legCrack.animate({transform:'t'+[0,0]+'r'+[0,pivots.folds]},200);
  leftFolds.animate({transform:'t'+[0,0]+'r'+[0,pivots.folds]},200);
  rightFolds.animate({transform:'t'+[0,0]+'r'+[0,pivots.folds]},200);
  hand1.animate({transform:'r'+[0,pivots.spine]},200);
  hand2.animate({transform:'r'+[0,pivots.spine]},200);
  belt.animate({transform:'t'+[0,0]},200);
}