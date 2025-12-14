import { useAudio } from './AudioProvider'

const ToggleNextTrack = () => {
  const { switchTrack } = useAudio()

  return (
    <button 
      onClick={switchTrack}
      className="pixel-button"
      aria-label="Next Track"
    >
      ⏭ NEXT
    </button>
  )
}

export default ToggleNextTrack

