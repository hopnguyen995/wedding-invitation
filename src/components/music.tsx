import { useEffect, useRef, useState, useCallback, memo } from "react";

// 🧩 Component con — tránh re-render thừa
const PlayButton = memo(
  ({ isPlaying, onClick }: { isPlaying: boolean; onClick: () => void }) => (
    <button
      className="flex justify-center items-center w-[40px] h-[40px] bg-gradient-to-br from-[#6fa322]/60 to-[#6fa322]/30 text-[#f5efed] rounded-full shadow-md"
      onClick={onClick}
    >
      {isPlaying ? <i className="fas fa-pause"></i> : <i className="fas fa-play"></i>}
    </button>
  )
);

const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playlist, setPlaylist] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 🎵 Lazy-load danh sách nhạc chỉ khi người dùng nhấn play lần đầu
  useEffect(() => {
    if (isPlaying && playlist.length === 0) {
      const files = import.meta.glob("/src/assets/audio/*.mp3");
      const paths = Object.keys(files);
      Promise.all(paths.map((p) => files[p]())).then((modules) => {
        const urls = modules.map((m: any) => m.default);
        setPlaylist(urls);
      });
    }
  }, [isPlaying, playlist.length]);

  // ▶️ Điều khiển play/pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio
        .play()
        .catch((err) => console.warn("Autoplay blocked by browser:", err));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // 🔁 Khi bài hát kết thúc → chuyển bài / dừng
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      if (currentIndex < playlist.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setIsPlaying(false);
        setCurrentIndex(0);
      }
    };

    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, [playlist.length, currentIndex]);

  // 🪄 Tự động play bài mới nếu đang phát
  useEffect(() => {
    const audio = audioRef.current;
    if (audio && isPlaying && playlist.length > 0) {
      audio.src = playlist[currentIndex];
      audio.load();
      audio.play();
    }
  }, [currentIndex, isPlaying, playlist]);

  // ⏯ Toggle play/pause
  const togglePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  return (
    <div className="fixed bottom-[20px] left-[20px] md:bottom-[60px] md:left-[40px] z-50">
      <div className="relative button-music w-[46px] h-[46px] rounded-full">
        <div className="absolute left-[3px] top-[3px]">
          <audio ref={audioRef} preload="metadata" />
          <PlayButton isPlaying={isPlaying} onClick={togglePlayPause} />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
