import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Navigation from './components/Navigation'
import BackgroundAnimation from './components/BackgroundAnimation'
import About from './components/About'
import ProjectGrid from './components/ProjectGrid'
import ContactForm from './components/ContactForm'
import SocialLinks from './components/SocialLinks'

function App() {
  return (
    <div className="app">
      {/* CRT Scanline Overlay */}
      <div className="crt-overlay"></div>

      {/* Background Canvas */}
      <div className="background-canvas">
        <Canvas camera={{ position: [0, 0, 50], fov: 75 }}>
          <Suspense fallback={null}>
            <BackgroundAnimation />
          </Suspense>
        </Canvas>
      </div>

      {/* Navigation Header */}
      <Navigation />

      {/* Main Content */}
      <div className="content">
        {/* Hero Section */}
        <section id="home" className="hero-section">
          <div className="hero-content">
            <div className="hero-images-container">
              <div className="side-image-container left-image">
                <img 
                  src="/left.jpg" 
                  alt="Left decoration" 
                  className="side-image"
                  loading="eager"
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
              </div>
              <div className="portrait-container">
                <img 
                  src="/me.jpg" 
                  alt="Rishi Raj Grandhi" 
                  className="pixelated-portrait"
                  loading="eager"
                  onError={(e) => {
                    console.error('Image failed to load:', e.target.src)
                    // Hide broken image and show placeholder
                    e.target.style.display = 'none'
                    const container = e.target.parentElement
                    if (container && !container.querySelector('.portrait-placeholder')) {
                      const placeholder = document.createElement('div')
                      placeholder.className = 'portrait-placeholder'
                      placeholder.innerHTML = 'RG'
                      container.appendChild(placeholder)
                    }
                  }}
                  onLoad={() => {
                    console.log('Image loaded successfully')
                  }}
                />
              </div>
              <div className="side-image-container right-image">
                <img 
                  src="/right.jpg" 
                  alt="Right decoration" 
                  className="side-image"
                  loading="eager"
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
              </div>
            </div>
            <h1 className="hero-title">RISHI RAJ GRANDHI</h1>
            <p className="hero-subtitle">SOFTWARE DEVELOPER</p>
            <p className="hero-description">B.Tech CSE @ VIT | AWS Certified | Full-Stack Developer</p>
          </div>
        </section>

        {/* About Section */}
        <About />

        {/* Projects Section */}
        <ProjectGrid />

        {/* Contact Section */}
        <ContactForm />

        {/* Social Links */}
        <SocialLinks />
      </div>
    </div>
  )
}

export default App

