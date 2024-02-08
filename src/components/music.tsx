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
    <div>
      <audio ref={audioRef} src="audio/beautiful-in-white-bachata.mp3" autoPlay={isPlaying} />
      <button
        className="flex justify-center items-center w-[40px] h-[40px] bg-pink-400 text-[#fff] rounded-full"
        onClick={togglePlayPause}
      >
        {isPlaying ? <i className="fas fa-pause"></i> : <i className="fas fa-play"></i>}
      </button>
    </div>
  );
};

export default MusicPlayer;
