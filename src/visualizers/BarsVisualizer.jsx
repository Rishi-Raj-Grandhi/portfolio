import { useRef, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useAudio } from '../components/AudioProvider'
import * as THREE from 'three'

const BarsVisualizer = () => {
  const groupRef = useRef()
  const { getFrequencyData } = useAudio()
  const { gl } = useThree()
  const [isVisible, setIsVisible] = useState(false)
  const barsRef = useRef([])
  const barCount = 64

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
    if (!groupRef.current) return

    // Create bars
    const colors = [
      new THREE.Color(0x6CFF47), // Neon green
      new THREE.Color(0x32FFE8), // Retro cyan
      new THREE.Color(0xFF40C1), // Magenta
      new THREE.Color(0xFFD447), // Pixel yellow
    ]

    const geometry = new THREE.BoxGeometry(0.15, 0.1, 0.15)
    
    for (let i = 0; i < barCount; i++) {
      const material = new THREE.MeshStandardMaterial({
        color: colors[i % colors.length],
        emissive: colors[i % colors.length],
        emissiveIntensity: 0.5,
      })
      const bar = new THREE.Mesh(geometry, material)
      
      const x = (i % 8) * 0.3 - 1.05
      const z = Math.floor(i / 8) * 0.3 - 1.05
      bar.position.set(x, 0, z)
      
      groupRef.current.add(bar)
      barsRef.current.push(bar)
    }
  }, [])

  useFrame(() => {
    if (!groupRef.current || !isVisible) return

    const frequencyData = getFrequencyData()
    const bandSize = Math.floor(frequencyData.length / barCount)

    barsRef.current.forEach((bar, i) => {
      const dataIndex = Math.min(i * bandSize, frequencyData.length - 1)
      const value = frequencyData[dataIndex] / 255
      const height = 0.1 + value * 2

      bar.scale.y = height
      bar.position.y = height / 2

      // Glow effect
      if (bar.material) {
        bar.material.emissiveIntensity = 0.5 + value * 0.5
      }
    })
  })

  return <group ref={groupRef} />
}

export default BarsVisualizer

