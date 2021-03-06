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
		#controls{
			z-index: 1000;
			position: fixed;
			bottom: 6vh;
			left: 50%;
			background-color: rgba(0,0,0,.9);
			padding: 1rem;
			opacity: .2;
			transform: translateX(-50%);
			/* border-radius: 6px; */
			border: 1px solid rgba(255,255,255,.4);
			transition: all .3s ease;
			text-align: center;
		}
		#controls:hover{
			opacity:1;
			border: 1px solid rgba(255,255,255,.4);
			transition: all .3s ease;
		}
		#progressSlider{width:30vw;}
		#pauseButton{display: block; margin: .4rem auto;background-color: transparent;}
		#pauseButton svg{max-height: 2rem;}
		#pauseButton:hover{background-color: transparent;}
		#offset-title{position: absolute;top:-2vw;left:2vw;width:80%;height:3rem;}
		#button-intro-map{
			display:flex;align-items: center;position: absolute;bottom:10%;left:0; width: 100%; justify-content: center;
		}
		.button-special, .button-images{
			background: url(./img/button-card.png) 0 0/100% 100% no-repeat;
			border: 0;
			padding: 1.2rem 1.8rem;
			font-size: 1.7rem;
			cursor: pointer;
		}
		#button-intro-map button{
			color: white;
			background-image: url(./img/button-card-black.png);
		}
	</style>

	<meta name="viewport" content="width = 1050, user-scalable = no" />
	<!-- <script type="text/javascript" src="./js/jquery.min.1.7.js"></script> -->
	<!-- <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script> -->
	<!-- <script type="text/javascript" src="./js/modernizr.2.5.3.min.js"></script> -->
	<!-- <script type="text/javascript" src="./js/gsap.min.js"></script> -->
	<script type="text/javascript" src="./js/bundle.js" defer></script>
</head>
<body>
	<div id="controls">
		<button id="pauseButton">
			<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
				 width="213.833px" height="175.992px" viewBox="0 0 213.833 175.992" enable-background="new 0 0 213.833 175.992"
				 xml:space="preserve">
			<polygon fill="#FFFFFF" points="81.515,175.992 0,175.992 22.043,0 103.559,0 "/>
			<polygon fill="#FFFFFF" points="199.123,175.992 117.609,175.992 137.674,0 213.833,0 "/>
			</svg>
		</button>
		<input id="progressSlider" type="range" min="0" max="1" value="0" step="0.001" />
	</div>

	<div class="bg"></div>
	<div id="start-intro">
		<div style="transform:translate3d(0,0,0);z-index:201">
			<button type="button" id="start-intro-button" class="button-special" name="button">Lancer l'intro</button>
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
						<button type="button" name="button" class="button-special anim" id="start-button">Commencer</button>
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
			<button type="button" class="button-special" name="button">Fermer <img src="./img/close_white_thin.svg" alt="fermer" title="fermer les photos"/></button>
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
						<li data-page="6"><span>Ninh Binh</span><span>7 juin</span></li>
						<li data-page="8">Sur la route de Ha Giang<span>8 juin</span></li>
						<li data-page="10">Ha Giang<span>9 juin</span></li>
						<li data-page="12">Sur la route de Dong Van<span>10 juin</span></li>
						<li data-page="14">Dong Van<span>11-12 juin</span></li>
						<li data-page="16">Direction Lung Cu<span>13 juin</span></li>
						<li data-page="18">Cao Bang<span>14 juin</span></li>
						<li data-page="20">Ban Gioc - la frontière chinoiseg<span>15 juin</span></li>
						<li data-page="22">??<span>16 juin</span></li>
						<li data-page="24">Be Be Lake<span>17 juin</span></li>
						<li data-page="26">Retour à Hanoi<span>18 - 19 juin</span></li>
					</ul>
				</div>
			</div>

			<?php include('./pages/content/01.php'); ?>

		</div>
	</div>
</div>

</body>
</html>