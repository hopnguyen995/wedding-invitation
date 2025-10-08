import { useRef, useEffect, useState } from "react";

const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-[20px] left-[20px] md:bottom-[60px] md:left-[40px] z-50">
      <div className="relative button-music w-[46px] h-[46px] rounded-full">
        <div className="absolute left-[3px] top-[3px]">
          <audio ref={audioRef} src="audio/Beautiful In White.mp3" autoPlay={isPlaying} />
          <button
            className="flex justify-center items-center w-[40px] h-[40px] bg-gradient-to-br from-[#6fa322]/60 to-[#6fa322]/30  text-[#f5efed] rounded-full"
            onClick={togglePlayPause}
          >
            {isPlaying ? <i className="fas fa-pause"></i> : <i className="fas fa-play"></i>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
