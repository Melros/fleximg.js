#fleximg.js

Responsive image loader - Automatically resizes image files to fit the desired display dimensions

[![Build Status](https://travis-ci.org/cioddi/fleximg.js.png)](https://travis-ci.org/cioddi/fleximg.js)

[![Selenium Test Status](https://saucelabs.com/browser-matrix/fleximg.svg)](https://saucelabs.com/u/fleximg)

##Website
http://www.fleximg.com

[Documentation](http://fleximg.com/doc/build/Readme.html)

##What

###Client

```
collect all img tags that have "data-src" attribute set
each
	measure desired display dimensions
	set the source of that img tag to a path that leads to the resized image

```

###Server
```
catch the request for that image file
	if not image_file_exists
		create a resized version of the original image
	
	deliver it
```

##Requirements
* apache 
* mod_rewrite
* PHP
* Imagemagick or GD lib
* jquery (only if you dont have it already, install using "$ bower install")
* [optional] jquery.hammer.js (to detect pinch zoom events "$ bower install" or download from https://github.com/EightMedia/hammer.js)

##Installation
1. Make sure your server meets the requirements
2. Place the contents of this git project somewhere under the document root (e.g. {document_root}/lib/fleximg/) and install requirements using ```$ bower install```
3. create the folder /img/fleximg_scale on your server and make sure its writable for the apache user
4. If you already have a .htaccess file (in {document_root}/.htaccess) put the following lines in after "RewriteEngine On" (make sure in this line ``` RewriteRule img/fleximg_scale/. /lib/fleximg/scale.php [L] ``` that /lib/fleximg/scale.php points to scale.php on your server)

		RewriteCond %{REQUEST_FILENAME} !-f
		RewriteRule img/fleximg_scale/. /lib/fleximg/scale.php [L]

5. Open demos/scale.php to see if it works. You should see a resizable image with cows.
6. To insert into your existing projects change the src attribute key in your img tags to data-src and load the following scripts

		<script src="/lib/fleximg/bower_components/jquery/jquery.js"></script>

		<script src="/lib/fleximg/bower_components/hammerjs/dist/jquery.hammer.js"></script>

		<script src="/lib/fleximg/fleximg.js"></script>

7. Init fleximg

		<script>
			fleximg_js.init({ 		//all default values
				fireOnResize:	true,
				fireOnPinchIn:	true,
				fireOnPinch:	true,
				fireOnPinchOut:	true,
				fireOnLoad:		true,
				steps:			50
			});
		</script>

##Test configuration

If you are having trouble with the setup open http://[your_host]/lib/fleximg/testconfiguration.php in your browser. It will check the following things and probably help you with getting your setup right:

- Apache modules (Imagemagick/gdlib)
- image cache folder location (/img/fleximg_scale)
- image cache folder rights
- .htaccess location
- .htaccess setup



##Client Options
###Javascript as parameter when calling fleximg_js.init(Array options)

####steps (int)
If the exact display size of is always roundet up so it can be evenly divided by the steps value to make the caching more efficient and prevent creating thousands of versions of one file.

####fireOnResize (bool)
Image sizes get readjusted on window resize event

####fireOnLoad (bool)
Image sizes get readjusted on page load

####fireOnPinchIn (bool)
... on Hammer.js pinchIn event

####fireOnPinchOut (bool)
... on Hammer.js pinchOut event

####fireOnPinch (bool)
... on Hammer.js pinch event

####hidpi_multiplier (float [0.1-1])
adjust delivery size images for hidpi screens (hidpi_multiplier will be multiplied with the calculated multiplier [screen_real_pixel_width]/[screen_fake_pixel_width])

##Server Options
###PHP as parameter when calling new Fleximg(Array options) in scale.php

####steps (int)
Should be set to the same value as it is on the client side as a "security" feature to prevent the creation of thousand different sized version per image.

####use_gdlib (bool)
Make fleximg use gdlib instead of imagemagick

####jpeg_compression (integer [1-100])
adjust jpeg compression

##Usage
1. Set the src of img tags to the data-src attribute and make sure to create style definition which affect the image dimension.
2. After the page loads fleximg.js will be executed and check all img tags for data-src attributes. If found it will set the src of the img to ```/img/fleximg_scale/{IMG_WIDTH}/{IMG_HEIGHT}/{IMG_FILEPATH}```.
3. If that file exists it will be delivered by the apache. If there is no file the request will be passed to scale.php which will scale the image to the requested dimensions, save it to the desired path and redirect to it again.

##Changelog

* 23.8.2013 - Server Side Options 'steps' and 'use_gdlib'
* 28.8.2013 - Gd lib support/fallback
* 16.10.2013 - Make use of hammer.js optional

##MIT license
Copyright (c) 2013 Max Tobias Weber


##additional copyright info
###assets
img/test.jpg (2013 Loren Kerns http://www.flickr.com/photos/lorenkerns/9262656978/)