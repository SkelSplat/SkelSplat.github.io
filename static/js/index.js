// index.js - cleaned and consolidated

window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 125;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + 'frame_' + String(i).padStart(6, '0') + '.png';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  if (!image) return;
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}

/* ---------- Carousel + DOM ready ---------- */
// Single initialization; ensure bulma-carousel script is included before this file.
$(document).ready(function() {
    // Navbar burger
    $(".navbar-burger").click(function() {
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");
    });

    // Options for the carousel — change slidesToShow to 1/3 for testing
    var carouselOptions = {
      slidesToScroll: 1,
      slidesToShow: 3,        // final desired setting
      loop: true,
      infinite: true,
      autoplay: false,
      autoplaySpeed: 3000,
      pagination: true,
      navigation: true,
      navigationKeys: true
    };

    // Attach the carousel to a specific selector (prefer ID for precision)
    // Make sure your HTML contains: <div id="results-carousel" class="carousel">...</div>
    try {
      var carousels = bulmaCarousel.attach('#results-carousel', carouselOptions);
      console.log('bulmaCarousel attach result:', carousels);

      // Optional: add an event listener for debugging
      if (carousels && carousels.length) {
        carousels.forEach(function(c) {
          c.on('before:show', function(state) { console.log('carousel before:show', state); });
        });
      } else {
        // If attach returned a single instance (older versions), it might not be an array:
        var el = document.querySelector('#results-carousel');
        if (el && el.bulmaCarousel) {
          el.bulmaCarousel.on('before-show', function(state) { console.log('carousel before-show', state); });
        } else {
          console.warn('bulmaCarousel: no instance found on #results-carousel');
        }
      }
    } catch (err) {
      console.error('Error initializing bulmaCarousel:', err);
    }

    // interpolation helpers
    preloadInterpolationImages();
    $('#interpolation-slider').on('input', function(event) {
      setInterpolationImage(this.value);
    });
    setInterpolationImage(0);
    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    // initialize bulmaSlider if used elsewhere
    if (typeof bulmaSlider !== 'undefined') {
      bulmaSlider.attach();
    }
});
