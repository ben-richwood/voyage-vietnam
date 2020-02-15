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
  gsap.set($(".dot")[i],{
    x:Random(w),
    y:0 ,
    scale:getRandom(particleSizeMin, particleSizeMax) + 0.025,
    fill:particleColor});
   animm($(".dot")[i]);
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
createParticles();

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
