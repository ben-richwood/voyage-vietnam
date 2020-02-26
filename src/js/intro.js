import gsap from "gsap";
require('jquery');
import { map, initMap } from "./map.js"

var getRandom = function(min, max) {
  return min + Math.random() * (max - min);
};
var container = document.getElementById("particles");
var emitterWidth = container.getBoundingClientRect().width;
var emitterHeight = container.getBoundingClientRect().height;
var particleArray = [];
var particleQuantity = 150// 200;
var particleSizeMax = 0.5;
var particleSizeMin = 0;
var particleColor = function() {
  return (
    "hsl(" +
    getRandom(25, 50) +
    "," +
    getRandom(80, 100) +
    "%," +
    getRandom(50, 90) +
    "%"
  );
};
var speed = 16;
var windMin = -80;
var windMax = 80;
var windDurationMin = 2;
var windDurationMax = 4;
var durationMin = 15;
var durationMax = 20;
var startDelay = 0;

var createParticles = function() {
  /* a Pen by Diaco m.lotfollahi  : https://diacodesign.com */

  gsap.set("img",{xPercent:"-50%",yPercent:"-50%"})

  var svgNS = "http://www.w3.org/2000/svg";

  var total = 70;
  let mySVG = document.getElementById("mySVG")

  const w = window.innerWidth;
  const h = window.innerHeight;
  // var w = mySVG.width();
  // var h = mySVG.height();

  for (let i=0; i<total; i++){
  var myCircle = document.createElementNS(svgNS,"circle");
  myCircle.setAttributeNS(null,"class","dot");
  myCircle.setAttributeNS(null,"r",5);
  mySVG.appendChild(myCircle);
  const allDots = document.getElementsByClassName('dot');
  gsap.set(allDots[i],{
    x:Random(w),
    y:0 ,
    scale:getRandom(particleSizeMin, particleSizeMax) + 0.045,
    fill:particleColor});
   animm(allDots[i]);
   }

   function animm(elm){
   gsap.to(elm,Random(5)+3,{
     y:h,ease:"power1.inOut",repeat:-1, delay:-5
   });
   gsap.to(elm,Random(5)+1,{
     x:'+=430', repeat:-1,yoyo:false,ease:"sine.inOut"
   })
   gsap.to(elm,Random(1)+0.5,{
     fill:"rgba(0,0,0,0)",repeat:-1,yoyo:true,ease:"sine.inOut"
   })
   };

  function Random (max) {
    return Math.random()*max;
  }

  /* a Pen by Diaco m.lotfollahi  : https://diacodesign.com */
};

// create particles
// createParticles();
const carnet = document.getElementById("carnet");
const mainTitle = document.getElementById("main-title");
const blackBg = document.querySelector(".bg");
const startIntro = document.getElementById("start-intro");
const intro = document.getElementById("intro");
var music = new Audio('./uncharted_320k.mp3');


function killThemAll() {
  gsap.killTweensOf(".particle");
  let node = document.getElementById("intro");
  if (node.parentNode) {
    node.parentNode.removeChild(node);
  }
}

function addClassToMainTitle() {
  mainTitle.className = "show-menu";
}

// createParticles()
function launchMusic() {
  music.play()
}

function animCarnet(){
  startIntro.style.display = "none";
  let carnetContainer = document.getElementById("carnet--container");
  blackBg.classList.add("anim");
  carnetContainer.querySelector(".notebook__left-page").classList.add("anim");
}
let isPaused = false;
const masterTimeline = gsap.timeline({onUpdate: adjustUI});
const tw = carnet.offsetWidth;
const th = carnet.offsetHeight;

const progressSlider = document.getElementById("progressSlider");
const buttonIntroMapButton =  document.getElementById("start-button")
const controls =  document.getElementById("controls")

document.querySelector("#start-intro-button").addEventListener('click', launchIntro, false);
document.querySelector("#skip-intro").addEventListener('click', launchMap, false);
buttonIntroMapButton.addEventListener('click', function(){
  // gsap.killTweensOf("#carnet");
  masterTimeline.kill();
  launchMap();
}, false);
progressSlider.addEventListener("input", update);
document.getElementById("pauseButton").addEventListener('click', function(){
  isPaused = !isPaused;
  if (isPaused) {
    masterTimeline.pause();
    music.pause()
  } else {
    masterTimeline.play();
    music.currentTime = masterTimeline.duration() * masterTimeline.progress();
    music.play()
  }
}, false);

function update(){
  isPaused = true;
  music.pause()
  masterTimeline.progress(progressSlider.value); // change the timeline’s
  masterTimeline.pause();
  music.currentTime = masterTimeline.duration() * masterTimeline.progress();
  // music.play()
}

function adjustUI() {
  progressSlider.value = masterTimeline.progress();
}


// place all active animations in one timeline
// var tl = TimelineLite.exportRoot();

let waypoints = [];
let counter = 0
let rootr = carnet.getBoundingClientRect();
// get viewport size
let vp = { "width": window.innerWidth, "height": window.innerHeight };
let scale_factor = 0.8;
[ "offset-title", "title", "main-title", "intro-dates", "button-intro-map" ].forEach(function(e){
  let cs = document.getElementById(e);
  let csr = cs.getBoundingClientRect();
  csr.center = { 'x': csr.width/2.0 + csr.left,
  'y': csr.height/2.0 + csr.top };
  csr.center.string = ""+csr.center.x+"px "+ csr.center.y+"px";

  // calculate translate parameters
  let t = {};
  t.scale = scale_factor * (vp.height/csr.height);
  t.translate = {
    'x': (rootr.left + (vp.width/2.0 - csr.center.x)),
    'y': (rootr.top + (vp.height/2.0 - csr.center.y)) };
  t.translate_w_scale = {
    'x': t.translate.x - (t.scale * csr.center.x),
    'y': t.translate.y - (t.scale * csr.center.y)};
  t.scale_centered = {
    'x': -((csr.center.x * t.scale) - csr.center.x),
    'y': -((csr.center.y * t.scale) - csr.center.y) };
  t.transformOrigin = {
    left: csr.center.x,
    top: csr.center.y
  }
  t.csr = csr
  waypoints.push(t)
  counter++;
});


