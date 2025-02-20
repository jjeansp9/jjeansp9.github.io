/*
	Prologue by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$nav = $('#nav');

		// 페이지가 완전히 로드되었을 때 실행 (jQuery 사용)
		// $window.on('load', function() {
		// 	setTimeout(function() {
		// 	  // jQuery로 숨기고 보이기
		// 	  $('#loading').hide();
		// 	  $('#main').show();
		// 	}, 1000); // 1초 지연 후 실행
		//   });

	// Breakpoints.
		breakpoints({
			wide:      [ '961px',  '1880px' ],
			normal:    [ '961px',  '1620px' ],
			narrow:    [ '961px',  '1320px' ],
			narrower:  [ '737px',  '960px'  ],
			mobile:    [ null,     '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

		document.addEventListener('DOMContentLoaded', () => {
			const timelineItems = document.querySelectorAll('.timeline-item');
			const observerOptions = {
			  threshold: 0.1
			};
		  
			const observer = new IntersectionObserver((entries, observer) => {
			  entries.forEach(entry => {
				if (entry.isIntersecting) {
				  entry.target.classList.add('visible');
				  observer.unobserve(entry.target);
				}
			  });
			}, observerOptions);
		  
			timelineItems.forEach(item => {
			  observer.observe(item);
			});
		  });

	// Nav.
		var $nav_a = $nav.find('a');

		$nav_a
			.addClass('scrolly')
			.on('click', function(e) {

				var $this = $(this);

				// External link? Bail.
					if ($this.attr('href').charAt(0) != '#')
						return;

				// Prevent default.
					e.preventDefault();

				// Deactivate all links.
					$nav_a.removeClass('active');

				// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
					$this
						.addClass('active')
						.addClass('active-locked');

			})
			.each(function() {

				var	$this = $(this),
					id = $this.attr('href'),
					$section = $(id);

				// No section for this link? Bail.
					if ($section.length < 1)
						return;

				// Scrollex.
					$section.scrollex({
						mode: 'middle',
						top: '-10vh',
						bottom: '-10vh',
						initialize: function() {

							// Deactivate section.
								$section.addClass('inactive');

						},
						enter: function() {

							// Activate section.
								$section.removeClass('inactive');

							// No locked links? Deactivate all links and activate this section's one.
								if ($nav_a.filter('.active-locked').length == 0) {

									$nav_a.removeClass('active');
									$this.addClass('active');

								}

							// Otherwise, if this section's link is the one that's locked, unlock it.
								else if ($this.hasClass('active-locked'))
									$this.removeClass('active-locked');

						}
					});
			});

	// Scrolly.
		$('.scrolly').scrolly();

	// Header (narrower + mobile).

		// Toggle.
			$(
				'<div id="headerToggle">' +
					'<a href="#header" class="toggle"></a>' +
				'</div>'
			)
				.appendTo($body);

		// Header.
			$('#header')
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'header-visible'
				});

				// 스크롤 이벤트 감지
				$(window).on('scroll', function() {
					console.log("Scroll event triggered!"); // 스크롤 이벤트가 발생하는지 확인
					animateOnScroll('#about');
					animateOnScroll('#skill');
					animateOnScroll('#portfolio');
					animateOnScroll('#contact');
				});
			
				// 애니메이션 함수
				function animateOnScroll(sectionId) {
					var section = $(sectionId);
					var sectionTop = section.offset().top;
					var sectionBottom = sectionTop + section.outerHeight();
					var scrollTop = $(window).scrollTop();
					var windowHeight = $(window).height();
			
					console.log(`Section: ${sectionId}, ScrollTop: ${scrollTop}, SectionTop: ${sectionTop}, SectionBottom: ${sectionBottom}`); // 각 섹션의 위치 확인
			
					// 섹션이 화면에 보일 때 애니메이션 적용
					if (scrollTop + windowHeight > sectionTop && scrollTop < sectionBottom) {
						console.log(`${sectionId} is visible!`); // 섹션이 보일 때 로그 출력
						section.find('.container').addClass('section-visible');
					} else {
						section.find('.container').removeClass('section-visible');
					}
				}

})(jQuery);