import { createContext, useContext, useState, useEffect, useRef } from 'react'

const AudioContext = createContext(null)

export const useAudio = () => {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider')
  }
  return context
}

export const AudioProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)
  const audioContextRef = useRef(null)
  const analyserRef = useRef(null)
  const dataArrayRef = useRef(null)
  const animationFrameRef = useRef(null)

  const tracks = [
    '/music/track1.mp3',
    '/music/track2.mp3',
    '/music/track3.mp3',
  ]

  useEffect(() => {
    // Initialize AudioContext
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    audioContextRef.current = new AudioContextClass()
    analyserRef.current = audioContextRef.current.createAnalyser()
    analyserRef.current.fftSize = 256
    const bufferLength = analyserRef.current.frequencyBinCount
    dataArrayRef.current = new Uint8Array(bufferLength)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  const sourceRef = useRef(null)

  const connectAudioSource = (audio) => {
    if (!audioContextRef.current || !analyserRef.current || sourceRef.current) {
      return
    }

    try {
      // Resume AudioContext if suspended
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume().catch(console.error)
      }

      const source = audioContextRef.current.createMediaElementSource(audio)
      source.connect(analyserRef.current)
      analyserRef.current.connect(audioContextRef.current.destination)
      sourceRef.current = source
    } catch (e) {
      console.error('Error creating audio source:', e)
    }
  }

  const loadRandomTrack = async (shouldPlay = false) => {
    const randomIndex = Math.floor(Math.random() * tracks.length)
    const track = tracks[randomIndex]
    setCurrentTrack(track)
    
    if (audioRef.current) {
      audioRef.current.pause()
      if (sourceRef.current) {
        try {
          sourceRef.current.disconnect()
        } catch (e) {
          // Source already disconnected
        }
        sourceRef.current = null
      }
      audioRef.current = null
    }

    // Resume AudioContext before creating new audio
    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      try {
        await audioContextRef.current.resume()
      } catch (e) {
        console.error('Error resuming AudioContext:', e)
      }
    }

    const audio = new Audio(track)
    audio.loop = true
    audio.crossOrigin = 'anonymous'
    
    // Track error state
    let audioError = false
    
    // Handle errors gracefully
    const handleError = () => {
      audioError = true
      const error = audio.error
      if (error) {
        console.warn(`Audio file "${track}" failed to load. Error code: ${error.code}`)
        console.info('Make sure the file exists in /public/music/ directory')
        console.info('Expected files: track1.mp3, track2.mp3, track3.mp3')
        console.info('Animations will still work with fallback frequency data')
      }
    }
    
    audio.addEventListener('error', handleError)
    
    // Connect source when audio is ready
    const handleCanPlay = () => {
      if (audioError) return
      connectAudioSource(audio)
      if (shouldPlay) {
        audio.play().catch((err) => {
          if (err.name === 'NotSupportedError') {
            console.warn('Audio format not supported or file missing')
          } else if (err.name !== 'NotAllowedError') {
            console.error('Error playing audio:', err)
          }
        })
      }
    }

    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('canplaythrough', handleCanPlay)
    
    // Also try to connect immediately if audio is already loaded
    if (audio.readyState >= 2) {
      // Check for error before connecting
      if (!audio.error) {
        connectAudioSource(audio)
      }
    }

    audioRef.current = audio
    
    // Try to play if requested
    if (shouldPlay) {
      try {
        await audio.play()
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          console.info('Audio playback requires user interaction (browser autoplay policy)')
        } else if (error.name === 'NotSupportedError') {
          console.warn('Audio format not supported or file missing')
        } else {
          console.error('Error playing audio:', error)
        }
      }
    }
  }

  useEffect(() => {
    if (!currentTrack) {
      loadRandomTrack(false)
    }

    // Resume AudioContext on first user interaction (browser autoplay policy)
    const handleFirstInteraction = async () => {
      if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
        try {
          await audioContextRef.current.resume()
          console.log('AudioContext resumed')
        } catch (e) {
          console.error('Error resuming AudioContext:', e)
        }
      }
    }

    // Try to resume on various user interactions
    const events = ['click', 'touchstart', 'keydown']
    events.forEach(event => {
      document.addEventListener(event, handleFirstInteraction, { once: true })
    })

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleFirstInteraction)
      })
    }
  }, [])

  const togglePlay = async () => {
    // Resume AudioContext if suspended (browser autoplay policy)
    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      try {
        await audioContextRef.current.resume()
      } catch (e) {
        console.error('Error resuming AudioContext:', e)
      }
    }

    // If no audio loaded, load one first
    if (!audioRef.current) {
      await loadRandomTrack(true)
      setIsPlaying(true)
      return
    }

    // Connect source if not connected
    if (!sourceRef.current) {
      connectAudioSource(audioRef.current)
    }

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      try {
        await audioRef.current.play()
        setIsPlaying(true)
      } catch (error) {
        console.error('Error playing audio:', error)
        // Try to load a new track if current one failed
        if (error.name === 'NotAllowedError' || error.name === 'NotSupportedError') {
          console.info('Audio blocked. User interaction required.')
        }
      }
    }
  }

  const switchTrack = async () => {
    // Resume AudioContext if suspended
    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      try {
        await audioContextRef.current.resume()
      } catch (e) {
        console.error('Error resuming AudioContext:', e)
      }
    }
    await loadRandomTrack(true)
    setIsPlaying(true)
  }

  const getFrequencyData = () => {
    if (!analyserRef.current || !dataArrayRef.current) {
      // Return some default data for visual effect even without audio
      const defaultData = new Uint8Array(256)
      // Add some subtle variation
      for (let i = 0; i < defaultData.length; i++) {
        defaultData[i] = Math.sin(i * 0.1) * 20 + 30
      }
      return defaultData
    }
    analyserRef.current.getByteFrequencyData(dataArrayRef.current)
    return dataArrayRef.current
  }

  const getTimeDomainData = () => {
    if (!analyserRef.current || !dataArrayRef.current) {
      return new Uint8Array(256)
    }
    analyserRef.current.getByteTimeDomainData(dataArrayRef.current)
    return dataArrayRef.current
  }

  return (
    <AudioContext.Provider
      value={{
        currentTrack,
        isPlaying,
        togglePlay,
        switchTrack,
        getFrequencyData,
        getTimeDomainData,
        analyser: analyserRef.current,
      }}
    >
      {children}
    </AudioContext.Provider>
  )
}