let origin = waypoints[0].transformOrigin;

function launchIntro() {

  masterTimeline.set(carnet, {
    x: waypoints[0].translate.x,
    y: waypoints[0].translate.y,
    z: "300px",
    transformOrigin: waypoints[0].csr.center.string,
    scale: 3,
    filter: "blur(6px)"
  })
  .set("#intro-dates", {display: "none"})
  .set(buttonIntroMapButton, {display: "none"})

  // .set(".bg", {scale: 1, z: 600})

  masterTimeline.defaultEase = "power2.inOut";
  masterTimeline.to(startIntro, {duration: 1, delay: .6, opacity: 0, onComplete: launchMusic, onStart: animCarnet})

    .addLabel("presents", 1)
    .addLabel("main-title", 4)
    .addLabel("dates", 9)
    .addLabel("ending", 15)

    // go to presents
    .to(origin, 4, { left: waypoints[1].transformOrigin.left, top: waypoints[1].transformOrigin.top, ease: "power4.out", onUpdate: function() { updateOrigin(1) } }, "presents" )
    .to(carnet, {duration: .8, filter: "blur(2px)"}, "presents+=0.2")
    .to(carnet, { duration: 1.2, filter: "blur(0px)", ease: "power2.inOut"}, "presents")
    .to(carnet, { duration: 3, delay: 1, ease: "expo.out",
        x: waypoints[1].translate.x,
        y: waypoints[1].translate.y,
        scale: 2.9
      }, "presents")
    .to(carnet, { duration: 5, ease: "power4.out", rotate: "-4deg", rotateY: "-12deg", rotateZ: "-3deg", onComplete: function() {blackBg.style.display = "none";}}, "presents")
    .to(carnet, {duration: .8, filter: "blur(0px)"}, "main-title-=0.4")

    // go to main-title
    .to(origin, 5, { left: waypoints[2].transformOrigin.left, top: waypoints[2].transformOrigin.top, ease: "power1.inOut", onUpdate: function() { updateOrigin(2) } }, "main-title" )
    .to(carnet, { duration: 5, ease: "power1.inOut",
      x: waypoints[2].translate.x,
      y: waypoints[2].translate.y,
    }, "main-title")
    .to(carnet, { duration: 5, ease: "power4.out", rotateX: "6deg", rotateY: "15deg", rotateZ: "4deg"}, "presents+=1")
    .to(mainTitle, {duration: 5, scale: 1.045, ease: "power2.inOut", onStart: addClassToMainTitle}, "main-title+=2")
    .to(carnet, {duration: 5, scale: 1.8, ease: "power2.inOut"}, "main-title+=2")

    // go to intro dates
    .to(origin, 7, { left: waypoints[3].transformOrigin.left, top: waypoints[3].transformOrigin.top, ease: "power2.inOut",
      onUpdate: function() { updateOrigin(3) }
    }, "dates")
    .to(carnet, {duration: 7,
        rotateX: "-1deg", rotateY: "12deg", rotateZ: "-3deg",
        ease: "power2.inOut",
        x: waypoints[3].translate.x,
        y: waypoints[3].translate.y,
        scale: 1.8
      }, "dates")
      // .to("#intro-dates", {duration: .3, opacity: 1}, "dates+=4.3")
      .to("#intro-dates", {duration: 0, display: "flex"}, "dates+=5")
      .to(carnet, {duration: 1.2, onStart: function(){ document.getElementById("intro-dates").classList.add("anim"); }}, "dates+=5.5")

      // go to ending
      .to(origin, 7, { left: waypoints[4].transformOrigin.left, top: waypoints[4].transformOrigin.top, ease: "power2.inOut",
        onUpdate: function() { updateOrigin(4) }
      }, "ending")
      .to(carnet, {duration: 7,
        rotate: "-4deg", rotateY: "15deg", rotateZ: "-5deg",
        ease: "power2.inOut",
          x: waypoints[4].translate.x,
          y: waypoints[4].translate.y,
          scale: 1.9
        }, "ending")
      .to(buttonIntroMapButton, {display: "block"}, "ending+=4.2")


    // +xPercent => vers la gauche
    // -xPercent => vers la droite

    // +yPercent => remonte
    // -yPercent => redescend

}

function updateOrigin(i) {
  gsap.set(carnet, {
    transformOrigin: origin.left + "px " + origin.top + "px", ease: "power2.inOut"
  }, "+=0");
}

function launchMap() {
  // let node = document.getElementById("intro");
  const transition = gsap.timeline();
  transition.set(carnet, {})
  transition.to(intro, { duration: .1, delay: 0, display: "none", onComplete: killThemAll })
    .to(startIntro, { duration: 1, delay: 0.2, opacity: 0, onComplete: function() { blackBg.classList.add("anim"); } })
    .to(controls, {opacity: 0, duration: .6})
    .to(blackBg, { duration: .8, delay: 0.5, onComplete: function(){
      blackBg.style.display = "none";
      startIntro.style.display = "none";
      controls.style.display = "none";
    } })
  initMap();
}


/*
1. particles
2. first drawing
*/
