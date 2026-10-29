import { motion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";

// Các thẻ HTML được phép render (đủ cho các vị trí đang dùng data-aos)
type Tag =
  | "div"
  | "section"
  | "article"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "p"
  | "span"
  | "li"
  | "ul"
  | "img"
  | "a"
  | "button";

// Thay thế AOS bằng Framer Motion: hiệu ứng xuất hiện khi cuộn tới (once).
export type RevealAnim =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "fade-in"
  | "zoom-in"
  | "zoom-in-up";

const OFFSET = 40;

const buildVariants = (anim: RevealAnim): Variants => {
  switch (anim) {
    case "fade-down":
      return { hidden: { opacity: 0, y: -OFFSET }, show: { opacity: 1, y: 0 } };
    case "fade-left": // vào từ bên phải
      return { hidden: { opacity: 0, x: OFFSET }, show: { opacity: 1, x: 0 } };
    case "fade-right": // vào từ bên trái
      return { hidden: { opacity: 0, x: -OFFSET }, show: { opacity: 1, x: 0 } };
    case "fade-in":
      return { hidden: { opacity: 0 }, show: { opacity: 1 } };
    case "zoom-in":
      return { hidden: { opacity: 0, scale: 0.85 }, show: { opacity: 1, scale: 1 } };
    case "zoom-in-up":
      return {
        hidden: { opacity: 0, scale: 0.85, y: OFFSET },
        show: { opacity: 1, scale: 1, y: 0 },
      };
    case "fade-up":
    default:
      return { hidden: { opacity: 0, y: OFFSET }, show: { opacity: 1, y: 0 } };
  }
};

interface RevealProps {
  as?: Tag; // thẻ render ra (div mặc định) — giữ nguyên tag gốc để không đổi layout
  anim?: RevealAnim;
  delay?: number; // giây
  duration?: number; // giây
  amount?: number; // ngưỡng viewport để kích hoạt
  className?: string;
  children?: ReactNode;
  [key: string]: unknown; // cho phép truyền src/alt/onClick/style...
}

export default function Reveal({
  as = "div",
  anim = "fade-up",
  delay = 0,
  duration = 0.8,
  amount = 0.15,
  className,
  children,
  ...rest
}: RevealProps) {
  const MotionTag = motion[as] as ElementType;
  return (
    <MotionTag
      className={className}
      variants={buildVariants(anim)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: "easeOut" }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
