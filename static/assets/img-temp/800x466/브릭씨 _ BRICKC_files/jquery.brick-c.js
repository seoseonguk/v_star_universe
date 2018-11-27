$(document).ready(function() {

	var BRICK = {};

	BRICK.EM = BRICK.EM || $({});
	BRICK.WINDOW = $(window);
	BRICK.isMobile = false;

	BRICK.Events = {
		RESIZED: "RESIZED",
		SCROLL: "scroll",
		RESIZE: "resize"
	}

	BRICK.Resize = {
		$window: null,

		init: function() {
			this.onResize();
			BRICK.WINDOW.on( BRICK.Events.RESIZE, $.proxy(this.onResize, this));
		},

		kill: function() {
			BRICK.WINDOW.off( BRICK.Events.RESIZE, $.proxy(this.onResize, this));
		},

		onResize: function() {
			// console.log('resize.onResize');
			BRICK.WIDTH = BRICK.WINDOW.width();
			BRICK.HEIGHT = BRICK.WINDOW.height();

			if (BRICK.WIDTH > 750)
				BRICK.isMobile = false;
			else
				BRICK.isMobile = true;

			BRICK.EM.trigger( BRICK.Events.RESIZED );
		}
	}


	BRICK.Home = {
		init: function() {
			var vids = $("video"); 
			$.each(vids, function(){
				this.controls = false; 
			});

			$('.section-home dd.video a').click(function() {
				var top = $('.section-06').offset().top;
				$('html, body').animate({scrollTop: top}, 1000, 'easeInOutExpo');
				return false;
			});

			$('.download a').click(function() {
				if (BRICK.Devices.Android) {
					window.open($('.store .google').attr('href'));
				} else if (BRICK.Devices.iOS) {
					window.open($('.store .apple').attr('href'));
				} else {
					alert('Android와 iOS 환경에서 다운받을 수 있습니다.');
				}
				return false;
			});

			if ($.cookie && !$.cookie('modal')) {
				$('#modal input').iCheck({
					checkboxClass: 'icheckbox_square-white',
					radioClass: 'iradio_square-white',
					increaseArea: '0%'
				}).on('ifChecked', function() {
					$.cookie('modal', 'y', { path: '/', expires: 1 });
					$('#modal .fancybox-close-small').trigger('click');
				});

				$('.btn-fancybox').trigger('click');
			}

			if (!BRICK.isMobile)
				document.getElementById("video").play();

		}
	}

	BRICK.HeaderScroll = {
		didScroll: false,
		lastScrollTop: 0,
		delta: 5,
		_timer: null,
		height: '',
		$wrap: null,
		$header: null,
		$headerBg: null,

		init: function() {
			var self = this;

			this.$wrap = $('.site-wrap');
			this.$headerBg = $('.header-bg');
			this.height = this.$wrap.height();
			BRICK.WINDOW.on( BRICK.Events.SCROLL, $.proxy( this.onScroll, this ) );

			self._timer = setInterval(function() {
				if (self.didScroll) {
					self.hasScrolled.call(this, self);
					self.didScroll = false;
				}
	        }, 250);
		},

		kill: function() {
			BRICK.WINDOW.off( BRICK.Events.SCROLL, $.proxy( this.onScroll, this ) );

			clearInterval( this._timer );
		},

		onScroll: function(e) {
			this.didScroll = true;
		},

		hasScrolled: function(parent) {

			var self = parent;

			var top = $(this).scrollTop();
	
			// 지정된 값 이상으로 스크롤 하는지 체크
			// if ( Math.abs( self.lastScrollTop - top ) <= self.delta )
			// 	return ;

			// if ( top > self.lastScrollTop && top > self.height ) {
			// 	// Scroll Down
			// 	self.$wrap.addClass('fix');

			// } else {
			// 	// Scroll Up
			// 	if ( top + $(window).height() < $(document).height() ) {
			// 		self.$wrap.removeClass('fix');
			// 	}
			// }

			// self.lastScrollTop = top;


			if (top > 100) {

				if (BRICK.isMobile)
					self.$wrap.addClass('fix');
				else
					self.$headerBg.fadeIn();
			} else {
				
				if (BRICK.isMobile)
					self.$wrap.removeClass('fix');
				else
					self.$headerBg.fadeOut();
			}

		}
	}

	BRICK.Scroll = {

		offset: 0,
		offsets: null,
		targets: null,
		$selector: [],

		init: function() {

			var self = this;
			// this.$body = $('body');
			// self.$selector = ['.section-home','.section-photo', '.section-rank', '.section-tip', '.section-flag', '.section-camera', '.section-trophy'];



			$('.section > div').each(function(i) {
				self.$selector[i] = $(this);//'.' + (this.className.match(/(section-(?:[a-z0-9])+)/g));

			});


			this.onResized();
			BRICK.EM.on( BRICK.Events.RESIZED, $.proxy( this.onResized, this ));

			BRICK.WINDOW.on( BRICK.Events.SCROLL, $.proxy( this.onScroll, this ));
		},

		kill: function() {
			BRICK.WINDOW.off( BRICK.Events.SCROLL, $.proxy( this.onScroll, this ));
		},

		onResized: function(e) {

			var self = this;

			var offsets = Math.round($(window).height()/1.5);

			self.offsets = $([]);
            self.targets = $([]);

            $.map(self.$selector, function(selector, i) {
				var $el = $(selector);
				var top = Math.round( $el.offset().top ) - offsets;

				self.offsets.push( top );
				self.targets.push( $el );
			});
			
		},

		onScroll: function(e) {
			var self = this;

            for (i = self.offsets.length; i--;) {
            	self.checkScroll( self.offsets[i], self.targets[i], "show");
            }

		},

		checkScroll: function( limit, $el, className ) {
			var currentScrollPos = $(document).scrollTop();

			if (currentScrollPos > limit) {
				$el.addClass(className);
			} else {
				$el.removeClass(className);
			}
		}

	}

	BRICK.Carousel = {
		config: {},

		init: function() {
			this.config = {
				brand: {
					margin: 50,
					nav: false,
					dots: false,
					items: 3,
					responsive:{
						0:{
							margin: 20,
							center: true,
							items: 1.25
						},
						750:{
							margin: 50,
							center: false,
							items: 3
						}
					},
					responsiveRefreshRate: 0
				},
				interview: {
					margin: 50,
					nav: false,
					dots: false,
					items: 3,
					responsive:{
						0:{
							margin: 20,
							center: true,
							items: 1.25
						},
						750:{
							margin: 50,
							center: false,
							items: 3
						}
					},
					responsiveRefreshRate: 0
				},

				phone: {
					margin: 0,
					nav: false,
					dots: false,
					items: 1,
					mouseDrag: false,
					touchDrag: false
				},

				media: {
					margin: 60,
					nav: false,
					dots: false,
					items: 3,
					responsive:{
						0:{
							margin: 0,
							items: 3,
							mouseDrag: false,
							touchDrag: false
						},
						750:{
							margin: 50,
							items: 3,
							mouseDrag: true,
							touchDrag: true
						}
					},
					responsiveRefreshRate: 0
				}
			}

			this.create();
		},

		create: function() {
			$.each(this.config, function(target, config) {
				var $element = $('.owl-' + target),
					$carousel = $element.find('.owl-carousel'),
					$carouselNav = $element.find('.owl-carousel-nav > div');

				$carousel.on('initialized.owl.carousel changed.owl.carousel refreshed.owl.carousel', function (event) {

					if (!event.namespace) return;
					var carousel = event.relatedTarget,
						element = event.target,
						current = carousel.current();
					
					if (target === "phone")
						$('.text-message > div', $element).hide().eq(current).show();

					$('.owl-next', $element).toggleClass('disabled', current === carousel.maximum());
					$('.owl-prev', $element).toggleClass('disabled', current === carousel.minimum());

				}).owlCarousel(config);

				$carouselNav.on('click', function() {
					var dur = $(this).data('nav');

					$carousel.trigger(dur + '.owl.carousel');
				});

			});
		}
	}


	BRICK.Devices = {
	    Android: (function() {
	        return navigator.userAgent.match(/Android/i);
	    })(),
	    BlackBerry: (function() {
	        return navigator.userAgent.match(/BlackBerry/i);
	    })(),
	    iOS: (function() {
	        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	    })(),
	    Opera: (function() {
	        return navigator.userAgent.match(/Opera Mini/i);
	    })(),
	    Windows: (function() {
	        return navigator.userAgent.match(/IEMobile/i);
	    })()
	    // any: (function() {
	    //     return (BRICK.Devices.Android || BRICK.Devices.BlackBerry || BRICK.Devices.iOS || BRICK.Devices.Opera || BRICK.Devices.Windows);
	    // })()
	};

	BRICK.Home.init();
	BRICK.Resize.init();
	BRICK.Scroll.init();
	BRICK.HeaderScroll.init();
	BRICK.Carousel.init();
})