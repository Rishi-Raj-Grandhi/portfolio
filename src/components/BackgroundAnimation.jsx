import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const BackgroundAnimation = () => {
  const particlesRef = useRef()
  const meshRef = useRef()
  const particleCount = 1500

  useEffect(() => {
    if (!particlesRef.current) return

    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)

    // Retro game color palette (solid, muted colors)
    const color1 = new THREE.Color(0x4A7C59) // Primary green
    const color2 = new THREE.Color(0x5B7FA6) // Secondary blue
    const color3 = new THREE.Color(0xB85450) // Accent red

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3

      // Spread particles in a large volume
      positions[i3] = (Math.random() - 0.5) * 100
      positions[i3 + 1] = (Math.random() - 0.5) * 100
      positions[i3 + 2] = (Math.random() - 0.5) * 100

      // Random colors from palette
      const colorChoice = Math.random()
      let color
      if (colorChoice < 0.33) color = color1
      else if (colorChoice < 0.66) color = color2
      else color = color3

      colors[i3] = color.r * 0.3 // Very low intensity
      colors[i3 + 1] = color.g * 0.3
      colors[i3 + 2] = color.b * 0.3

      sizes[i] = Math.random() * 0.5 + 0.2
    }

    particlesRef.current.geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    )
    particlesRef.current.geometry.setAttribute(
      'color',
      new THREE.BufferAttribute(colors, 3)
    )
    particlesRef.current.geometry.setAttribute(
      'size',
      new THREE.BufferAttribute(sizes, 1)
    )
  }, [])

  const originalPositionsRef = useRef(null)

  useEffect(() => {
    if (particlesRef.current && !originalPositionsRef.current) {
      // Store original positions
      const positions = particlesRef.current.geometry.attributes.position.array
      originalPositionsRef.current = new Float32Array(positions)
    }
  }, [])

  useFrame((state, delta) => {
    if (particlesRef.current && originalPositionsRef.current) {
      // Gentle floating animation using original positions as base
      const positions = particlesRef.current.geometry.attributes.position.array
      const time = state.clock.elapsedTime

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        const baseX = originalPositionsRef.current[i3]
        const baseY = originalPositionsRef.current[i3 + 1]
        const baseZ = originalPositionsRef.current[i3 + 2]

        // Oscillating movement (subtle floating)
        positions[i3] = baseX + Math.sin(time * 0.3 + i * 0.01) * 2
        positions[i3 + 1] = baseY + Math.cos(time * 0.4 + i * 0.015) * 2
        positions[i3 + 2] = baseZ + Math.sin(time * 0.25 + i * 0.02) * 1.5
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }

    // Rotate geometric shapes slowly
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1
      meshRef.current.rotation.y += delta * 0.15
    }
  })

  return (
    <>
      {/* Subtle floating particles */}
      <points ref={particlesRef}>
        <bufferGeometry />
        <pointsMaterial
          size={0.5}
          vertexColors
          transparent
          opacity={0.4}
          sizeAttenuation={true}
        />
      </points>

      {/* Subtle geometric shapes */}
      <group ref={meshRef}>
        {/* Wireframe sphere */}
        <mesh position={[-20, 10, -30]}>
          <icosahedronGeometry args={[8, 0]} />
          <meshBasicMaterial
            color={0x4A7C59}
            wireframe
            transparent
            opacity={0.2}
          />
        </mesh>

        {/* Wireframe torus */}
        <mesh position={[25, -15, -25]} rotation={[0.5, 0.3, 0]}>
          <torusGeometry args={[6, 1, 8, 16]} />
          <meshBasicMaterial
            color={0x5B7FA6}
            wireframe
            transparent
            opacity={0.18}
          />
        </mesh>

        {/* Wireframe box */}
        <mesh position={[-30, -20, -20]} rotation={[0.2, 0.4, 0.1]}>
          <boxGeometry args={[10, 10, 10]} />
          <meshBasicMaterial
            color={0xB85450}
            wireframe
            transparent
            opacity={0.15}
          />
        </mesh>
      </group>
    </>
  )
}

export default BackgroundAnimation

