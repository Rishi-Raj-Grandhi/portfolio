import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useAudio } from './AudioProvider'
import * as THREE from 'three'

const BackgroundParticles = () => {
  const pointsRef = useRef()
  const { getFrequencyData } = useAudio()
  const particleCount = 5000

  useEffect(() => {
    const initParticles = () => {
      if (!pointsRef.current) {
        requestAnimationFrame(initParticles)
        return
      }

      const positions = new Float32Array(particleCount * 3)
      const colors = new Float32Array(particleCount * 3)
      const sizes = new Float32Array(particleCount)

      const color1 = new THREE.Color(0x6CFF47) // Neon green
      const color2 = new THREE.Color(0x32FFE8) // Retro cyan
      const color3 = new THREE.Color(0xFF40C1) // Magenta

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        
        // Random positions in a large sphere
        const radius = 50 + Math.random() * 50
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(Math.random() * 2 - 1)
        
        positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
        positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
        positions[i3 + 2] = radius * Math.cos(phi)

        // Random colors from palette
        const colorChoice = Math.random()
        let color
        if (colorChoice < 0.33) color = color1
        else if (colorChoice < 0.66) color = color2
        else color = color3

        colors[i3] = color.r
        colors[i3 + 1] = color.g
        colors[i3 + 2] = color.b

        sizes[i] = 0.1 + Math.random() * 0.2
      }

      pointsRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      pointsRef.current.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
      pointsRef.current.geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    }

    initParticles()
  }, [])

  useFrame((state, delta) => {
    if (!pointsRef.current) return
    
    // Check if geometry and attributes are initialized
    if (!pointsRef.current.geometry || 
        !pointsRef.current.geometry.attributes.position ||
        !pointsRef.current.geometry.attributes.color ||
        !pointsRef.current.geometry.attributes.size) {
      return
    }

    const frequencyData = getFrequencyData()
    const bass = frequencyData[0] / 255
    const mid = frequencyData[Math.floor(frequencyData.length / 2)] / 255
    const high = frequencyData[frequencyData.length - 1] / 255

    const positions = pointsRef.current.geometry.attributes.position.array
    const colors = pointsRef.current.geometry.attributes.color.array
    const sizes = pointsRef.current.geometry.attributes.size.array

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      
      // Slow drift
      positions[i3] += (Math.random() - 0.5) * 0.01 * (1 + bass)
      positions[i3 + 1] += (Math.random() - 0.5) * 0.01 * (1 + mid)
      positions[i3 + 2] += (Math.random() - 0.5) * 0.01 * (1 + high)

      // React to audio with brightness
      const intensity = (bass + mid + high) / 3
      colors[i3] *= 0.5 + intensity * 0.5
      colors[i3 + 1] *= 0.5 + intensity * 0.5
      colors[i3 + 2] *= 0.5 + intensity * 0.5

      // Size reacts to audio
      sizes[i] = 0.1 + intensity * 0.3

      // Wrap around if too far
      if (Math.abs(positions[i3]) > 100) positions[i3] *= -0.5
      if (Math.abs(positions[i3 + 1]) > 100) positions[i3 + 1] *= -0.5
      if (Math.abs(positions[i3 + 2]) > 100) positions[i3 + 2] *= -0.5
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true
    pointsRef.current.geometry.attributes.color.needsUpdate = true
    pointsRef.current.geometry.attributes.size.needsUpdate = true

    // Slow rotation
    pointsRef.current.rotation.y += delta * 0.05
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry />
      <pointsMaterial
        size={0.2}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation={true}
      />
    </points>
  )
}

export default BackgroundParticles

