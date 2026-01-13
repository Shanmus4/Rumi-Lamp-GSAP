const {
  gsap,
  MorphSVGPlugin,
  Draggable,
} = window;

gsap.registerPlugin(MorphSVGPlugin, Draggable);

// ============================================
// IMAGE PRELOADING
// ============================================
// Preload all 4 background images before allowing interaction
const IMAGES_TO_PRELOAD = [
  './Desktop View Lamp Off.png',
  './Desktop View Lamp On.png',
  './Mobile View Lamp Off.png',
  './Mobile View Lamp On.png',
];

let imagesLoaded = 0;
const totalImages = IMAGES_TO_PRELOAD.length;

function preloadImages() {
  return new Promise((resolve) => {
    IMAGES_TO_PRELOAD.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        imagesLoaded++;
        if (imagesLoaded === totalImages) {
          resolve();
        }
      };
      img.onerror = () => {
        imagesLoaded++;
        console.warn('Failed to preload:', src);
        if (imagesLoaded === totalImages) {
          resolve();
        }
      };
      img.src = src;
    });
  });
}

// ============================================
// AUDIO SETUP
// ============================================
const AUDIO = {
  CLICK: new Audio('https://assets.codepen.io/605876/click.mp3'),
  BUZZ: new Audio('https://assets.codepen.io/16327/flicker_1.mp3'), 
};

// Preload audio
AUDIO.BUZZ.load();
AUDIO.CLICK.load();

const STATE = {
  ON: false,
};

const CORD_DURATION = 0.1;

const CORDS = document.querySelectorAll('.toggle-scene__cord');
const HIT = document.querySelector('.toggle-scene__hit-spot');
const DUMMY = document.querySelector('.toggle-scene__dummy-cord');
const DUMMY_CORD = document.querySelector('.toggle-scene__dummy-cord line');
const PROXY = document.createElement('div');

// Set init position
// Note: We need to make sure these attributes exist. 
// In the HTML I created, x2/y2 are set on the line.
const ENDX = DUMMY_CORD.getAttribute('x2');
const ENDY = DUMMY_CORD.getAttribute('y2');

const RESET = () => {
  gsap.set(PROXY, {
    x: ENDX,
    y: ENDY,
  });
};

RESET();
// Explicitly hide dummy initially to prevent double cord glitch
gsap.set(DUMMY, { display: 'none' }); 
gsap.set(CORDS[0], { display: 'block' });

const CORD_TL = gsap.timeline({
  paused: true,
  onStart: () => {
    STATE.ON = !STATE.ON;
    
    // Update CSS Variable for color calculations
    gsap.set(document.documentElement, { '--on': STATE.ON ? 1 : 0 });
    
    // Elements for interaction
    const favicon = document.getElementById('favicon');
    const overlay = document.querySelector('.flicker-overlay');
    
    // Kill any existing flicker/buzz animations to prevent overlaps
    if (window.flickerTimeline) window.flickerTimeline.kill();
    gsap.killTweensOf(AUDIO.BUZZ);

    if (STATE.ON) {
      // Turning ON: Add class and simulate flicker
      document.body.classList.add('light-on');
      document.title = "Light is On";
      favicon.href = "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>☀️</text></svg>";

      // Play Sounds
      AUDIO.CLICK.currentTime = 0;
      AUDIO.CLICK.play().catch(e => console.log("Click fail", e));

      AUDIO.BUZZ.volume = 1;
      AUDIO.BUZZ.currentTime = 0;
      AUDIO.BUZZ.play().catch(e => console.log("Buzz failed - interaction needed?", e));

      // Flicker Effect logic using overlay opacity
      window.flickerTimeline = gsap.timeline({
        onComplete: () => {
          // Fade out buzz sound once light is steady
          gsap.to(AUDIO.BUZZ, { volume: 0, duration: 1.5, onComplete: () => {
            AUDIO.BUZZ.pause();
            AUDIO.BUZZ.volume = 1;
          }});
        }
      });
      window.flickerTimeline
        .set(overlay, { opacity: 0.6 })
        .set(overlay, { opacity: 0.1 }, "+=0.12") 
        .set(overlay, { opacity: 0.7 }, "+=0.08") 
        .set(overlay, { opacity: 0.65 }, "+=0.15")
        .set(overlay, { opacity: 0.2 }, "+=0.08")
        .set(overlay, { opacity: 0 }, "+=0.2"); 

    } else {
      // Turning OFF: Immediate
      document.body.classList.remove('light-on');
      document.title = "Light is Off";
      favicon.href = "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌑</text></svg>";
      
      // Stop Buzz immediately if turning off
      AUDIO.BUZZ.pause();
      AUDIO.BUZZ.currentTime = 0;
      AUDIO.BUZZ.volume = 1;

      AUDIO.CLICK.currentTime = 0;
      AUDIO.CLICK.play().catch(e => console.log("Click fail", e));
      
      // Ensure overlay is hidden
      gsap.set(overlay, { opacity: 0 });
    }

    // Initial state setup for animation start
    gsap.set([DUMMY, HIT], { display: 'none' });
    gsap.set(CORDS[0], { display: 'block' });
  },
  onComplete: () => {
    // When wobbling finishes, return to rest state
    gsap.set([DUMMY, HIT], { display: 'block' });
    gsap.set(CORDS[0], { display: 'block' }); // Keep static cord visible
    gsap.set(DUMMY, { display: 'none' }); // Ensure dummy is hidden until next drag
    RESET();
  },
});

