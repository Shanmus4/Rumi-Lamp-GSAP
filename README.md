# Lamp Cord Pull

Interact with a soothing, virtual lamp cord. Tug the string to toggle the light and switch the ambiance.

## Who is this for?
This project is for anyone who appreciates simple, satisfying interactive web elements. It's a great example of using SVG manipulation and physics-based animations to create a "tactile" digital experience.

## Technologies Used
- **HTML5**: The structure of the page.
- **CSS3 & Stylus**: Styling the scene and handling responsive backgrounds.
- **Vanilla JavaScript**: Controlling the logic.
- **GSAP (GreenSock Animation Platform)**: Powering the smooth, physics-based cord animations (MorphSVG, Draggable).
- **Vite**: A fast build tool for modern web development.

## How it Works
1.  **SVG Cord**: The cord is drawn using Scalable Vector Graphics (SVG).
2.  **Interaction**: We use GSAP's `Draggable` plugin to let you "grab" and pull an invisible hit area.
3.  **Animation**: When you pull, the cord stretches. When you release, it snaps back. If pulled far enough, it triggers the "switch" logic.
4.  **Morphing**: The cord visually "wobbles" using GSAP's `MorphSVGPlugin`, cycling through several pre-defined curved paths to simulate real string physics.
5.  **Dynamic Backgrounds**: The page background swaps between a dark "night" image and a bright "day" image depending on the state.

## Setup Instructions

1.  **Prerequisites**: Ensure you have [Node.js](https://nodejs.org/) installed on your computer.
2.  **Install Dependencies**:
    Open your terminal in the project folder and run:
    ```bash
    npm install
    ```
3.  **Run Locally**:
    Start the development server:
    ```bash
    npm run dev
    ```
4.  **View**: Open the local URL provided (usually `http://localhost:5173`) in your browser.

## Deployment
*(Placeholder: Instructions for deploying to Vercel/Netlify will go here)*

## Live Demo
[Link to Live Site] *(Placeholder)*

## Troubleshooting

-   **Cord stays stuck?** Refresh the page. Ensure regular JavaScript is enabled.
-   **Audio not playing?** Browsers block auto-playing audio until you interact with the page. Click or tap anywhere first.
-   **Background looks zoomed on mobile?** This is expected behavior to ensure the image covers the full height of the address bar area.
