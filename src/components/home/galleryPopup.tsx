import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface GalleryPopupProps {
    images: string[];
    triggerText?: string;
}

export default function galleryPopup({ images, triggerText = "Xem thêm ảnh" }: GalleryPopupProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [current, setCurrent] = useState(0);

    const thumbnailsRef = useRef<HTMLDivElement>(null);
    const activeThumbRef = useRef<HTMLImageElement | null>(null);

    const openPopup = () => setIsOpen(true);
    const closePopup = () => setIsOpen(false);

    const nextImage = useCallback(() => {
        setCurrent((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const prevImage = useCallback(() => {
        setCurrent((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    useEffect(() => {
        if (isOpen) {
            // Lưu lại scroll hiện tại
            const scrollY = window.scrollY;
            document.body.style.position = "fixed";
            document.body.style.top = `-${scrollY}px`;
            document.body.style.left = "0";
            document.body.style.right = "0";
            return () => {
                // Khôi phục scroll khi đóng popup
                document.body.style.position = "";
                document.body.style.top = "";
                window.scrollTo(0, scrollY);
            };
        }
    }, [isOpen]);

    // Preload ảnh trước & sau
    useEffect(() => {
        const next = new Image();
        next.src = images[(current + 1) % images.length];
        const prev = new Image();
        prev.src = images[(current - 1 + images.length) % images.length];
    }, [current, images]);

    // Scroll thumbnail đang chọn vào gần giữa
    useEffect(() => {
        if (activeThumbRef.current && thumbnailsRef.current) {
            activeThumbRef.current.scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "nearest",
            });
        }
    }, [current]);

    return (
        <>
            {/* Trigger button */}
            <button
                onClick={openPopup}
                className="flex items-center gap-2 mx-auto mt-5 bg-[#6fa322] text-[#f5efed] font-medium border border-[#6fa322] rounded-full px-6 py-2 hover:bg-[#6fa322]/90 hover:text-white transition"
            >
                {triggerText}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Close button */}
                        <button
                            onClick={closePopup}
                            className="absolute top-4 right-4 text-white text-2xl font-bold z-10"
                        >
                            <X size={30} />
                        </button>

                        {/* Left arrow */}
                        <button
                            onClick={prevImage}
                            className="absolute left-3 md:left-6 text-white/80 hover:text-white transition z-10"
                        >
                            <ChevronLeft size={40} />
                        </button>

                        {/* Right arrow */}
                        <button
                            onClick={nextImage}
                            className="absolute right-3 md:right-6 text-white/80 hover:text-white transition z-10"
                        >
                            <ChevronRight size={40} />
                        </button>

                        {/* Big image */}
                        <motion.div
                            key={current}
                            className="flex-grow flex items-center justify-center w-full max-h-[70vh]"
                        >
                            <img
                                src={images[current]}
                                alt={`image-${current}`}
                                className="max-h-[70vh] max-w-full object-contain shadow-lg select-none"
                                loading="lazy"
                                decoding="async"
                            />
                        </motion.div>

                        {/* Thumbnail preview */}
                        <div
                            ref={thumbnailsRef}
                            className="flex gap-2 mt-4 px-4 overflow-x-auto scrollbar-hide whitespace-nowrap w-full"
                        >
                            {images.map((img, i) => (
                                <img
                                    key={i}
                                    src={img}
                                    alt={`thumb-${i}`}
                                    ref={i === current ? activeThumbRef : null}
                                    onClick={() => setCurrent(i)}
                                    className={`h-20 w-auto inline-block object-cover cursor-pointer transition-opacity duration-200 ${i === current
                                            ? "ring-4 ring-white"
                                            : "opacity-70 hover:opacity-100"
                                        }`}
                                    loading="lazy"
                                    decoding="async"
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
