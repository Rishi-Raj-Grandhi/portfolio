import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { AudioProvider } from './components/AudioProvider'
import MusicPlayer from './components/MusicPlayer'
import ToggleNextTrack from './components/ToggleNextTrack'
import BackgroundParticles from './components/BackgroundParticles'
import SphereVisualizer from './visualizers/SphereVisualizer'
import ParticleVisualizer from './visualizers/ParticleVisualizer'
import BarsVisualizer from './visualizers/BarsVisualizer'
import ProjectGrid from './components/ProjectGrid'
import ContactForm from './components/ContactForm'
import SocialLinks from './components/SocialLinks'

function App() {
  return (
    <AudioProvider>
      <div className="app">
        {/* CRT Scanline Overlay */}
        <div className="crt-overlay"></div>
        
        {/* Background Canvas */}
        <div className="background-canvas">
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <Suspense fallback={null}>
              <BackgroundParticles />
            </Suspense>
          </Canvas>
        </div>

        {/* Main Content */}
        <div className="content">
          {/* Music Controls */}
          <div className="music-controls">
            <MusicPlayer />
            <ToggleNextTrack />
          </div>

          {/* Hero Section */}
          <section className="hero-section">
            <div className="hero-content">
              <div className="portrait-container">
                <img 
                  src="/me.jpg" 
                  alt="Portrait" 
                  className="pixelated-portrait"
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
              </div>
              <h1 className="hero-title">RETRO PORTFOLIO</h1>
              <p className="hero-subtitle">MUSIC-REACTIVE 3D EXPERIENCE</p>
            </div>
          </section>

          {/* Visualizer Section 1 */}
          <section className="visualizer-section">
            <h2 className="section-title">NEON SPHERE</h2>
            <div className="visualizer-container">
              <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <Suspense fallback={null}>
                  <SphereVisualizer />
                </Suspense>
              </Canvas>
            </div>
          </section>

          {/* Visualizer Section 2 */}
          <section className="visualizer-section">
            <h2 className="section-title">PIXEL CLOUD</h2>
            <div className="visualizer-container">
              <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <ambientLight intensity={0.5} />
                <Suspense fallback={null}>
                  <ParticleVisualizer />
                </Suspense>
              </Canvas>
            </div>
          </section>

          {/* Visualizer Section 3 */}
          <section className="visualizer-section">
            <h2 className="section-title">EQUALIZER GRID</h2>
            <div className="visualizer-container">
              <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[0, 5, 5]} intensity={1} />
                <Suspense fallback={null}>
                  <BarsVisualizer />
                </Suspense>
              </Canvas>
            </div>
          </section>

          {/* Projects Section */}
          <ProjectGrid />

          {/* Contact Section */}
          <ContactForm />

          {/* Social Links */}
          <SocialLinks />
        </div>
      </div>
    </AudioProvider>
  )
}

export default App

