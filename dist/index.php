<!doctype html>
<!--[if lt IE 7 ]> <html lang="en" class="ie6"> <![endif]-->
<!--[if IE 7 ]>    <html lang="en" class="ie7"> <![endif]-->
<!--[if IE 8 ]>    <html lang="en" class="ie8"> <![endif]-->
<!--[if IE 9 ]>    <html lang="en" class="ie9"> <![endif]-->
<!--[if !IE]><!--> <html lang="en"> <!--<![endif]-->
<head>
	<link href="https://fonts.googleapis.com/css?family=Kalam|Permanent+Marker&display=swap" rel="stylesheet">
	<meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />

	<script src="https://api.tiles.mapbox.com/mapbox-gl-js/v1.6.1/mapbox-gl.js"></script>
	<link href="https://api.tiles.mapbox.com/mapbox-gl-js/v1.6.1/mapbox-gl.css" rel="stylesheet" />
	<style>
	body { margin: 0; padding: 0; }
	#map { position: absolute; top: 0; bottom: 0; width: 100%; height:100%; };
</style>

	<meta name="viewport" content="width = 1050, user-scalable = no" />
	<link rel="stylesheet" href="./css/basic.css">
	<!-- <script type="text/javascript" src="./js/jquery.min.1.7.js"></script> -->
	<!-- <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script> -->
	<!-- <script type="text/javascript" src="./js/modernizr.2.5.3.min.js"></script> -->
	<!-- <script type="text/javascript" src="./js/gsap.min.js"></script> -->
	<script type="text/javascript" src="./js/bundle.js" defer></script>
</head>
<body>

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