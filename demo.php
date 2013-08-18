<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
	<title>Fleximg.js open source responsive image loader</title>
	<style>
		body{
			font-family: sans-serif;
		}
		.block_center{
			margin: 0 auto;
			display: block;
			margin-top: 30px;
		}
		.img_1{
			width: 30%;
		}
		#slider,#slider_display{
			width: 20%;
			max-width: 300px;
			min-width: 200px;
			text-align: center;
		}
	</style>
	<link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />
</head>
<body>
	<div id="slider" class="block_center"></div>
	<div id="slider_display" class="block_center"><span class="value">30</span> %</div>
	<img data-src="/img/test.jpg" class="img_1 block_center" >

	<script src="/components/jquery/jquery.js"></script>
  <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
	<script src="/components/hammerjs/dist/jquery.hammer.js"></script>
	<script src="/scale.js"></script>
	<script>
		scale.init();

	  $(function() {
	    $( "#slider" ).slider({
	    	max:100,
	    	min:1,
	    	value:30,
	    	slide:function(event,ui){
	    		$('#slider_display > .value').html(ui.value);
	    		$('.img_1').css('width',ui.value+'%');

	    		scale.latestResizeRefresh();
	    	}
	    });
	  });

	</script>
</body>
</html>