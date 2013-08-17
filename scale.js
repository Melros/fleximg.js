scale = {
	init:function(options){
		scale.applyOptions(options);
	},
	defaultOptions:{
		onPinchIn:true,
		onPinchOut:true,
		onLoad:true,
		onResize:true,
		steps:50
	},
	getOptionsObject:function(options){
		return $.extend(scale.defaultOptions,options);
	},
	applyOptions:function(options){
		options = scale.getOptionsObject(scale.getOptionsObject);

		for(var key in options){
			if(options.hasOwnProperty(key)){
				switch(key){
					case 'onPinchIn':
						if(options[key])$(window).hammer().on("pinchin",scale.latestResizeRefresh);
						break;
					case 'onPinchOut':
						if(options[key])$(window).hammer().on("pinchout",scale.latestResizeRefresh);
						break;
					case 'onLoad':
						if(options[key])$(window).load(scale.readjust);
						break;
					case 'onPinch':
						$(window).hammer().on("pinch",scale.latestResizeRefresh);
						break;
					case 'onResize':
						$(window).resize(scale.latestResizeRefresh);
						break;
					default:
						scale.setOption(key,options[key]);
						break;
				}
			}
		}
	},
	setOption:function(key,value){
		scale[key] = value;
	},
	readjust:function(){
		$('img').each(function(idx,item){
			if($(item).attr('data-src')){
				var width = parseInt($(item).width(),10);
				width = Math.floor(width * scale.getZoomRatio() * scale.getDevicePixelRatio());

				if(scale.steps)width = scale.applySteps(width);

				var resize = false;

				if(typeof $(item).attr('current-size') === 'undefined'){
					resize = true;
				}else if(parseInt($(item).attr('current-size')) < width){
					resize = true;
				}

				if(resize){

					$(item).attr('current-size',width);
					$(item).attr('src','/img/scale/'+width+'/0'+$(item).attr('data-src'));
				}
			}
		});
	},
	applySteps:function(width){
		return width+scale.steps-(width%scale.steps)
	},
	getZoomRatio:function(){
		var ratio = $(document).width() / window.innerWidth;

		if(isNaN(ratio))return 1;
		return ratio;
	},
	getDevicePixelRatio:function(){
		var ratio = 1;

		if(typeof window.devicePixelRatio !== 'undefined'){
			ratio = window.devicePixelRatio;
		}
		return ratio;
	},
	latestResizeRefresh:function(){

		if(scale.latestResize === null)setTimeout(scale.latestResizeCheck,scale.wait);

		scale.latestResize = new Date();

	},
	latestResizeCheck:function(){
		if(scale.latestResize !== null){
			if(scale.latestResize.getTime() + scale.wait < new Date().getTime()){
				scale.readjust();

				scale.latestResize = null;
			}else{
				setTimeout(scale.latestResizeCheck,scale.wait);
			}
		}
	},
	wait:1000,
	latestResize:null
};