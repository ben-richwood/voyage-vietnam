<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Richwood portfolio</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
		<link type="text/css" rel="stylesheet" href="./assets/css/main.css">
	</head>
	<body>
		<div id="flipbook">
			<div class="hard"> Turn.js </div>
			<div class="hard"></div>
			<div> Page 1 </div>
			<div> Page 2 </div>
			<div> Page 3 </div>
			<div> Page 4 </div>
			<div class="hard"></div>
			<div class="hard"></div>
		</div>
		<script type="text/javascript" src="./rurn.min.js"></script>
		<script type="text/javascript">
			$("#flipbook").turn({
				width: 400,
				height: 300,
				autoCenter: true
			});
		</script>
	</body>
</html>