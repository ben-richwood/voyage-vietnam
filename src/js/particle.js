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

// createParticles()
function launchMusic() {
  music.play()
}

function animCarnet(){
  let carnetContainer = document.getElementById("carnet--container");
  document.querySelector(".bg").classList.add("anim");
  carnetContainer.querySelector(".notebook__left-page").classList.add("anim");
}
let isPaused = false;
const masterTimeline = gsap.timeline();
const tw = window.innerWidth

document.querySelector("#start-intro-button").addEventListener('click', launchIntro, false);

document.querySelector("#skip-intro").addEventListener('click', launchMap, false);
document.getElementById("start-button").addEventListener('click', launchMap, false)
document.getElementById("pauseButton").addEventListener('click', function(){
  isPaused = !isPaused;
  if (isPaused) {
    masterTimeline.pause();
    music.pause()
  } else {
    masterTimeline.play();
    music.play()
  }
}, false)

function launchIntro() {
  masterTimeline.set(carnet, {scale: 1, z: 550, x: 0.55*tw, yPercent: 90, filter: "blur(6px)"})
  // .set(".bg", {scale: 1, z: 600})

  masterTimeline.to("#start-intro", {duration: 1, delay: 0, opacity: 0, onComplete: animCarnet})
    .to("#start-intro", {delay: .4, duration: .2, onComplete: launchMusic})
    .to(carnet, {duration: 1.3, delay: .8, filter: "blur(0px)", ease: "power1.out"})
    .to(carnet, {duration: 3, delay: -2.3, yPercent: "-=20", xPercent: "-=5", z: "-=50", ease: "power1.out"})
    .to('#main-title', {duration: 1, delay: .4, onStart: addClassToMainTitle})
    .to(carnet, {duration: 5, delay: -2, z: 400, rotate: "-4deg", xPercent: "45", yPercent: "25", ease: "power2.inOut"})
    .to(carnet, {duration: 5, delay: 0, z: 400, rotate: "3deg", xPercent: "5", yPercent: "60", ease: "power1.inOut"})
    .to("#intro-dates", {duration: 0, delay: -1, onComplete: function(){
      document.getElementById("intro-dates").classList.add("anim");
    }})
    // .to("#intro-dates", {duration: .5, delay: 0, xPercent: "1", opacity: 1})
    .to(carnet, {duration: 6, delay: -0.5, z: 450, rotate: "-7deg", xPercent: "-=10", yPercent: "-=40", ease: "power2.inOut"})

    // +xPercent => vers la gauche
    // -xPercent => vers la droite

    // +yPercent => remonte
    // -yPercent => redescend

    // .to("#intro", {duration: .5})
    // .to("#button-intro", {duration: .3, delay:.5, opacity: 1})
    // .to(carnet, {duration: 4, delay: .2, xPercent: "-=10", yPercent: "-=40", scale: 1})
    // .to(carnet, {duration: 4, delay: .2, xPercent: "-=40", yPercent: "+=30"})
}

function launchMap() {
  let node = document.getElementById("intro");
  initMap();
  var tween = gsap.to(node, 2, { delay: 2, opacity: 0, paused: true, onComplete: killThemAll })// .call(killThemAll)
  tween.play();
}


/*
1. particles
2. first drawing
*/
