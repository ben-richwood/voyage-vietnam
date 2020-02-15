import gsap from "gsap";
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
  for (var i = 0, div; i < particleQuantity; i++) {
    div = document.createElement("div");
    div.className = "particle";
    container.appendChild(div);
    gsap.set(div, {
      x: getRandom(0, emitterWidth),
      y: getRandom(-emitterHeight, emitterHeight / 2),
      opacity: 0.4,
      scale: getRandom(particleSizeMin, particleSizeMax) + 0.025,
      backgroundColor: particleColor()
    });
    particleArray.push(div);
  }
};

var tweenParticles = function() {
  /*
  let tl = gsap.timeline({repeat: -1, repeatDelay: 0.5});
  tl.to(particleArray, {
    delay: startDelay,
    duration: getRandom(durationMin, durationMax) + 0.1,
    y: emitterHeight,
    ease: "power1.inOut",
    repeat: -1,
    stagger: .1
  }).play();
  */

  particleArray.map((particle, index) => {
  // let tl = gsap.tween(); //create the timeline
  let tl = gsap.timeline(); //create the timeline
    tl.to(particle, {
      delay: startDelay,
      duration: getRandom(durationMin, durationMax) + 0.1,
      y: emitterHeight,
      ease: "power1.inOut",
      repeat:101
    }).play();
    tl.to(particle, {
      x: "+=" + getRandom(windMin, windMax) + 0.1,
      duration: getRandom(windDurationMin, windDurationMax) + 0.1,
      repeat: 10,
      yoyo: true,
      ease: "sine.inOut"
    }).play();
    tl.to(particle, {
      opacity: 1,
      duration: getRandom(0, 1) + 0.5,
      repeat: 10,
      yoyo: true,
      ease: "sine.inOut"
    }).play();
  });
};

// create particles
createParticles();

// tween particles
tweenParticles();

// fade in particles on start

document.getElementById("start-button").addEventListener('click', function(){
  let node = document.getElementById("intro");
  // initMap();
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
