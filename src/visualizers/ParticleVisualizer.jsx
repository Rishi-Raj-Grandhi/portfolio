import { useRef, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useAudio } from '../components/AudioProvider'
import * as THREE from 'three'

const ParticleVisualizer = () => {
  const pointsRef = useRef()
  const { getFrequencyData } = useAudio()
  const { gl } = useThree()
  const [isVisible, setIsVisible] = useState(false)
  const particleCount = 2000

  useEffect(() => {
    const canvas = gl.domElement
    const container = canvas?.parentElement

    if (container) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            setIsVisible(entry.isIntersecting)
          })
        },
        { threshold: 0.1 }
      )

      observer.observe(container)

      return () => observer.disconnect()
    }
  }, [gl])

  useEffect(() => {
    const initParticles = () => {
      if (!pointsRef.current) {
        requestAnimationFrame(initParticles)
        return
      }

      const positions = new Float32Array(particleCount * 3)
      const colors = new Float32Array(particleCount * 3)

      const color1 = new THREE.Color(0x32FFE8) // Retro cyan
      const color2 = new THREE.Color(0xFF40C1) // Magenta
      const color3 = new THREE.Color(0xFFD447) // Pixel yellow

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        
        positions[i3] = (Math.random() - 0.5) * 10
        positions[i3 + 1] = (Math.random() - 0.5) * 10
        positions[i3 + 2] = (Math.random() - 0.5) * 10

        const colorChoice = Math.random()
        let color
        if (colorChoice < 0.33) color = color1
        else if (colorChoice < 0.66) color = color2
        else color = color3

        colors[i3] = color.r
        colors[i3 + 1] = color.g
        colors[i3 + 2] = color.b
      }

      pointsRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      pointsRef.current.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    }

    initParticles()
  }, [])

  useFrame((state, delta) => {
    if (!pointsRef.current || !isVisible) return

    // Check if geometry and attributes are initialized
    if (!pointsRef.current.geometry || 
        !pointsRef.current.geometry.attributes.position ||
        !pointsRef.current.geometry.attributes.color) {
      return
    }

    const frequencyData = getFrequencyData()
    const mid = frequencyData[Math.floor(frequencyData.length / 2)] / 255
    const high = frequencyData[frequencyData.length - 1] / 255

    const positions = pointsRef.current.geometry.attributes.position.array
    const colors = pointsRef.current.geometry.attributes.color.array

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      
      // Jitter and drift
      positions[i3] += (Math.random() - 0.5) * 0.05 * (1 + mid)
      positions[i3 + 1] += (Math.random() - 0.5) * 0.05 * (1 + high)
      positions[i3 + 2] += (Math.random() - 0.5) * 0.02

      // Color intensity
      const intensity = (mid + high) / 2
      colors[i3] *= 0.7 + intensity * 0.3
      colors[i3 + 1] *= 0.7 + intensity * 0.3
      colors[i3 + 2] *= 0.7 + intensity * 0.3

      // Expand/contract
      const expand = 1 + mid * 0.3
      positions[i3] *= 0.99 + expand * 0.01
      positions[i3 + 1] *= 0.99 + expand * 0.01
      positions[i3 + 2] *= 0.99 + expand * 0.01
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true
    pointsRef.current.geometry.attributes.color.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry />
      <pointsMaterial
        size={0.3}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation={true}
      />
    </points>
  )
}

export default ParticleVisualizer