for (let i = 1; i < CORDS.length; i++) {
  CORD_TL.add(
    gsap.to(CORDS[0], {
      morphSVG: CORDS[i],
      duration: CORD_DURATION,
      repeat: 1,
      yoyo: true,
    })
  );
}

Draggable.create(PROXY, {
  trigger: HIT,
  type: 'x,y',
  onPress: (e) => {
    startX = e.x || e.clientX;
    startY = e.y || e.clientY;
    // Hide the stationary cord immediately so we don't see two cords
    gsap.set(CORDS[0], { display: 'none' }); 
    gsap.set(DUMMY, { display: 'block' });
  },
  onDrag: function() {
    // Restrict pull distance to max 200 units from origin
    const MAX_PULL = 200;
    const originX = parseFloat(ENDX);
    const originY = parseFloat(ENDY);
    
    let newX = this.x;
    let newY = this.y;
    
    // Calculate distance from origin
    const dx = newX - originX;
    const dy = newY - originY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // If beyond max, clamp to max distance in same direction
    if (distance > MAX_PULL) {
      const ratio = MAX_PULL / distance;
      newX = originX + dx * ratio;
      newY = originY + dy * ratio;
    }
    
    gsap.set(DUMMY_CORD, {
      attr: {
        x2: newX,
        y2: newY,
      },
    });
  },
  onRelease: function(e) {
    // Use the event coordinates to calculate distance travelled by pointer
    const currentX = e.x || e.clientX;
    const currentY = e.y || e.clientY;
    const DISTX = Math.abs(currentX - startX);
    const DISTY = Math.abs(currentY - startY);
    const TRAVELLED = Math.sqrt(DISTX * DISTX + DISTY * DISTY);
    
    gsap.to(DUMMY_CORD, {
      attr: { x2: ENDX, y2: ENDY },
      duration: CORD_DURATION,
      onComplete: () => {
        if (TRAVELLED > 50) {
          CORD_TL.restart();
        } else {
          // If not pulled enough, snap back and show the stationary cord again
          RESET();
          gsap.set(DUMMY, { display: 'none' });
          gsap.set(CORDS[0], { display: 'block' });
        }
      },
    });
  },
});

// Calculate distance of "tug"
let startX;
let startY;

// ============================================
// INITIALIZE AFTER PRELOAD
// ============================================
// Start preloading images immediately
preloadImages().then(() => {
  console.log('All background images preloaded!');
  // Remove any loading state if we add one later
  document.body.classList.add('images-loaded');
});
