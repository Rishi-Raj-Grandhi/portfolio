# Retro Game Portfolio

A retro-inspired portfolio website with classic 8-bit game aesthetics, built with React + Vite + Three.js. Features a clean, pixelated design with subtle 3D background animations.

## Features

- 🎨 Retro 8-bit game aesthetic with solid colors
- 🧭 Fixed navigation header with smooth scroll
- 🌌 Subtle 3D background animations (particles and geometric shapes)
- 📋 About section with education, experience, skills, and achievements
- 🧱 JSON-driven projects section with modal details
- 💬 Contact form with EmailJS integration
- 🔗 Social links section
- 🖼️ Hero section with portrait and side images
- 📱 Fully responsive design

## Setup

1. Install dependencies:
```bash
npm install
```

2. Add your images to `/public/`:
   - Place your portrait image at `/public/me.jpg`
   - Place left decoration image at `/public/left.jpg`
   - Place right decoration image at `/public/right.jpg`
   - Images will be automatically styled with pixel effects

3. Configure EmailJS (optional):
   - Sign up at [EmailJS](https://www.emailjs.com/)
   - Update the EmailJS configuration in `src/components/ContactForm.jsx`:
     - Replace `YOUR_PUBLIC_KEY` with your EmailJS public key
     - Replace `YOUR_SERVICE_ID` with your service ID
     - Replace `YOUR_TEMPLATE_ID` with your template ID

4. Update your information:
   - Edit `src/data/projects.json` to add your projects
   - Update `src/components/About.jsx` with your details
   - Update `src/components/SocialLinks.jsx` with your social media links
   - Update `src/App.jsx` hero section with your name and title

5. Run the development server:
```bash
npm run dev
```

## Project Structure

```
src/
  components/
    About.jsx                 # About section with education, experience, skills
    BackgroundAnimation.jsx   # 3D background particles and shapes
    ContactForm.jsx           # EmailJS contact form
    Navigation.jsx            # Fixed header navigation menu
    ProjectGrid.jsx           # Projects grid display
    ProjectModal.jsx          # Project detail modal
    SocialLinks.jsx           # Social media links
  data/
    projects.json             # Project data (JSON)
  App.jsx                     # Main app component
  main.jsx                    # Entry point
  styles.css                  # Retro game styles
```

## Color Palette

The portfolio uses a classic retro game color scheme with solid colors:

- Primary Green: `#4A7C59` (muted green)
- Secondary Blue: `#5B7FA6` (muted blue)
- Accent Red: `#B85450` (muted red)
- Accent Yellow: `#D4A574` (tan/yellow)
- Accent Brown: `#8B6F47` (brown)
- Off-white: `#E8E8E8`
- Dark Background: `#1A1A1A`
- Pure Black: `#000000`

## Technologies

- React 18
- Vite
- Three.js
- @react-three/fiber
- @emailjs/browser

## Browser Compatibility

Requires modern browsers with WebGL support for the 3D background animations.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## License

MIT
