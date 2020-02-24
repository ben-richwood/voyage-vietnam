<!doctype html>
<!--[if lt IE 7 ]> <html lang="en" class="ie6"> <![endif]-->
<!--[if IE 7 ]>    <html lang="en" class="ie7"> <![endif]-->
<!--[if IE 8 ]>    <html lang="en" class="ie8"> <![endif]-->
<!--[if IE 9 ]>    <html lang="en" class="ie9"> <![endif]-->
<!--[if !IE]><!--> <html lang="en"> <!--<![endif]-->
<head>
	<link href="https://fonts.googleapis.com/css?family=Kalam:300|Permanent+Marker&display=swap" rel="stylesheet">
	<meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />

	<script src="https://api.tiles.mapbox.com/mapbox-gl-js/v1.6.1/mapbox-gl.js"></script>
	<link href="https://api.tiles.mapbox.com/mapbox-gl-js/v1.6.1/mapbox-gl.css" rel="stylesheet" />
	<link rel="stylesheet" href="./css/basic.css">
	<style>
		body { margin: 0; padding: 0; }
		#map { position: absolute; top: 0; bottom: 0; width: 100%; height:100%; }
		#controls{z-index:1000;position:fixed;bottom:0;left:0; background-color: rgba(255,255,255,1);padding:1rem;opacity:.2}
		#controls:hover{opacity:1;}
		#progressSlider{width:30vw;}
		#pauseButton{}
		#pauseButton:hover{background-color: white;}
		#offset-title{position: absolute;top:-2vw;left:2vw;width:80%;height:3rem;}
		#button-intro-map{display:flex;align-items: center;position: absolute;bottom:10%;left:0; width: 100%; justify-content: center;}
	</style>

	<meta name="viewport" content="width = 1050, user-scalable = no" />
	<!-- <script type="text/javascript" src="./js/jquery.min.1.7.js"></script> -->
	<!-- <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script> -->
	<!-- <script type="text/javascript" src="./js/modernizr.2.5.3.min.js"></script> -->
	<!-- <script type="text/javascript" src="./js/gsap.min.js"></script> -->
	<script type="text/javascript" src="./js/bundle.js" defer></script>
</head>
<body>
	<div id="controls" style="display:none;">
		<button id="pauseButton">Pause</button>
		<input id="progressSlider" type="range" min="0" max="1" value="0" step="0.001" />
	</div>

	<div class="bg"></div>
	<div id="start-intro">
		<div style="transform:translate3d(0,0,0);z-index:201">
			<button type="button" id="start-intro-button" name="button">Lancer l'intro</button>
			<a href="#" id="skip-intro">Passer intro (21 sec)</a>
		</div>
	</div>
	<div id="intro">
		<div id="carnet">
			<div id="carnet--container">
				<!-- <picture>
	        <source type="image/webp" srcset="./img/notebook_bg02.webp">
	        <img src="./img/notebook_bg02.jpg" alt="fond carnet" class="carnet_bg">
	      </picture> -->
				<div class="notebook__left-page">
					<div id="offset-title"></div>
					<div class="title" id="title">
						Richwood brothers
						<hr>
						<span class="present"><span>
					</div>
					<div id="main-title" class="">
						<div id="fondo">
						</div>
						<div id="encima"></div>
					</div>
				</div>
				<div class="notebook__right-page">
					<div id="intro-dates">
						<div style="align-self:flex-end;">Saigon</div>
						<div style="flex-basis: calc(100% - 30%);align-self: center;">Juin 2018</div>
						<div style="align-self:flex-start;">Hanoi</div>
					</div>
					<div id="button-intro-map">
						<button type="button" name="button" id="start-button">Commencer</button>
					</div>
				</div>
			</div>
		</div>


		<div id="particles" class="particles">
		  <div class="particules-container"></div>
			<svg id="mySVG" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"/>
		</div>

	</div>

	<div id="map"></div>

	<div id="blackScreen"></div>

	<div id="cardDeck" class="ui-widget-content">
	  <div class="card">
			<picture>
        <!-- <source type="image/webp" srcset="./pages/1.webp">
        <source type="image/jp2" srcset="./pages/1.jp2"> -->
        <source type="image/jp2" srcset="./img/pics/IMAG0873.jpg">
        <img src="./img/pics/IMAG0873.jpg" alt="Img 1">
      </picture>
	  </div>
	  <div class="card">
			<picture>
        <!-- <source type="image/webp" srcset="./pages/2.webp">
        <source type="image/jp2" srcset="./pages/2.jp2"> -->
        <source type="image/jp2" srcset="./img/pics/IMAG0875.jpg">
        <img src="./img/pics/IMAG0875.jpg" alt="Img 1">
      </picture>
	  </div>
		<div id="close-card">
			<button type="button" name="button">Fermer</button>
		</div>
	</div>

<div class="flipbook-viewport">
	<div class="container">
		<button class="toc-page" id="toc-page"><img src="./img/arrow-back-toc.svg" alt="arrow page back"></button>
		<button class="prev-page" id="prev-page"><img src="./img/arrow-back.svg" alt="arrow page back"></button>
		<div class="next-page" id="next-page" onClick="nextPage()"></div>
		<div class="flipbook">
			<div class="cover"></div>
			<!-- <div class="left-cover"></div> -->
			<div class="left-page"></div>
			<div class="right-page table-contents">
				<div class="inner-page">
					<h1>Chronologie</h1>
					<ul id="page-list">
						<li data-page="4">Hanoi <span>5-6 juin</span></li>
						<li data-page="6">Ninh Binh<span>7 juin</span></li>
						<li data-page="8">Sur la route de Ha Giang<span>8 juin</span></li>
						<li data-page="10">Ha Giang<span>9 juin</span></li>
						<li data-page="12">Sur la route de Dong Van<span>10 juin</span></li>
						<li data-page="14">Dong Van<span>11-12 juin</span></li>
						<li data-page="16">Direction Lung Cu<span>13 juin</span></li>
						<li data-page="18">Direction Lung Cu<span>13 juin</span></li>
					</ul>
				</div>
			</div>

			<?php include('./pages/content/01.php'); ?>

		</div>
	</div>
</div>

</body>
</html>