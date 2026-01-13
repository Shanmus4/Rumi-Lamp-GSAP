# Rumi Lamp GSAP 🌑☀️

A calm, interactive lamp cord pull experience. Tug the cord to toggle the light and enjoy the vibe.

**[🔗 Live Demo](https://shanmus4.github.io/Rumi-Lamp-GSAP/)**

---

## Who is this for?

This project is for anyone who appreciates simple, satisfying interactive web elements. It's a great example of using SVG manipulation and physics-based animations to create a "tactile" digital experience. Perfect for:
- Developers learning GSAP animations
- Designers exploring micro-interactions
- Anyone who just wants a moment of calm

---

## Technologies Used

| Technology | Purpose |
|------------|---------|
| **HTML5** | Page structure |
| **CSS3** | Styling, responsive backgrounds |
| **Vanilla JavaScript** | Core logic |
| **GSAP** | Smooth animations (MorphSVG, Draggable) |
| **Vite** | Fast dev server & build tool |

---

## How it Works

1. **SVG Cord**: The pull cord is drawn using Scalable Vector Graphics (SVG).
2. **Drag Interaction**: GSAP's `Draggable` plugin lets you grab and pull the cord's hit area.
3. **Snap Back**: When released, the cord snaps back with smooth easing. If pulled far enough, it triggers the switch.
4. **Morph Animation**: The cord "wobbles" using `MorphSVGPlugin`, cycling through curved paths to simulate real string physics.
5. **Flicker Effect**: When turning on, the light flickers (40% → 65% → 100%) with matching buzz sound.
6. **Dynamic Backgrounds**: Desktop and mobile have different background images that swap based on light state.

---

## Features

- ✅ Realistic cord pull animation
- ✅ Light flicker effect with sound
- ✅ Dynamic favicon (🌑/☀️) and page title
- ✅ Responsive design (desktop + mobile)
- ✅ Pull distance restriction
- ✅ Image preloading for smooth experience

---

## Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your computer

### Installation

```bash
# Clone the repository
git clone https://github.com/Shanmus4/Rumi-Lamp-GSAP.git

# Navigate to project folder
cd Rumi-Lamp-GSAP

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

---

## Live Demo

**[https://shanmus4.github.io/Rumi-Lamp-GSAP/](https://shanmus4.github.io/Rumi-Lamp-GSAP/)**

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| **Cord not visible?** | Refresh the page. Ensure JavaScript is enabled. |
| **Audio not playing?** | Browsers block auto-play. Click/tap anywhere first. |
| **Background looks zoomed on mobile?** | This is intentional - ensures full coverage on all devices. |
| **Light turns on without flicker?** | Check browser console for errors. Try a different browser. |

---

## Project Structure

```
Rumi-Lamp-GSAP/
├── index.html          # Main HTML with SVG cord
├── style.css           # All styles (responsive, animations)
├── main.js             # GSAP logic, sound, interactions
├── vite.config.js      # Vite build configuration
├── package.json        # Dependencies and scripts
├── resources/          # Background images
│   ├── Desktop View Lamp Off.png
│   ├── Desktop View Lamp On.png
│   ├── Mobile View Lamp Off.png
│   └── Mobile View Lamp On.png
└── README.md           # This file
```

---

## Credits

- GSAP animation library by GreenSock
- Sound effects from CodePen assets
- Original concept inspired by [Jhey Tompkins](https://codepen.io/jh3y)

---

## License

MIT License - feel free to use and modify!
