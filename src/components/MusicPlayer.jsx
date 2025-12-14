import { useAudio } from './AudioProvider'

const MusicPlayer = () => {
  const { isPlaying, togglePlay, currentTrack } = useAudio()

  return (
    <div className="music-player">
      <button 
        onClick={togglePlay}
        className="pixel-button"
        aria-label={isPlaying ? 'Pause' : 'Play'}
        title={isPlaying ? 'Pause music' : 'Play music'}
      >
        {isPlaying ? '⏸ PAUSE' : '▶ PLAY'}
      </button>
    </div>
  )
}

export default MusicPlayer

