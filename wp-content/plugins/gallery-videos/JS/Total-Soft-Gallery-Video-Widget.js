;( function( window ) {
	'use strict';
	var docElem = window.document.documentElement,
		transEndEventNames = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		support = {
			transitions : Modernizr.csstransitions,
			support3d : Modernizr.csstransforms3d
		};
	function setTransform( el, transformStr ) {
		el.style.WebkitTransform = transformStr;
		el.style.msTransform = transformStr;
		el.style.transform = transformStr;
	}
	function getViewportW() {
		var client = docElem['clientWidth'],
			inner = window['innerWidth'];
		if( client < inner )
			return inner;
		else
			return client;
	}
	function extend( a, b ) {
		for( var key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}
	function CBPGridGallery( el, options ) {
		this.el = el;
		this.options = extend( {}, this.options );
  		extend( this.options, options );
  		this._init();
	}
	CBPGridGallery.prototype.options = {
	};
	CBPGridGallery.prototype._init = function() {
		// main grid
		this.grid = this.el.querySelector( 'section.grid-wrap > ul.grid' );
		// main grid items
		this.gridItems = [].slice.call( this.grid.querySelectorAll( 'li:not(.grid-sizer)' ) );
		// items total
		this.itemsCount = this.gridItems.length;
		// slideshow grid
		this.slideshow = this.el.querySelector( 'section.slideshow > ul' );
		// slideshow grid items
		this.slideshowItems = [].slice.call( this.slideshow.children );
		// index of current slideshow item
		this.current = -1;
		// slideshow control buttons
		this.ctrlPrev = this.el.querySelector( 'section.slideshow > nav > span.nav-prev' );
		this.ctrlNext = this.el.querySelector( 'section.slideshow > nav > span.nav-next' );
		this.ctrlClose = this.el.querySelector( '.nav-close-RW' );
		this.ctrlClose2 = this.el.querySelector( 'section.slideshow > nav > span.nav-close' );
		
		
		// init masonry grid
		this._initMasonry();
		// init events
		this._initEvents();
	};
	CBPGridGallery.prototype._initMasonry = function() {
		var grid = this.grid;
		imagesLoaded( grid, function() {
			new Masonry( grid, {
				itemSelector: 'li',
				columnWidth: grid.querySelector( '.grid-sizer' )
			});
		});
	};
	CBPGridGallery.prototype._initEvents = function() {
		var self = this;
		// open the slideshow when clicking on the main grid items
		this.gridItems.forEach( function( item, idx ) {
			item.addEventListener( 'click', function() {
				self._openSlideshow( idx );
			} );
		} );
		// slideshow controls
		this.ctrlPrev.addEventListener( 'click', function() { self._navigate( 'prev' ); } );
		this.ctrlNext.addEventListener( 'click', function() { self._navigate( 'next' ); } );
		this.ctrlClose.addEventListener( 'click', function() { self._closeSlideshow(); } );
		this.ctrlClose2.addEventListener( 'click', function() { self._closeSlideshow(); } );
		// window resize
		window.addEventListener( 'resize', function() { self._resizeHandler(); } );
		// keyboard navigation events
		document.addEventListener( 'keydown', function( ev ) {
			if ( self.isSlideshowVisible ) {
				var keyCode = ev.keyCode || ev.which;

				switch (keyCode) {
					case 37:
						self._navigate( 'prev' );
						break;
					case 39:
						self._navigate( 'next' );
						break;
					case 27:
						self._closeSlideshow();
						break;
				}
			}
		} );
		// trick to prevent scrolling when slideshow is visible
		window.addEventListener( 'scroll', function() {
			if ( self.isSlideshowVisible ) {
				window.scrollTo( self.scrollPosition ? self.scrollPosition.x : 0, self.scrollPosition ? self.scrollPosition.y : 0 );
			}
			else {
				self.scrollPosition = { x : window.pageXOffset || docElem.scrollLeft, y : window.pageYOffset || docElem.scrollTop };
			}
		});
	};
	CBPGridGallery.prototype._openSlideshow = function( pos ) {
		this.isSlideshowVisible = true;
		this.current = pos;
		classie.addClass( this.el, 'slideshow-open' );
		/* position slideshow items */
		// set viewport items (current, next and previous)
		this._setViewportItems();
		// add class "current" and "show" to currentItem
		classie.addClass( this.currentItem, 'current' );
		classie.addClass( this.currentItem, 'show' );
		jQuery(this.currentItem).find('iframe').attr('src', jQuery(this.currentItem).find('iframe').attr('src').split('?autoplay=0')[0]+'?autoplay=1');
		// add class show to next and previous items
		// position previous item on the left side and the next item on the right side
		if( this.prevItem ) {
			classie.addClass( this.prevItem, 'show' );
			var translateVal = Number( -1 * ( getViewportW() / 2 + this.prevItem.offsetWidth / 2 ) );
			setTransform( this.prevItem, support.support3d ? 'translate3d(' + translateVal + 'px, 0, -150px)' : 'translate(' + translateVal + 'px)' );
		}
		if( this.nextItem ) {
			classie.addClass( this.nextItem, 'show' );
			var translateVal = Number( getViewportW() / 2 + this.nextItem.offsetWidth / 2 );
			setTransform( this.nextItem, support.support3d ? 'translate3d(' + translateVal + 'px, 0, -150px)' : 'translate(' + translateVal + 'px)' );
		}
	};
	CBPGridGallery.prototype._navigate = function( dir ) {
		if( this.isAnimating ) return;
		if( dir === 'next' && this.current === this.itemsCount - 1 ||  dir === 'prev' && this.current === 0  ) {
			this._closeSlideshow();
			return;
		}
		this.isAnimating = true;
		// reset viewport items
		this._setViewportItems();
		var self = this,
			itemWidth = this.currentItem.offsetWidth,
			// positions for the centered/current item, both the side items and the incoming ones
			transformLeftStr = support.support3d ? 'translate3d(-' + Number( getViewportW() / 2 + itemWidth / 2 ) + 'px, 0, -150px)' : 'translate(-' + Number( getViewportW() / 2 + itemWidth / 2 ) + 'px)',
			transformRightStr = support.support3d ? 'translate3d(' + Number( getViewportW() / 2 + itemWidth / 2 ) + 'px, 0, -150px)' : 'translate(' + Number( getViewportW() / 2 + itemWidth / 2 ) + 'px)',
			transformCenterStr = '', transformOutStr, transformIncomingStr,
			// incoming item
			incomingItem;
		if( dir === 'next' ) {
			transformOutStr = support.support3d ? 'translate3d( -' + Number( (getViewportW() * 2) / 2 + itemWidth / 2 ) + 'px, 0, -150px )' : 'translate(-' + Number( (getViewportW() * 2) / 2 + itemWidth / 2 ) + 'px)';
			transformIncomingStr = support.support3d ? 'translate3d( ' + Number( (getViewportW() * 2) / 2 + itemWidth / 2 ) + 'px, 0, -150px )' : 'translate(' + Number( (getViewportW() * 2) / 2 + itemWidth / 2 ) + 'px)';
		}
		else {
			transformOutStr = support.support3d ? 'translate3d( ' + Number( (getViewportW() * 2) / 2 + itemWidth / 2 ) + 'px, 0, -150px )' : 'translate(' + Number( (getViewportW() * 2) / 2 + itemWidth / 2 ) + 'px)';
			transformIncomingStr = support.support3d ? 'translate3d( -' + Number( (getViewportW() * 2) / 2 + itemWidth / 2 ) + 'px, 0, -150px )' : 'translate(-' + Number( (getViewportW() * 2) / 2 + itemWidth / 2 ) + 'px)';
		}
		// remove class animatable from the slideshow grid (if it has already)
		classie.removeClass( self.slideshow, 'animatable' );
		if( dir === 'next' && this.current < this.itemsCount - 2 || dir === 'prev' && this.current > 1 ) {
			// we have an incoming item!
			incomingItem = this.slideshowItems[ dir === 'next' ? this.current + 2 : this.current - 2 ];
			setTransform( incomingItem, transformIncomingStr );
			classie.addClass( incomingItem, 'show' );
		}
		var slide = function() {
			// add class animatable to the slideshow grid
			classie.addClass( self.slideshow, 'animatable' );
			// overlays:
			jQuery(self.currentItem).find('iframe').attr('src', jQuery(self.currentItem).find('iframe').attr('src').split('?autoplay=1')[0]+'?autoplay=0');
			classie.removeClass( self.currentItem, 'current' );
			var nextCurrent = dir === 'next' ? self.nextItem : self.prevItem;
			classie.addClass( nextCurrent, 'current' );
			jQuery(nextCurrent).find('iframe').attr('src', jQuery(nextCurrent).find('iframe').attr('src').split('?autoplay=0')[0]+'?autoplay=1');

			setTransform( self.currentItem, dir === 'next' ? transformLeftStr : transformRightStr );
			if( self.nextItem ) {
				setTransform( self.nextItem, dir === 'next' ? transformCenterStr : transformOutStr );
			}
			if( self.prevItem ) {
				setTransform( self.prevItem, dir === 'next' ? transformOutStr : transformCenterStr );
			}
			if( incomingItem ) {
				setTransform( incomingItem, dir === 'next' ? transformRightStr : transformLeftStr );
			}
			var onEndTransitionFn = function( ev ) {
				if( support.transitions ) {
					if( ev.propertyName.indexOf( 'transform' ) === -1 ) return false;
					this.removeEventListener( transEndEventName, onEndTransitionFn );
				}
				if( self.prevItem && dir === 'next' ) {
					classie.removeClass( self.prevItem, 'show' );
				}
				else if( self.nextItem && dir === 'prev' ) {
					classie.removeClass( self.nextItem, 'show' );
				}
				if( dir === 'next' ) {
					self.prevItem = self.currentItem;
					self.currentItem = self.nextItem;
					if( incomingItem ) {
						self.nextItem = incomingItem;
					}
				}
				else {
					self.nextItem = self.currentItem;
					self.currentItem = self.prevItem;
					if( incomingItem ) {
						self.prevItem = incomingItem;
					}
				}
				self.current = dir === 'next' ? self.current + 1 : self.current - 1;
				self.isAnimating = false;
			};
			if( support.transitions ) {
				self.currentItem.addEventListener( transEndEventName, onEndTransitionFn );
			}
			else {
				onEndTransitionFn();
			}
		};
		setTimeout( slide, 25 );
	}
	CBPGridGallery.prototype._closeSlideshow = function( pos ) {
		// remove class slideshow-open from the grid gallery elem
		classie.removeClass( this.el, 'slideshow-open' );
		// remove class animatable from the slideshow grid
		classie.removeClass( this.slideshow, 'animatable' );
		var self = this,
			onEndTransitionFn = function( ev ) {
				if( support.transitions ) {
					if( ev.target.tagName.toLowerCase() !== 'ul' ) return;
					this.removeEventListener( transEndEventName, onEndTransitionFn );
				}
				// remove classes show and current from the slideshow items
				classie.removeClass( self.currentItem, 'current' );
				classie.removeClass( self.currentItem, 'show' );
				jQuery(self.currentItem).find('iframe').attr('src', jQuery(self.currentItem).find('iframe').attr('src').split('?autoplay=1')[0]+'?autoplay=0');
				if( self.prevItem ) {
					classie.removeClass( self.prevItem, 'show' );
				}
				if( self.nextItem ) {
					classie.removeClass( self.nextItem, 'show' );
				}
				// also reset any transforms for all the items
				self.slideshowItems.forEach( function( item ) { setTransform( item, '' ); } );
				self.isSlideshowVisible = false;
			};

		if( support.transitions ) {
			this.el.addEventListener( transEndEventName, onEndTransitionFn );
		}
		else {
			onEndTransitionFn();
		}
	};
	CBPGridGallery.prototype._setViewportItems = function() {
		this.currentItem = null;
		this.prevItem = null;
		this.nextItem = null;
		if( this.current > 0 ) {
			this.prevItem = this.slideshowItems[ this.current - 1 ];
		}
		if( this.current < this.itemsCount - 1 ) {
			this.nextItem = this.slideshowItems[ this.current + 1 ];
		}
		this.currentItem = this.slideshowItems[ this.current ];
	}
	CBPGridGallery.prototype._resizeHandler = function() {
		var self = this;
		function delayed() {
			self._resize();
			self._resizeTimeout = null;
		}
		if ( this._resizeTimeout ) {
			clearTimeout( this._resizeTimeout );
		}
		this._resizeTimeout = setTimeout( delayed, 50 );
	}
	CBPGridGallery.prototype._resize = function() {
		if ( this.isSlideshowVisible ) {
			// update width value
			if( this.prevItem ) {
				var translateVal = Number( -1 * ( getViewportW() / 2 + this.prevItem.offsetWidth / 2 ) );
				setTransform( this.prevItem, support.support3d ? 'translate3d(' + translateVal + 'px, 0, -150px)' : 'translate(' + translateVal + 'px)' );
			}
			if( this.nextItem ) {
				var translateVal = Number( getViewportW() / 2 + this.nextItem.offsetWidth / 2 );
				setTransform( this.nextItem, support.support3d ? 'translate3d(' + translateVal + 'px, 0, -150px)' : 'translate(' + translateVal + 'px)' );
			}
		}
	}
	// add to global namespace
	window.CBPGridGallery = CBPGridGallery;
})( window );
function Total_Soft_GV_GVG_Page(TotalSoftGV_ID, TotalSoftPage, TotalSoftPP, TotalSoftCV)
{
	var TotalSoft_VG_GVG_TShow, TotalSoft_VG_GVG_DShow='false';
	var ajaxurl = object.ajaxurl;
	var data = {
	action: 'TotalSoftGallery_Video_PageGO', // wp_ajax_my_action / wp_ajax_nopriv_my_action in ajax.php. Can be named anything.
	foobar: TotalSoftGV_ID, // translates into $_POST['foobar'] in PHP
	};
	jQuery.post(ajaxurl, data, function(response) {
		var b=Array();
		var a=response.split('=>');
		for(var i=3;i<a.length;i++)
		{ b[b.length]=a[i].split('[')[0].trim(); }
		b[b.length-1]=b[b.length-1].split(')')[0].trim();

		TotalSoft_VG_GVG_TShow=b[3];
		TotalSoft_VG_GVG_DShow=b[4];
	})

	setTimeout(function(){
		var ajaxurl = object.ajaxurl;
		var data = {
		action: 'TotalSoftGallery_Video_Page', // wp_ajax_my_action / wp_ajax_nopriv_my_action in ajax.php. Can be named anything.
		foobar: TotalSoftGV_ID, // translates into $_POST['foobar'] in PHP
		};
		jQuery.post(ajaxurl, data, function(response) {
			
			var TotalSoftGallery_Video_VT=Array();
			var TotalSoftGallery_Video_VDesc=Array();
			var TotalSoftGallery_Video_VLink=Array();
			var TotalSoftGallery_Video_VONT=Array();
			var TotalSoftGallery_Video_VURL=Array();
			var TotalSoftGallery_Video_IURL=Array();
			var TotalSoftGV_GVG_HTML='<li class="grid-sizer"></li>';
			jQuery('.grid').html('');

			var a=response.split('stdClass Object');
			for(i=1;i<a.length;i++)
			{
				var c=a[i].split('=>');
				TotalSoftGallery_Video_VT[TotalSoftGallery_Video_VT.length]=c[2].split('[')[0].trim();
				TotalSoftGallery_Video_VDesc[TotalSoftGallery_Video_VDesc.length]=c[3].split('[')[0].trim();
				TotalSoftGallery_Video_VLink[TotalSoftGallery_Video_VLink.length]=c[4].split('[')[0].trim();
				TotalSoftGallery_Video_VONT[TotalSoftGallery_Video_VONT.length]=c[5].split('[')[0].trim();
				TotalSoftGallery_Video_VURL[TotalSoftGallery_Video_VURL.length]=c[6].split('[')[0].trim();
				TotalSoftGallery_Video_IURL[TotalSoftGallery_Video_IURL.length]=c[7].split('[')[0].trim();
			}
			for(i=0;i<TotalSoftCV;i++)
			{
				var TotalSoftFigcaption='';
				if(TotalSoft_VG_GVG_TShow == 'true' || TotalSoft_VG_GVG_DShow == 'true' && TotalSoftGallery_Video_VDesc[i] != '')
				{
					TotalSoftFigcaption='<figcaption>';
					if(TotalSoft_VG_GVG_TShow == 'true')
					{
						TotalSoftFigcaption += '<h3>'+TotalSoftGallery_Video_VT[i]+'</h3>';
					}
					if(TotalSoft_VG_GVG_DShow == 'true')
					{
						TotalSoftFigcaption += '<p>'+TotalSoftGallery_Video_VDesc[i]+'</p>';
					}
					TotalSoftFigcaption += '</figcaption>';
				}
				if(i>=TotalSoftPP*(TotalSoftPage-1) && i<TotalSoftPP*TotalSoftPage)
				{
					TotalSoftGV_GVG_HTML+='<li class="imgLiii" id="TotalSoft_GV_GVG_'+TotalSoftGV_ID+'_'+parseInt(parseInt(i)+1)+'"><figure><img src="'+TotalSoftGallery_Video_IURL[i]+'" alt="img'+i+'"/>'+TotalSoftFigcaption+'</figure></li>';
				}
				else
				{
					TotalSoftGV_GVG_HTML+='<li class="imgLiii" style="display:none" id="TotalSoft_GV_GVG_'+TotalSoftGV_ID+'_'+parseInt(parseInt(i)+1)+'"><figure><img src="'+TotalSoftGallery_Video_IURL[i]+'" alt="img'+i+'"/>'+TotalSoftFigcaption+'</figure></li>';
				}
			}
			jQuery('.grid').html(TotalSoftGV_GVG_HTML);
			new CBPGridGallery( document.getElementById( 'grid-gallery' ) );
			Total_Soft_GV_GVG_PagePresp1();
		})
	},500)	
	jQuery('.pagination li').each(function(){
		jQuery(this).find('span').removeClass('active');
	})
	jQuery('#TotalSoft_GV_GVG_PLi_'+TotalSoftGV_ID+'_'+TotalSoftPage).find('span').addClass('active');
}
function Total_Soft_GV_GVG_PagePresp1(){
	var ImgWidthhhh = jQuery('.ImgWidthhhh').val();
	var VTitlePOpFS = jQuery('.VTitlePOpFS').val();
	var VDescPOpFS = jQuery('.VDescPOpFS').val();
	var VLinkPOpFS = jQuery('.VLinkPOpFS').val();
	jQuery('.slideshow ul li figure iframe').css('width',jQuery('.slideshow ul li figure iframe').height()*16/9);
	jQuery('.slideshow figcaption h3').css('font-size',VTitlePOpFS*jQuery(window).width()/(jQuery(window).width()+150));
	jQuery('.slideshow figcaption p').css('font-size',VDescPOpFS*jQuery(window).width()/(jQuery(window).width()+150));
	jQuery('.slideshow figcaption p').css('line-height',jQuery('.slideshow figcaption p').css('font-size'));
	jQuery('.TotalSoft_GV_GVG_Link').css('font-size',VLinkPOpFS*jQuery(window).width()/(jQuery(window).width()+150));
	jQuery('.grid li').css('width',ImgWidthhhh*jQuery('.GRWR').width()/1000);
	if(jQuery('.GRWR').width()<=300){
		jQuery('.GRU li').css('width',ImgWidthhhh*jQuery('.GRWR').width()/300+'px');
	}else if(jQuery('.GRWR').width()<=700){
		jQuery('.GRU li').css('width',ImgWidthhhh*jQuery('.GRWR').width()/700+'px');
	}else if(jQuery('.GRWR').width()<=1000){
		jQuery('.GRU li').css('width',ImgWidthhhh*jQuery('.GRWR').width()/1000+'px');
	}else if(jQuery('.GRWR').width()<=1500){
		jQuery('.GRU li').css('width',ImgWidthhhh*jQuery('.GRWR').width()/1500+'px');
	}else if(jQuery('.GRWR').width()<=1800){
		jQuery('.GRU li').css('width',ImgWidthhhh*jQuery('.GRWR').width()/1800+'px');
	}
}
function Total_Soft_GV_GVG_PageP(TotalSoftGV_ID, TotalSoftPP, TotalSoftCV)
{
	var TotalSoftPage='';
	jQuery('.pagination li').each(function(){
		if(jQuery(this).find('span').hasClass('active'))
		{
			if(jQuery(this).find('span').html()!='1')
			{
				TotalSoftPage=parseInt(parseInt(jQuery(this).find('span').html())-1);
				Total_Soft_GV_GVG_Page(TotalSoftGV_ID, TotalSoftPage, TotalSoftPP, TotalSoftCV);
			}
		}
	})
}
function Total_Soft_GV_GVG_PageN(TotalSoftGV_ID, TotalSoftPP, TotalSoftCV, TotalSoftPC)
{
	var TotalSoftPage='';
	jQuery('.pagination li').each(function(){
		if(jQuery(this).find('span').hasClass('active'))
		{
			if(jQuery(this).find('span').html()!=TotalSoftPC)
			{
				TotalSoftPage=parseInt(parseInt(jQuery(this).find('span').html())+1);
				Total_Soft_GV_GVG_Page(TotalSoftGV_ID, TotalSoftPage, TotalSoftPP, TotalSoftCV);
				return false;
			}
		}
	})
}
function Total_Soft_GV_GVG_PageLM(TotalSoftGV_ID, TotalSoftPP, TotalSoftCV, TotalSoftPC)
{
	var TotalSoftPage=parseInt(parseInt(jQuery('#TotalSoftPage_'+TotalSoftGV_ID).val())+1);
	jQuery('#TotalSoftPage_'+TotalSoftGV_ID).val(TotalSoftPage);
	if(TotalSoftPage<=TotalSoftPC)
	{
		var TotalSoft_VG_GVG_TShow, TotalSoft_VG_GVG_DShow='false';
		var ajaxurl = object.ajaxurl;
		var data = {
		action: 'TotalSoftGallery_Video_PageGO', // wp_ajax_my_action / wp_ajax_nopriv_my_action in ajax.php. Can be named anything.
		foobar: TotalSoftGV_ID, // translates into $_POST['foobar'] in PHP
		};
		jQuery.post(ajaxurl, data, function(response) {
			var b=Array();
			var a=response.split('=>');
			for(var i=3;i<a.length;i++)
			{ b[b.length]=a[i].split('[')[0].trim(); }
			b[b.length-1]=b[b.length-1].split(')')[0].trim();

			TotalSoft_VG_GVG_TShow=b[3];
			TotalSoft_VG_GVG_DShow=b[4];
		})

		setTimeout(function(){
			var ajaxurl = object.ajaxurl;
			var data = {
			action: 'TotalSoftGallery_Video_Page', // wp_ajax_my_action / wp_ajax_nopriv_my_action in ajax.php. Can be named anything.
			foobar: TotalSoftGV_ID, // translates into $_POST['foobar'] in PHP
			};
			jQuery.post(ajaxurl, data, function(response) {
				
				var TotalSoftGallery_Video_VT=Array();
				var TotalSoftGallery_Video_VDesc=Array();
				var TotalSoftGallery_Video_VLink=Array();
				var TotalSoftGallery_Video_VONT=Array();
				var TotalSoftGallery_Video_VURL=Array();
				var TotalSoftGallery_Video_IURL=Array();
				var TotalSoftGV_GVG_HTML='<li class="grid-sizer"></li>';
				jQuery('.grid').html('');
				
				var a=response.split('stdClass Object');
				for(i=1;i<a.length;i++)
				{
					var c=a[i].split('=>');
					TotalSoftGallery_Video_VT[TotalSoftGallery_Video_VT.length]=c[2].split('[')[0].trim();
					TotalSoftGallery_Video_VDesc[TotalSoftGallery_Video_VDesc.length]=c[3].split('[')[0].trim();
					TotalSoftGallery_Video_VLink[TotalSoftGallery_Video_VLink.length]=c[4].split('[')[0].trim();
					TotalSoftGallery_Video_VONT[TotalSoftGallery_Video_VONT.length]=c[5].split('[')[0].trim();
					TotalSoftGallery_Video_VURL[TotalSoftGallery_Video_VURL.length]=c[6].split('[')[0].trim();
					TotalSoftGallery_Video_IURL[TotalSoftGallery_Video_IURL.length]=c[7].split('[')[0].trim();
				}
				
				for(i=0;i<TotalSoftCV;i++)
				{
					var TotalSoftFigcaption='';
					if(TotalSoft_VG_GVG_TShow == 'true' || TotalSoft_VG_GVG_DShow == 'true' && TotalSoftGallery_Video_VDesc[i] != '')
					{
						TotalSoftFigcaption='<figcaption>';
						if(TotalSoft_VG_GVG_TShow == 'true')
						{
							TotalSoftFigcaption += '<h3>'+TotalSoftGallery_Video_VT[i]+'</h3>';
						}
						if(TotalSoft_VG_GVG_DShow == 'true')
						{
							TotalSoftFigcaption += '<p>'+TotalSoftGallery_Video_VDesc[i]+'</p>';
						}
						TotalSoftFigcaption += '</figcaption>';
					}
					if(i<TotalSoftPP*TotalSoftPage)
					{
						TotalSoftGV_GVG_HTML+='<li id="TotalSoft_GV_GVG_'+TotalSoftGV_ID+'_'+parseInt(parseInt(i)+1)+'"><figure><img src="'+TotalSoftGallery_Video_IURL[i]+'" alt="img'+i+'"/>'+TotalSoftFigcaption+'</figure></li>';
					}
					else
					{
						TotalSoftGV_GVG_HTML+='<li style="display:none" id="TotalSoft_GV_GVG_'+TotalSoftGV_ID+'_'+parseInt(parseInt(i)+1)+'"><figure><img src="'+TotalSoftGallery_Video_IURL[i]+'" alt="img'+i+'"/>'+TotalSoftFigcaption+'</figure></li>';
					}
				}
				jQuery('.grid').html(TotalSoftGV_GVG_HTML);
				new CBPGridGallery( document.getElementById( 'grid-gallery' ) );
				Total_Soft_GV_GVG_PagePresp1();
			})
		},500)	
	}
	else
	{
		jQuery('#TotalSoftPageDiv_'+TotalSoftGV_ID).hide(500);
	}				
}

function Total_Soft_GV_LVG_Page(TotalSoftGV_ID, TotalSoftPage, TotalSoftPP, TotalSoftCV)
{
	for(i=1;i<=TotalSoftCV;i++)
	{
		if(i>TotalSoftPP*(TotalSoftPage-1) && i<=TotalSoftPP*TotalSoftPage)
		{
			jQuery('#TotalSoft_GV_LVG_'+TotalSoftGV_ID+'_'+i).show();
		}
		else
		{
			jQuery('#TotalSoft_GV_LVG_'+TotalSoftGV_ID+'_'+i).hide();
		}
	}

	jQuery('.pagination li').each(function(){
		jQuery(this).find('span').removeClass('active');
	})
	jQuery('#TotalSoft_GV_LVG_PLi_'+TotalSoftGV_ID+'_'+TotalSoftPage).find('span').addClass('active');
}
function Total_Soft_GV_LVG_PageP(TotalSoftGV_ID, TotalSoftPP, TotalSoftCV)
{
	var TotalSoftPage='';
	jQuery('.pagination li').each(function(){
		if(jQuery(this).find('span').hasClass('active'))
		{
			if(jQuery(this).find('span').html()!='1')
			{
				TotalSoftPage=parseInt(parseInt(jQuery(this).find('span').html())-1);
				Total_Soft_GV_LVG_Page(TotalSoftGV_ID, TotalSoftPage, TotalSoftPP, TotalSoftCV);
			}
		}
	})
}
function Total_Soft_GV_LVG_PageN(TotalSoftGV_ID, TotalSoftPP, TotalSoftCV, TotalSoftPC)
{
	var TotalSoftPage='';
	jQuery('.pagination li').each(function(){
		if(jQuery(this).find('span').hasClass('active'))
		{
			if(jQuery(this).find('span').html()!=TotalSoftPC)
			{
				TotalSoftPage=parseInt(parseInt(jQuery(this).find('span').html())+1);
				Total_Soft_GV_LVG_Page(TotalSoftGV_ID, TotalSoftPage, TotalSoftPP, TotalSoftCV);
				return false;
			}
		}
	})
}
function Total_Soft_GV_LVG_PageLM(TotalSoftGV_ID, TotalSoftPP, TotalSoftCV, TotalSoftPC)
{
	var TotalSoftPage=parseInt(parseInt(jQuery('#TotalSoft_VG_LVG_Page_'+TotalSoftGV_ID).val())+1);
	jQuery('#TotalSoft_VG_LVG_Page_'+TotalSoftGV_ID).val(TotalSoftPage);
	
	if(TotalSoftPage<=TotalSoftPC)
	{
		for(i=1;i<=TotalSoftCV;i++)
		{
			if(i<=TotalSoftPP*TotalSoftPage)
			{
				jQuery('#TotalSoft_GV_LVG_'+TotalSoftGV_ID+'_'+i).show(500);
			}
			else
			{
				jQuery('#TotalSoft_GV_LVG_'+TotalSoftGV_ID+'_'+i).hide(500);
			}
		}
	}
	else
	{
		jQuery('#TotalSoft_VG_LVG_PageDiv_'+TotalSoftGV_ID).hide(500);
	}				
}
function Total_Soft_GV_TV_Page(TotalSoftGV_ID, TotalSoftPage, TotalSoftPP, TotalSoftCV)
{
	for(i=1;i<=TotalSoftCV;i++)
	{
		if(i>TotalSoftPP*(TotalSoftPage-1) && i<=TotalSoftPP*TotalSoftPage)
		{
			jQuery('#TotalSoft_GV_TV_'+TotalSoftGV_ID+'_'+i).css('display','inline-block');
			jQuery('#TotalSoft_GV_TV_'+TotalSoftGV_ID+'_'+i).show();
		}
		else
		{
			jQuery('#TotalSoft_GV_TV_'+TotalSoftGV_ID+'_'+i).css('display','none');
			jQuery('#TotalSoft_GV_TV_'+TotalSoftGV_ID+'_'+i).hide();
		}
	}

	jQuery('.pagination li').each(function(){
		jQuery(this).find('span').removeClass('active');
	})
	jQuery('#TotalSoft_GV_TV_PLi_'+TotalSoftGV_ID+'_'+TotalSoftPage).find('span').addClass('active');
}
function Total_Soft_GV_TV_PageP(TotalSoftGV_ID, TotalSoftPP, TotalSoftCV)
{
	var TotalSoftPage='';
	jQuery('.pagination li').each(function(){
		if(jQuery(this).find('span').hasClass('active'))
		{
			if(jQuery(this).find('span').html()!='1')
			{
				TotalSoftPage=parseInt(parseInt(jQuery(this).find('span').html())-1);
				Total_Soft_GV_TV_Page(TotalSoftGV_ID, TotalSoftPage, TotalSoftPP, TotalSoftCV);
			}
		}
	})
}
function Total_Soft_GV_TV_PageN(TotalSoftGV_ID, TotalSoftPP, TotalSoftCV, TotalSoftPC)
{
	var TotalSoftPage='';
	jQuery('.pagination li').each(function(){
		if(jQuery(this).find('span').hasClass('active'))
		{
			if(jQuery(this).find('span').html()!=TotalSoftPC)
			{
				TotalSoftPage=parseInt(parseInt(jQuery(this).find('span').html())+1);
				Total_Soft_GV_TV_Page(TotalSoftGV_ID, TotalSoftPage, TotalSoftPP, TotalSoftCV);
				return false;
			}
		}
	})
}
function Total_Soft_GV_TV_PageLM(TotalSoftGV_ID, TotalSoftPP, TotalSoftCV, TotalSoftPC)
{
	var TotalSoftPage=parseInt(parseInt(jQuery('#TotalSoft_VG_TV_Page_'+TotalSoftGV_ID).val())+1);
	jQuery('#TotalSoft_VG_TV_Page_'+TotalSoftGV_ID).val(TotalSoftPage);
	
	if(TotalSoftPage<=TotalSoftPC)
	{
		for(i=1;i<=TotalSoftCV;i++)
		{
			if(i<=TotalSoftPP*TotalSoftPage)
			{
				jQuery('#TotalSoft_GV_TV_'+TotalSoftGV_ID+'_'+i).css('display','inline');
			}
			else
			{
				jQuery('#TotalSoft_GV_TV_'+TotalSoftGV_ID+'_'+i).css('display','none');
			}
		}
	}
	else
	{
		jQuery('#TotalSoft_VG_TV_PageDiv_'+TotalSoftGV_ID).hide(500);
	}				
}

function Total_Soft_GV_CP_Page(TotalSoftGV_ID, TotalSoftPage, TotalSoftPP, TotalSoftCV)
{
	for(i=1;i<=TotalSoftCV;i++)
	{
		if(i>TotalSoftPP*(TotalSoftPage-1) && i<=TotalSoftPP*TotalSoftPage)
		{
			jQuery('#TotalSoft_GV_CP_'+TotalSoftGV_ID+'_'+i).show();
		}
		else
		{
			jQuery('#TotalSoft_GV_CP_'+TotalSoftGV_ID+'_'+i).hide();
		}
	}

	jQuery('.pagination li').each(function(){
		jQuery(this).find('span').removeClass('active');
	})
	jQuery('#TotalSoft_GV_CP_PLi_'+TotalSoftGV_ID+'_'+TotalSoftPage).find('span').addClass('active');
}
function Total_Soft_GV_CP_PageP(TotalSoftGV_ID, TotalSoftPP, TotalSoftCV)
{
	var TotalSoftPage='';
	jQuery('.pagination li').each(function(){
		if(jQuery(this).find('span').hasClass('active'))
		{
			if(jQuery(this).find('span').html()!='1')
			{
				TotalSoftPage=parseInt(parseInt(jQuery(this).find('span').html())-1);
				Total_Soft_GV_CP_Page(TotalSoftGV_ID, TotalSoftPage, TotalSoftPP, TotalSoftCV);
			}
		}
	})
}
function Total_Soft_GV_CP_PageN(TotalSoftGV_ID, TotalSoftPP, TotalSoftCV, TotalSoftPC)
{
	var TotalSoftPage='';
	jQuery('.pagination li').each(function(){
		if(jQuery(this).find('span').hasClass('active'))
		{
			if(jQuery(this).find('span').html()!=TotalSoftPC)
			{
				TotalSoftPage=parseInt(parseInt(jQuery(this).find('span').html())+1);
				Total_Soft_GV_CP_Page(TotalSoftGV_ID, TotalSoftPage, TotalSoftPP, TotalSoftCV);
				return false;
			}
		}
	})
}
function Total_Soft_GV_CP_PageLM(TotalSoftGV_ID, TotalSoftPP, TotalSoftCV, TotalSoftPC)
{
	var TotalSoftPage=parseInt(parseInt(jQuery('#TotalSoft_VG_CP_Page_'+TotalSoftGV_ID).val())+1);
	jQuery('#TotalSoft_VG_CP_Page_'+TotalSoftGV_ID).val(TotalSoftPage);
	
	if(TotalSoftPage<=TotalSoftPC)
	{
		for(i=1;i<=TotalSoftCV;i++)
		{
			if(i<=TotalSoftPP*TotalSoftPage)
			{
				jQuery('#TotalSoft_GV_CP_'+TotalSoftGV_ID+'_'+i).css('display','inline-block');
			}
			else
			{
				jQuery('#TotalSoft_GV_CP_'+TotalSoftGV_ID+'_'+i).css('display','none');
			}
		}
	}
	else
	{
		jQuery('#TotalSoft_VG_CP_PageDiv_'+TotalSoftGV_ID).hide(500);
	}				
}
function TotalSoft_GV_CP_Cont(TotalSoftGV_CP_VID, TotalSoftGV_CP_ID)
{
	jQuery('#TotalSoft_GV_CP_VID_'+TotalSoftGV_CP_ID).val(TotalSoftGV_CP_VID);
	var ajaxurl = object.ajaxurl;
	var data = {
	action: 'TotalSoftGallery_Video_CP_Popup', // wp_ajax_my_action / wp_ajax_nopriv_my_action in ajax.php. Can be named anything.
	foobar: TotalSoftGV_CP_VID, // translates into $_POST['foobar'] in PHP
	};
	jQuery.post(ajaxurl, data, function(response) {
		var b=Array();
		var a=response.split('=>');
		for(var i=3;i<a.length;i++)
		{ b[b.length]=a[i].split('[')[0].trim(); }
		b[b.length-1]=b[b.length-1].split(')')[0].trim();

		jQuery('.TotalSoft_GV_CP_Iframe iframe').attr('src',b[4]);
		jQuery('.TotalSoft_GV_CP_TD h2').html(b[0]);
		jQuery('.TotalSoft_GV_CP_TD p').html(b[1]);

		jQuery('.TotalSoft_GV_CP_Content').animate({'height':'100%',},300);
		jQuery('.TotalSoft_GV_CP_Popup').animate({'top':'50%','left':'50%',},300);
		
		if(jQuery(window).width()>1000){
			jQuery('.TotalSoft_GV_CP_Popup').animate({'width':'1000px','padding-bottom':'500px','border-radius':'0','top':'50%','left':'50%'},500);
		}else{
			if(jQuery(window).width()<=530){
				jQuery('.TotalSoft_GV_CP_Popup').animate({'width':'300px','padding-bottom':'0px','height':'320px','border-radius':'0','top':'50%','left':'50%','max-height':'98%',},500);
				jQuery('.TotalSoft_GV_CP_Iframe').css({'width':'100%','height':'47%'});
				jQuery('.fResp').css({'width':'100%','height':'100px','top':'62%',});
			}else if(jQuery(window).width()<=700){
				jQuery('.TotalSoft_GV_CP_Popup').animate({'width':'450px','padding-bottom':'0px','height':'400px','border-radius':'0','top':'50%','left':'50%','max-height':'98%','max-width':'98%'},500);
				jQuery('.TotalSoft_GV_CP_Iframe').css({'width':'100%','height':'55%'});
				jQuery('.fResp').css({'width':'100%','height':'100px','top':'68%'});
			}else{
				jQuery('.TotalSoft_GV_CP_Popup').animate({'width':'98%','padding-bottom':'50%','border-radius':'0','top':'50%','left':'50%'},500);
			}
			
			
		}
		
		
		setTimeout(function(){
			jQuery('.TotalSoft_GV_CP_Pop_Icons').animate({'height':'40px',},500);
			if(b[2])
			{
				jQuery('.frsp a').attr('href',b[2]);
				jQuery('.frsp').css({'transform':'translateX(0px)','-ms-transform': 'translateX(0px)', '-o-transform': 'translateX(0px)','-moz-transform': 'translateX(0px)','-webkit-transform': 'translateX(0px)'});
			}
			jQuery('.TotalSoft_GV_CP_Iframe').css({'transform':'translateX(0px)','-ms-transform': 'translateX(0px)', '-o-transform': 'translateX(0px)','-moz-transform': 'translateX(0px)','-webkit-transform': 'translateX(0px)'});
			jQuery('.TotalSoft_GV_CP_TD').css({'transform':'translateX(0px)','-ms-transform': 'translateX(0px)', '-o-transform': 'translateX(0px)','-moz-transform': 'translateX(0px)','-webkit-transform': 'translateX(0px)'});
			jQuery('.TotalSoft_GV_CP_TD h2').css({'transform':'translateX(0px)','-ms-transform': 'translateX(0px)', '-o-transform': 'translateX(0px)','-moz-transform': 'translateX(0px)','-webkit-transform': 'translateX(0px)'});
			jQuery('.TotalSoft_GV_CP_TD p').css({'transform':'translateX(0px)','-ms-transform': 'translateX(0px)', '-o-transform': 'translateX(0px)','-moz-transform': 'translateX(0px)','-webkit-transform': 'translateX(0px)'});
			jQuery('.TotalSoft_GV_CP_Pop_Icons_1 i.totalsoft').css({'transform':'translateY(0px)','-ms-transform': 'translateY(0px)', '-o-transform': 'translateY(0px)','-moz-transform': 'translateY(0px)','-webkit-transform': 'translateY(0px)'});
			jQuery('.TotalSoft_GV_CP_Pop_Icons_2 i.totalsoft').css({'transform':'translateY(0px)','-ms-transform': 'translateY(0px)', '-o-transform': 'translateY(0px)','-moz-transform': 'translateY(0px)','-webkit-transform': 'translateY(0px)'});
		},1000)
	})
}
function TotalSoft_GV_CP_Close_Popup()
{
	jQuery('.TotalSoft_GV_CP_Iframe').css({'transform':'translateX(-12000px)','-ms-transform': 'translateX(-12000px)', '-o-transform': 'translateX(-12000px)','-moz-transform': 'translateX(-12000px)','-webkit-transform': 'translateX(-12000px)',});
	jQuery('.TotalSoft_GV_CP_TD').css({'transform':'translateX(12000px)','-ms-transform': 'translateX(12000px)', '-o-transform': 'translateX(12000px)','-moz-transform': 'translateX(12000px)','-webkit-transform': 'translateX(12000px)'});
	jQuery('.TotalSoft_GV_CP_TD h2').css({'transform':'translateX(12000px)','-ms-transform': 'translateX(12000px)', '-o-transform': 'translateX(12000px)','-moz-transform': 'translateX(12000px)','-webkit-transform': 'translateX(12000px)'});
	jQuery('.TotalSoft_GV_CP_TD p').css({'transform':'translateX(12000px)','-ms-transform': 'translateX(12000px)', '-o-transform': 'translateX(12000px)','-moz-transform': 'translateX(12000px)','-webkit-transform': 'translateX(12000px)'});
	jQuery('.TotalSoft_GV_CP_TD h3').css({'transform':'translateX(12000px)','-ms-transform': 'translateX(12000px)', '-o-transform': 'translateX(12000px)','-moz-transform': 'translateX(12000px)','-webkit-transform': 'translateX(12000px)'});
	jQuery('.TotalSoft_GV_CP_Pop_Icons_1 i.totalsoft').css({'transform':'translateY(-12000px)','-ms-transform': 'translateY(-12000px)', '-o-transform': 'translateY(-12000px)','-moz-transform': 'translateY(-12000px)','-webkit-transform': 'translateY(-12000px)'});
	jQuery('.TotalSoft_GV_CP_Pop_Icons_2 i.totalsoft').css({'transform':'translateY(-12000px)','-ms-transform': 'translateY(-12000px)', '-o-transform': 'translateY(-12000px)','-moz-transform': 'translateY(-12000px)','-webkit-transform': 'translateY(-12000px)'});
	
	setTimeout(function(){
		if(jQuery(window).width()<=700){
			jQuery('.TotalSoft_GV_CP_Popup').animate({'width':'50px','height':'50px','border-radius':'100%','top':'50%','left':'50%',},500);
		}else{
			jQuery('.TotalSoft_GV_CP_Popup').animate({'width':'50px','padding-bottom':'50px','border-radius':'100%','top':'50%','left':'50%',},500);
		}
		
		jQuery('.TotalSoft_GV_CP_Popup').animate({'top':'-50%','left':'-50%',},300);
		jQuery('.TotalSoft_GV_CP_Pop_Icons').animate({'height':'0px',},500);
		jQuery('.TotalSoft_GV_CP_Iframe iframe').attr('src','');
	},300)
	setTimeout(function(){
		jQuery('.TotalSoft_GV_CP_Content').animate({'height':'0%',},300);
	},800)
}
function TotalSoft_GV_CP_Left(TotalSoftGV_CP_ID)
{
	var TotalSoft_GV_CP_VID=jQuery('#TotalSoft_GV_CP_VID_'+TotalSoftGV_CP_ID).val();

	jQuery('.TotalSoft_GV_CP_Iframe').css({'transform':'translateX(-12000px)','-ms-transform': 'translateX(-12000px)', '-o-transform': 'translateX(-12000px)','-moz-transform': 'translateX(-12000px)','-webkit-transform': 'translateX(-12000px)'});
	jQuery('.TotalSoft_GV_CP_TD h2').css({'transform':'translateX(12000px)','-ms-transform': 'translateX(12000px)', '-o-transform': 'translateX(12000px)','-moz-transform': 'translateX(12000px)','-webkit-transform': 'translateX(12000px)'});
	jQuery('.TotalSoft_GV_CP_TD p').css({'transform':'translateX(12000px)','-ms-transform': 'translateX(12000px)', '-o-transform': 'translateX(12000px)','-moz-transform': 'translateX(12000px)','-webkit-transform': 'translateX(12000px)'});
	jQuery('.TotalSoft_GV_CP_TD h3').css({'transform':'translateX(12000px)','-ms-transform': 'translateX(12000px)', '-o-transform': 'translateX(12000px)','-moz-transform': 'translateX(12000px)','-webkit-transform': 'translateX(12000px)'});

	var ajaxurl = object.ajaxurl;
	var data = {
	action: 'TotalSoftGallery_Video_CP_Popup_Left', // wp_ajax_my_action / wp_ajax_nopriv_my_action in ajax.php. Can be named anything.
	foobar: TotalSoft_GV_CP_VID, // translates into $_POST['foobar'] in PHP
	};
	jQuery.post(ajaxurl, data, function(response) {
		var b=Array();
		var a=response.split('=>');
		for(var i=1;i<a.length;i++)
		{ b[b.length]=a[i].split('[')[0].trim(); }
		b[b.length-1]=b[b.length-1].split(')')[0].trim();

		jQuery('#TotalSoft_GV_CP_VID_'+TotalSoftGV_CP_ID).val(b[0]);
		jQuery('.TotalSoft_GV_CP_Iframe iframe').attr('src',b[5]);
		jQuery('.TotalSoft_GV_CP_TD h2').html(b[1]);
		jQuery('.TotalSoft_GV_CP_TD p').html(b[2]);

		setTimeout(function(){
			jQuery('.TotalSoft_GV_CP_Pop_Icons').animate({'height':'40px',},500);
			if(b[3])
			{
				jQuery('.TotalSoft_GV_CP_TD h3 a').attr('href',b[3]);
				jQuery('.TotalSoft_GV_CP_TD h3').css({'transform':'translateX(0px)','-ms-transform': 'translateX(0px)', '-o-transform': 'translateX(0px)','-moz-transform': 'translateX(0px)','-webkit-transform': 'translateX(0px)'});
			}
			jQuery('.TotalSoft_GV_CP_Iframe').css({'transform':'translateX(0px)','-ms-transform': 'translateX(0px)', '-o-transform': 'translateX(0px)','-moz-transform': 'translateX(0px)','-webkit-transform': 'translateX(0px)'});
			jQuery('.TotalSoft_GV_CP_TD h2').css({'transform':'translateX(0px)','-ms-transform': 'translateX(0px)', '-o-transform': 'translateX(0px)','-moz-transform': 'translateX(0px)','-webkit-transform': 'translateX(0px)'});
			jQuery('.TotalSoft_GV_CP_TD p').css({'transform':'translateX(0px)','-ms-transform': 'translateX(0px)', '-o-transform': 'translateX(0px)','-moz-transform': 'translateX(0px)','-webkit-transform': 'translateX(0px)'});
		},500)
	})
}
function TotalSoft_GV_CP_Right(TotalSoftGV_CP_ID)
{
	var TotalSoft_GV_CP_VID=jQuery('#TotalSoft_GV_CP_VID_'+TotalSoftGV_CP_ID).val();

	jQuery('.TotalSoft_GV_CP_Iframe').css({'transform':'translateX(-12000px)','-ms-transform': 'translateX(-12000px)', '-o-transform': 'translateX(-12000px)','-moz-transform': 'translateX(-12000px)','-webkit-transform': 'translateX(-12000px)'});
	jQuery('.TotalSoft_GV_CP_TD h2').css({'transform':'translateX(12000px)','-ms-transform': 'translateX(12000px)', '-o-transform': 'translateX(12000px)','-moz-transform': 'translateX(12000px)','-webkit-transform': 'translateX(12000px)'});
	jQuery('.TotalSoft_GV_CP_TD p').css({'transform':'translateX(12000px)','-ms-transform': 'translateX(12000px)', '-o-transform': 'translateX(12000px)','-moz-transform': 'translateX(12000px)','-webkit-transform': 'translateX(12000px)'});
	jQuery('.TotalSoft_GV_CP_TD h3').css({'transform':'translateX(12000px)','-ms-transform': 'translateX(12000px)', '-o-transform': 'translateX(12000px)','-moz-transform': 'translateX(12000px)','-webkit-transform': 'translateX(12000px)'});

	var ajaxurl = object.ajaxurl;
	var data = {
	action: 'TotalSoftGallery_Video_CP_Popup_Right', // wp_ajax_my_action / wp_ajax_nopriv_my_action in ajax.php. Can be named anything.
	foobar: TotalSoft_GV_CP_VID, // translates into $_POST['foobar'] in PHP
	};
	jQuery.post(ajaxurl, data, function(response) {
		var b=Array();
		var a=response.split('=>');
		for(var i=1;i<a.length;i++)
		{ b[b.length]=a[i].split('[')[0].trim(); }
		b[b.length-1]=b[b.length-1].split(')')[0].trim();

		jQuery('#TotalSoft_GV_CP_VID_'+TotalSoftGV_CP_ID).val(b[0]);
		jQuery('.TotalSoft_GV_CP_Iframe iframe').attr('src',b[5]);
		jQuery('.TotalSoft_GV_CP_TD h2').html(b[1]);
		jQuery('.TotalSoft_GV_CP_TD p').html(b[2]);

		setTimeout(function(){
			jQuery('.TotalSoft_GV_CP_Pop_Icons').animate({'height':'40px',},500);
			if(b[3])
			{
				jQuery('.TotalSoft_GV_CP_TD h3 a').attr('href',b[3]);
				jQuery('.TotalSoft_GV_CP_TD h3').css({'transform':'translateX(0px)','-ms-transform': 'translateX(0px)', '-o-transform': 'translateX(0px)','-moz-transform': 'translateX(0px)','-webkit-transform': 'translateX(0px)'});
			}
			jQuery('.TotalSoft_GV_CP_Iframe').css({'transform':'translateX(0px)','-ms-transform': 'translateX(0px)', '-o-transform': 'translateX(0px)','-moz-transform': 'translateX(0px)','-webkit-transform': 'translateX(0px)'});
			jQuery('.TotalSoft_GV_CP_TD h2').css({'transform':'translateX(0px)','-ms-transform': 'translateX(0px)', '-o-transform': 'translateX(0px)','-moz-transform': 'translateX(0px)','-webkit-transform': 'translateX(0px)'});
			jQuery('.TotalSoft_GV_CP_TD p').css({'transform':'translateX(0px)','-ms-transform': 'translateX(0px)', '-o-transform': 'translateX(0px)','-moz-transform': 'translateX(0px)','-webkit-transform': 'translateX(0px)'});
		},500)
	})
}
function Total_Soft_GV_HLG_Page(TotalSoftGV_ID, TotalSoftPage, TotalSoftPP, TotalSoftCV)
{
	for(i=1;i<=TotalSoftCV;i++)
	{
		if(i>TotalSoftPP*(TotalSoftPage-1) && i<=TotalSoftPP*TotalSoftPage)
		{
			jQuery('#TotalSoft_GV_HLG_'+TotalSoftGV_ID+'_'+i).show();
		}
		else
		{
			jQuery('#TotalSoft_GV_HLG_'+TotalSoftGV_ID+'_'+i).hide();
		}
	}

	jQuery('.pagination li').each(function(){
		jQuery(this).find('span').removeClass('active');
	})
	jQuery('#TotalSoft_GV_HLG_PLi_'+TotalSoftGV_ID+'_'+TotalSoftPage).find('span').addClass('active');
}
function Total_Soft_GV_HLG_PageP(TotalSoftGV_ID, TotalSoftPP, TotalSoftCV)
{
	var TotalSoftPage='';
	jQuery('.pagination li').each(function(){
		if(jQuery(this).find('span').hasClass('active'))
		{
			if(jQuery(this).find('span').html()!='1')
			{
				TotalSoftPage=parseInt(parseInt(jQuery(this).find('span').html())-1);
				Total_Soft_GV_HLG_Page(TotalSoftGV_ID, TotalSoftPage, TotalSoftPP, TotalSoftCV);
			}
		}
	})
}
function Total_Soft_GV_HLG_PageN(TotalSoftGV_ID, TotalSoftPP, TotalSoftCV, TotalSoftPC)
{
	var TotalSoftPage='';
	jQuery('.pagination li').each(function(){
		if(jQuery(this).find('span').hasClass('active'))
		{
			if(jQuery(this).find('span').html()!=TotalSoftPC)
			{
				TotalSoftPage=parseInt(parseInt(jQuery(this).find('span').html())+1);
				Total_Soft_GV_HLG_Page(TotalSoftGV_ID, TotalSoftPage, TotalSoftPP, TotalSoftCV);
				return false;
			}
		}
	})
}
function Total_Soft_GV_HLG_PageLM(TotalSoftGV_ID, TotalSoftPP, TotalSoftCV, TotalSoftPC)
{
	var TotalSoftPage=parseInt(parseInt(jQuery('#TotalSoft_VG_HLG_Page_'+TotalSoftGV_ID).val())+1);
	jQuery('#TotalSoft_VG_HLG_Page_'+TotalSoftGV_ID).val(TotalSoftPage);
	
	if(TotalSoftPage<=TotalSoftPC)
	{
		for(i=1;i<=TotalSoftCV;i++)
		{
			if(i<=TotalSoftPP*TotalSoftPage)
			{
				jQuery('#TotalSoft_GV_HLG_'+TotalSoftGV_ID+'_'+i).show(500);
			}
			else
			{
				jQuery('#TotalSoft_GV_HLG_'+TotalSoftGV_ID+'_'+i).hide(500);
			}
		}
	}
	else
	{
		jQuery('#TotalSoft_VG_HLG_PageDiv_'+TotalSoftGV_ID).hide(500);
	}				
}




function Total_Soft_GV_FG_Page(TotalSoftGV_ID, TotalSoftPage, TotalSoftPP, TotalSoftCV)
{
	for(i=1;i<=TotalSoftCV;i++)
	{
		if(i>TotalSoftPP*(TotalSoftPage-1) && i<=TotalSoftPP*TotalSoftPage)
		{
			jQuery('#TotalSoft_GV_FG_'+TotalSoftGV_ID+'_'+i).show();
		}
		else
		{
			jQuery('#TotalSoft_GV_FG_'+TotalSoftGV_ID+'_'+i).hide();
		}
	}

	jQuery('.pagination li').each(function(){
		jQuery(this).find('span').removeClass('active');
	})
	jQuery('#TotalSoft_GV_FG_PLi_'+TotalSoftGV_ID+'_'+TotalSoftPage).find('span').addClass('active');
}
function Total_Soft_GV_FG_PageP(TotalSoftGV_ID, TotalSoftPP, TotalSoftCV)
{
	var TotalSoftPage='';
	jQuery('.pagination li').each(function(){
		if(jQuery(this).find('span').hasClass('active'))
		{
			if(jQuery(this).find('span').html()!='1')
			{
				TotalSoftPage=parseInt(parseInt(jQuery(this).find('span').html())-1);
				Total_Soft_GV_FG_Page(TotalSoftGV_ID, TotalSoftPage, TotalSoftPP, TotalSoftCV);
			}
		}
	})
}
function Total_Soft_GV_FG_PageN(TotalSoftGV_ID, TotalSoftPP, TotalSoftCV, TotalSoftPC)
{
	var TotalSoftPage='';
	jQuery('.pagination li').each(function(){
		if(jQuery(this).find('span').hasClass('active'))
		{
			if(jQuery(this).find('span').html()!=TotalSoftPC)
			{
				TotalSoftPage=parseInt(parseInt(jQuery(this).find('span').html())+1);
				Total_Soft_GV_FG_Page(TotalSoftGV_ID, TotalSoftPage, TotalSoftPP, TotalSoftCV);
				return false;
			}
		}
	})
}
function Total_Soft_GV_FG_PageLM(TotalSoftGV_ID, TotalSoftPP, TotalSoftCV, TotalSoftPC)
{
	var TotalSoftPage=parseInt(parseInt(jQuery('#TotalSoft_VG_FG_Page_'+TotalSoftGV_ID).val())+1);
	jQuery('#TotalSoft_VG_FG_Page_'+TotalSoftGV_ID).val(TotalSoftPage);
	
	if(TotalSoftPage<=TotalSoftPC)
	{
		for(i=1;i<=TotalSoftCV;i++)
		{
			if(i<=TotalSoftPP*TotalSoftPage)
			{
				jQuery('#TotalSoft_GV_FG_'+TotalSoftGV_ID+'_'+i).show(500);
			}
			else
			{
				jQuery('#TotalSoft_GV_FG_'+TotalSoftGV_ID+'_'+i).hide(500);
			}
		}
	}
	else
	{
		jQuery('#TotalSoft_VG_FG_PageDiv_'+TotalSoftGV_ID).hide(500);
	}				
}
// Parallax Engine
function Total_Soft_GV_PE_Page(TotalSoftGV_ID, TotalSoftPage, TotalSoftPP, TotalSoftCV)
{
	for(i=1;i<=TotalSoftCV;i++)
	{
		if(i>TotalSoftPP*(TotalSoftPage-1) && i<=TotalSoftPP*TotalSoftPage)
		{
			jQuery('#TotalSoft_GV_PE_'+TotalSoftGV_ID+'_'+i).show();
		}
		else
		{
			jQuery('#TotalSoft_GV_PE_'+TotalSoftGV_ID+'_'+i).hide();
		}
	}

	jQuery('.pagination li').each(function(){
		jQuery(this).find('span').removeClass('active');
	})
	jQuery('#TotalSoft_GV_PE_PLi_'+TotalSoftGV_ID+'_'+TotalSoftPage).find('span').addClass('active');
}
function Total_Soft_GV_PE_PageP(TotalSoftGV_ID, TotalSoftPP, TotalSoftCV)
{
	var TotalSoftPage='';
	jQuery('.pagination li').each(function(){
		if(jQuery(this).find('span').hasClass('active'))
		{
			if(jQuery(this).find('span').html()!='1')
			{
				TotalSoftPage=parseInt(parseInt(jQuery(this).find('span').html())-1);
				Total_Soft_GV_PE_Page(TotalSoftGV_ID, TotalSoftPage, TotalSoftPP, TotalSoftCV);
			}
		}
	})
}
function Total_Soft_GV_PE_PageN(TotalSoftGV_ID, TotalSoftPP, TotalSoftCV, TotalSoftPC)
{
	var TotalSoftPage='';
	jQuery('.pagination li').each(function(){
		if(jQuery(this).find('span').hasClass('active'))
		{
			if(jQuery(this).find('span').html()!=TotalSoftPC)
			{
				TotalSoftPage=parseInt(parseInt(jQuery(this).find('span').html())+1);
				Total_Soft_GV_PE_Page(TotalSoftGV_ID, TotalSoftPage, TotalSoftPP, TotalSoftCV);
				return false;
			}
		}
	})
}
function Total_Soft_GV_PE_PageLM(TotalSoftGV_ID, TotalSoftPP, TotalSoftCV, TotalSoftPC)
{
	var TotalSoftPage=parseInt(parseInt(jQuery('#TotalSoft_VG_PE_Page_'+TotalSoftGV_ID).val())+1);
	jQuery('#TotalSoft_VG_PE_Page_'+TotalSoftGV_ID).val(TotalSoftPage);
	
	if(TotalSoftPage<=TotalSoftPC)
	{
		for(i=1;i<=TotalSoftCV;i++)
		{
			if(i<=TotalSoftPP*TotalSoftPage)
			{
				jQuery('#TotalSoft_GV_PE_'+TotalSoftGV_ID+'_'+i).show(500);
			}
			else
			{
				jQuery('#TotalSoft_GV_PE_'+TotalSoftGV_ID+'_'+i).hide(500);
			}
		}
	}
	else
	{
		jQuery('#TotalSoft_VG_PE_PageDiv_'+TotalSoftGV_ID).hide(500);
	}				
}
// Classic Gallery
function Total_Soft_GV_CG_Page(TotalSoftGV_ID, TotalSoftPage, TotalSoftPP, TotalSoftCV)
{
	var GV_CG_Height = jQuery('.GV_CG_Height_'+TotalSoftGV_ID).css('height');
	for(i=1;i<=TotalSoftCV;i++)
	{
		if(i>TotalSoftPP*(TotalSoftPage-1) && i<=TotalSoftPP*TotalSoftPage)
		{
			// jQuery('#TS_GV_ClG_Div1_'+TotalSoftGV_ID+'_'+i).show(500);
			jQuery('#TS_GV_ClG_Div1_'+TotalSoftGV_ID+'_'+i).animate({'height': GV_CG_Height, 'padding': '0.5em'},1000);
			jQuery('#TS_GV_ClG_Div1_'+TotalSoftGV_ID+'_'+i).css({'display': 'inline-block'});
			jQuery('#TS_GV_ClG_Div1_'+TotalSoftGV_ID+'_'+i).addClass('GV_CG_Height_'+TotalSoftGV_ID);
		}
		else
		{
			// jQuery('#TS_GV_ClG_Div1_'+TotalSoftGV_ID+'_'+i).hide();
			jQuery('#TS_GV_ClG_Div1_'+TotalSoftGV_ID+'_'+i).animate({'height': '0', 'padding': '0'},500);
			jQuery('#TS_GV_ClG_Div1_'+TotalSoftGV_ID+'_'+i).css({'display': 'none'});
			jQuery('#TS_GV_ClG_Div1_'+TotalSoftGV_ID+'_'+i).removeClass('GV_CG_Height_'+TotalSoftGV_ID);
		}
	}

	jQuery('.TS_GV_ClG_Pagination_'+TotalSoftGV_ID+' li').each(function(){
		jQuery(this).find('span').removeClass('active');
	})
	jQuery('#TotalSoft_GV_CG_PLi_'+TotalSoftGV_ID+'_'+TotalSoftPage).find('span').addClass('active');
}
function Total_Soft_GV_CG_PageP(TotalSoftGV_ID, TotalSoftPP, TotalSoftCV)
{
	var TotalSoftPage='';
	jQuery('.TS_GV_ClG_Pagination_'+TotalSoftGV_ID+' li').each(function(){
		if(jQuery(this).find('span').hasClass('active'))
		{
			if(jQuery(this).find('span').html()!='1')
			{
				TotalSoftPage=parseInt(parseInt(jQuery(this).find('span').html())-1);
				Total_Soft_GV_CG_Page(TotalSoftGV_ID, TotalSoftPage, TotalSoftPP, TotalSoftCV);
			}
		}
	})
}
function Total_Soft_GV_CG_PageN(TotalSoftGV_ID, TotalSoftPP, TotalSoftCV, TotalSoftPC)
{
	var TotalSoftPage='';
	jQuery('.TS_GV_ClG_Pagination_'+TotalSoftGV_ID+' li').each(function(){
		if(jQuery(this).find('span').hasClass('active'))
		{
			if(jQuery(this).find('span').html()!=TotalSoftPC)
			{
				TotalSoftPage=parseInt(parseInt(jQuery(this).find('span').html())+1);
				Total_Soft_GV_CG_Page(TotalSoftGV_ID, TotalSoftPage, TotalSoftPP, TotalSoftCV);
				return false;
			}
		}
	})
}
function Total_Soft_GV_CG_PageLM(TotalSoftGV_ID, TotalSoftPP, TotalSoftCV, TotalSoftPC)
{
	var TotalSoftPage=parseInt(parseInt(jQuery('#TotalSoft_VG_CG_Page_'+TotalSoftGV_ID).val())+1);
	jQuery('#TotalSoft_VG_CG_Page_'+TotalSoftGV_ID).val(TotalSoftPage);
	var GV_CG_Height = jQuery('.GV_CG_Height_'+TotalSoftGV_ID).css('height');
	
	if(TotalSoftPage<=TotalSoftPC)
	{
		for(i=1;i<=TotalSoftCV;i++)
		{
			if(i<=TotalSoftPP*TotalSoftPage && i > TotalSoftPP*parseInt(parseInt(TotalSoftPage)-1))
			{
				jQuery('#TS_GV_ClG_Div1_'+TotalSoftGV_ID+'_'+i).animate({'height': GV_CG_Height, 'padding': '0.5em'},500);
				jQuery('#TS_GV_ClG_Div1_'+TotalSoftGV_ID+'_'+i).css({'display': 'inline-block'});
			}
		}
		if(TotalSoftPage==TotalSoftPC)
		{
			jQuery('#TotalSoft_VG_CG_PageDiv_'+TotalSoftGV_ID).css('display','none');
		}
	}
	else
	{
		jQuery('#TotalSoft_VG_CG_PageDiv_'+TotalSoftGV_ID).css('display','none');
	}				
}
function TS_GV_ClG_Div_Full(id, num)
{
	jQuery('.TS_GV_ClG_Div_Full_'+id).animate({'width':'100%', 'height':'100%','top':'0','left':'0'},500);
	setTimeout(function(){
		jQuery('.TS_GV_ClG_Div_box_'+id).css({'display':'flex','display':'-webkit-flex'});
		jQuery('.TS_GV_ClG_Div_box_div1_'+id).css('display','none');
		jQuery('.TS_GV_ClG_Div_box_div1_'+id+'_'+num).css({'display':'block'});
		jQuery('.TS_GV_ClG_Div_Close_Icon_'+id).css({'display':'block'});
		var iframesource = jQuery('#TS_GV_ClG_Div2_Img_'+id+'_'+num).attr('alt');
		jQuery('.TS_GV_ClG_Div_box_div1_'+id+'_'+num+' iframe').attr('src',iframesource);
	},500)
}
function TS_GV_ClG_Div_Full_Cl(id)
{
	jQuery('.TS_GV_ClG_Div_box_'+id).css({'display':'none'});
	jQuery('.TS_GV_ClG_Div_box_div1_'+id).css('display','none');
	jQuery('.TS_GV_ClG_Div_box_div1_'+id+' iframe').attr('src','');
	jQuery('.TS_GV_ClG_Div_Close_Icon_'+id).css({'display':'none'});
	jQuery('.TS_GV_ClG_Div_Full_'+id).animate({'width':'0%', 'height':'0%','top':'50%','left':'50%'},500);
}