#fleximg.js

Responsive image loader - Automatically scales image files to fit the desired display dimensions

[![Build Status](https://travis-ci.org/cioddi/fleximg.js.png)](https://travis-ci.org/cioddi/fleximg.js)

[![Selenium Test Status](https://saucelabs.com/browser-matrix/fleximg.svg)](https://saucelabs.com/u/fleximg)

##Demo
http://fleximg.nettwurk.org/demos/scale.php

##Requirements
* mod_rewrite
* PHP
* Imagemagick or GD lib
* jquery (install using "$ bower install")
* hammer.js (to detect pinch zoom events "$ bower install")

##Installation
1. Make sure your apache webserver with PHP, mod_rewrite and imagemagick is up an running
2. Place the contents of this git project somewhere under the document root (e.g. {document_root}/lib/fleximg/) and install requirements using ```$ bower install```
3. create the folder /img/fleximg_scale on your server and make sure its writable for the apache user
4. If you already have a .htaccess file (in {document_root}/.htaccess) put the following lines in (make sure in this line ``` RewriteRule img/fleximg_scale/. /lib/scale.php [L] ``` that /lib/scale.php points to scale.php on your server)

		<IfModule mod_rewrite.c>
		RewriteEngine On

		RewriteCond %{REQUEST_FILENAME} !-f
		RewriteRule img/fleximg_scale/. /lib/scale.php [L]

		</IfModule>

5. Open demos/scale.php to see if it works. You should see a resizable image with cows.
6. To insert into your existing projects change the src attribute key in your img tags to data-src and load the following scripts

		<script src="/components/jquery/jquery.js"></script>

		<script src="/components/hammerjs/dist/jquery.hammer.js"></script>

		<script src="/scale.js"></script>

7. Init fleximg

		<script>
			scale.init({ 		//all default values
				fireOnResize:	true,
				fireOnPinchIn:	true,
				fireOnPinch:	true,
				fireOnPinchOut:	true,
				fireOnLoad:		true,
				steps:			50
			});
		</script>


##Options

###steps (int)
If the exact display size of is always roundet up so it can be evenly divided by the steps value to make the caching more efficient and prevent creating thousands of versions of one file.

###fireOnResize (bool)
Image sizes get readjusted on window resize event

###fireOnLoad (bool)
Image sizes get readjusted on page load

###fireOnPinchIn (bool)
... on Hammer.js pinchIn event

###fireOnPinchOut (bool)
... on Hammer.js pinchOut event

###fireOnPinch (bool)
... on Hammer.js pinch event


##Usage
1. Set the src of img tags to the data-src attribute and make sure to create style definition which affect the image dimension.
2. After the page loads scale.js will be executed and check all img tags for data-src attributes. If found it will set the src of the img to ```/img/fleximg_scale/{IMG_WIDTH}/{IMG_HEIGHT}/{IMG_FILEPATH}```.
3. If that file exists it will be delivered by the apache. If there is no file the request will be passed to scale.php which will scale the image to the requested dimensions, save it to the desired path and redirect to it again.

##MIT license
Copyright (c) 2013 Max Tobias Weber


##additional copyright info
###assets
img/test.jpg (2013 Loren Kerns http://www.flickr.com/photos/lorenkerns/9262656978/)