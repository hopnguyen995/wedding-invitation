import { useEffect, useRef, useState, useCallback, memo } from "react";

// 🎵 Nút Play/Pause (memo tránh re-render)
const PlayButton = memo(
  ({
    isPlaying,
    isReady,
    onClick,
  }: {
    isPlaying: boolean;
    isReady: boolean;
    onClick: () => void;
  }) => (
    <button
      className={`flex justify-center items-center w-[40px] h-[40px] rounded-full shadow-md transition-all bg-gradient-to-br from-[#6fa322]/60 to-[#6fa322]/30 text-[#f5efed]`}
      onClick={isReady ? onClick : undefined}
      hidden={!isReady}
    >
      {isPlaying ? (
        <i className="fas fa-pause"></i>
      ) : (
        <i className="fas fa-play"></i>
      )}
    </button>
  )
);

// 🎧 Component chính
const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playlist, setPlaylist] = useState<string[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasLazyLoaded, setHasLazyLoaded] = useState(false);

  const preloadedSrc = useRef<string | null>(null);

  // 🌀 Hàm shuffle mảng
  const shuffleArray = (array: string[]) => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  // 🎵 Preload ngẫu nhiên 1 bài đầu tiên
  useEffect(() => {
    const files = import.meta.glob("/src/assets/audio/*.mp3");
    const paths = Object.keys(files);
    if (paths.length === 0) return;

    const randomIndex = Math.floor(Math.random() * paths.length);
    const firstPath = paths[randomIndex];

    files[firstPath]().then((mod: any) => {
      const firstTrack = mod.default;
      setPlaylist([firstTrack]);
      preloadedSrc.current = firstTrack;

      const audio = audioRef.current;
      if (!audio) return;

      audio.src = firstTrack;
      audio.preload = "auto";

      audio.addEventListener("loadedmetadata", () => {
        console.log("✅ Preloaded random track:", firstTrack);
        setIsReady(true);
      });

      audio.load();
    });
  }, []);

  // ⏬ Lazy load các bài còn lại (và shuffle thứ tự)
  useEffect(() => {
    if (!isPlaying || hasLazyLoaded) return;

    const files = import.meta.glob("/src/assets/audio/*.mp3");
    const paths = Object.keys(files);
    if (paths.length <= 1) return;

    Promise.all(paths.map((p) => files[p]())).then((mods) => {
      const allTracks = mods.map((m: any) => m.default);
      const shuffled = shuffleArray(allTracks);

      // đảm bảo bài preload đầu tiên không bị mất
      setPlaylist((prev) => {
        const first = prev[0];
        const withoutFirst = shuffled.filter((t) => t !== first);
        return [first, ...withoutFirst];
      });

      setHasLazyLoaded(true);
      console.log("🎶 Lazy loaded and shuffled remaining tracks:", shuffled.length);
    });
  }, [isPlaying, hasLazyLoaded]);

  // ▶️ Điều khiển play/pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || playlist.length === 0) return;

    if (isPlaying) {
      audio.play().catch((err) => console.warn("Autoplay blocked:", err));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // 🔁 Khi bài hát kết thúc → next ngẫu nhiên trong danh sách
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      setCurrentIndex((prev) => {
        if (playlist.length <= 1) return prev;

        // Nếu bạn muốn phát lần lượt
        // return prev < playlist.length - 1 ? prev + 1 : 0;

        // Nếu bạn muốn random mỗi lần chuyển
        let next = Math.floor(Math.random() * playlist.length);
        while (next === prev && playlist.length > 1) {
          next = Math.floor(Math.random() * playlist.length);
        }
        return next;
      });
    };

    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, [playlist]);

  // 🪄 Load bài mới khi currentIndex thay đổi
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || playlist.length === 0) return;

    const newSrc = playlist[currentIndex];
    if (preloadedSrc.current === newSrc) return;

    audio.src = newSrc;
    audio.load();
    preloadedSrc.current = newSrc;

    if (isPlaying) audio.play();
  }, [currentIndex, playlist, isPlaying]);

  const togglePlayPause = useCallback(() => {
    if (!isReady) return;
    setIsPlaying((prev) => !prev);
  }, [isReady]);

  return (
    <div className="fixed bottom-[20px] left-[20px] md:bottom-[60px] md:left-[40px] z-50">
      <div className="relative button-music w-[46px] h-[46px] rounded-full">
        <div className="absolute left-[3px] top-[3px]">
          <audio ref={audioRef} preload="metadata" />
          <PlayButton
            isPlaying={isPlaying}
            isReady={isReady}
            onClick={togglePlayPause}
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
