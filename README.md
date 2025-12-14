# Retro Music-Reactive 3D Portfolio

A retro-inspired, music-reactive 3D portfolio prototype built with React + Vite + Three.js.

## Features

- 🎨 Retro pixel/arcade game aesthetic
- 🎧 Random music player with track switching
- 🌌 Global music-reactive particle background
- 🔮 Three scroll-activated 3D visualizers
- 🧱 JSON-driven projects section
- 💬 Contact form with EmailJS
- 🔗 Social links section
- 🖼️ Pixelated portrait hero section

## Setup

1. Install dependencies:
```bash
npm install
```

2. Add music files to `/public/music/`:
   - Place your MP3 files in the `public/music/` directory
   - Name them: `track1.mp3`, `track2.mp3`, `track3.mp3`
   - Or update the track list in `src/components/AudioProvider.jsx`

3. Add your portrait image:
   - Place your image at `/public/me.jpg`
   - The image will be automatically pixelated with CSS

4. Configure EmailJS (optional):
   - Sign up at [EmailJS](https://www.emailjs.com/)
   - Update the EmailJS configuration in `src/components/ContactForm.jsx`:
     - Replace `YOUR_PUBLIC_KEY` with your EmailJS public key
     - Replace `YOUR_SERVICE_ID` with your service ID
     - Replace `YOUR_TEMPLATE_ID` with your template ID

5. Update social links:
   - Edit the URLs in `src/components/SocialLinks.jsx`

6. Run the development server:
```bash
npm run dev
```

## Project Structure

```
src/
  components/
    AudioProvider.jsx      # Global audio context and analyzer
    MusicPlayer.jsx        # Play/pause button
    ToggleNextTrack.jsx    # Next track button
    BackgroundParticles.jsx # Music-reactive particle background
    ContactForm.jsx        # EmailJS contact form
    SocialLinks.jsx        # Social media links
    ProjectGrid.jsx        # Projects grid display
    ProjectModal.jsx       # Project detail modal
  visualizers/
    SphereVisualizer.jsx   # Retro neon sphere
    ParticleVisualizer.jsx # Pixel cloud visualizer
    BarsVisualizer.jsx     # Equalizer grid
  data/
    projects.json          # Project data
  App.jsx                  # Main app component
  main.jsx                 # Entry point
  styles.css              # Retro pixel styles
```

## Color Palette

- Neon Green: `#6CFF47`
- Retro Cyan: `#32FFE8`
- Magenta: `#FF40C1`
- Pixel Yellow: `#FFD447`
- Off-white: `#F5F5F5`
- Dark Background: `#0A0A0A`

## Technologies

- React 18
- Vite
- Three.js
- @react-three/fiber
- @react-three/drei
- @emailjs/browser

## Browser Compatibility

Requires modern browsers with Web Audio API and WebGL support.

## License

MIT

