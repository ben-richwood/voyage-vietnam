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
    scale:getRandom(particleSizeMin, particleSizeMax) + 0.025,
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
var music = new Audio('./uncharted_320k.mp3');

createParticles()

document.getElementById("start-button").addEventListener('click', function(){
  let node = document.getElementById("intro");
  initMap();
  var tween = gsap.to(node, 2, { delay: 2, opacity: 0, paused: true, onComplete: killThemAll })// .call(killThemAll)
  tween.play();
}, false)

function killThemAll() {
  gsap.killTweensOf(".particle");
  let node = document.getElementById("intro");
  if (node.parentNode) {
    node.parentNode.removeChild(node);
  }
}

function addClassToMainTitle() {
  document.getElementById("main-title").className = "show-menu";
}

function launchMusic() {
  music.play()
}

function animCarnet(){
  let carnetContainer = document.getElementById("carnet--container");
  carnetContainer.querySelector(".bg").classList.add("anim");
  carnetContainer.querySelector(".notebook__left-page").classList.add("anim");
}

document.querySelector("#start-intro button").addEventListener('click', launchEx, false);

function launchEx() {
  const masterTimeline = gsap.timeline();
  masterTimeline.set(carnet, {scale: 1.4})
  masterTimeline.to("#start-intro", {duration: 0, delay: 0, opacity: 0, onComplete: animCarnet})
  .to(carnet, {duration: .4, opacity: 1})
  .to("#intro", {duration: .5, onComplete: launchMusic})
  .to("#button-intro", {duration: .3, delay:.5, opacity: 1})
  // .to(carnet, {duration: 4, delay: .2, xPercent: "-=10", yPercent: "-=40", scale: 1})
  .to('#main-title', {duration: 1, delay: -2, onStart: addClassToMainTitle})
  // .to(carnet, {duration: 4, delay: .2, xPercent: "-=40", yPercent: "+=30"})
  .to("#intro-dates", {duration: 4, delay: -4, xPercent: "-=70", opacity: 1})
}


/*
1. particles
2. first drawing
*/
