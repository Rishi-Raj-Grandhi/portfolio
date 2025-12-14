import { useRef, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useAudio } from '../components/AudioProvider'
import * as THREE from 'three'

const SphereVisualizer = () => {
  const meshRef = useRef()
  const { getFrequencyData } = useAudio()
  const { gl } = useThree()
  const [isVisible, setIsVisible] = useState(false)
  const observerRef = useRef(null)

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
      observerRef.current = observer
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [gl])

  useFrame((state, delta) => {
    if (!meshRef.current || !isVisible) return

    const frequencyData = getFrequencyData()
    const bass = frequencyData[0] / 255
    const mid = frequencyData[Math.floor(frequencyData.length / 2)] / 255

    // Rotate slowly
    meshRef.current.rotation.y += delta * 0.3
    meshRef.current.rotation.x += delta * 0.2

    // Scale with bass
    const scale = 1 + bass * 0.5
    meshRef.current.scale.set(scale, scale, scale)

    // Color intensity
    if (meshRef.current.material) {
      const intensity = 0.5 + (bass + mid) * 0.5
      meshRef.current.material.emissiveIntensity = intensity
    }
  })

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2, 1]} />
      <meshStandardMaterial
        color={0x6CFF47}
        emissive={0x6CFF47}
        emissiveIntensity={0.5}
        wireframe
        wireframeLinewidth={3}
      />
    </mesh>
  )
}

export default SphereVisualizer

