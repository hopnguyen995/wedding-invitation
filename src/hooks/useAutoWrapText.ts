import { useState, useCallback, useEffect } from "react";

/**
 * Custom hook: tự động chia dòng và co chữ cho vừa container.
 *
 * @param textRef - ref của phần tử chứa text
 * @param containerRef - ref của container để đo chiều rộng
 * @param fullText - toàn bộ nội dung text
 * @param firstLineText - nội dung dòng đầu (khi chia 2 dòng)
 * @param options - tùy chọn (font mặc định, minFont, v.v.)
 *
 * @returns { wrapLevel, fontSize }
 */
export function useAutoWrapText(
  textRef: React.RefObject<HTMLElement>,
  containerRef: React.RefObject<HTMLElement>,
  fullText: string,
  firstLineText: string,
  options?: {
    defaultFont?: number;
    minFont?: number;
  }
) {
  const defaultFont = options?.defaultFont ?? 14;
  const minFont = options?.minFont ?? 8;

  const [wrapLevel, setWrapLevel] = useState<1 | 2>(1);
  const [fontSize, setFontSize] = useState(defaultFont);

  // Đo chiều rộng thật của text (1 dòng)
  const measureTextWidth = useCallback(
    (text: string, size?: number) => {
      if (!textRef.current) return 0;
      const cs = window.getComputedStyle(textRef.current);
      const span = document.createElement("span");
      span.textContent = text;
      span.style.font = cs.font;
      span.style.fontSize = size ? `${size}px` : cs.fontSize;
      span.style.fontFamily = cs.fontFamily;
      span.style.fontWeight = cs.fontWeight;
      span.style.letterSpacing = cs.letterSpacing;
      span.style.whiteSpace = "nowrap";
      span.style.visibility = "hidden";
      document.body.appendChild(span);
      const width = span.getBoundingClientRect().width;
      span.remove();
      return width;
    },
    [textRef]
  );

  const checkWrap = useCallback(() => {
    if (!containerRef.current || !textRef.current) return;

    const containerWidth = containerRef.current.clientWidth;
    const fullWidth = measureTextWidth(fullText, defaultFont);
    const firstLineWidth = measureTextWidth(firstLineText, defaultFont);

    // 1 dòng vừa
    if (fullWidth <= containerWidth) {
      setWrapLevel(1);
      setFontSize(defaultFont);
      return;
    }

    // 2 dòng vừa
    if (firstLineWidth <= containerWidth) {
      setWrapLevel(2);
      setFontSize(defaultFont);
      return;
    }

    // 2 dòng vẫn tràn => scale font
    let testFont = defaultFont;
    let fits = false;

    while (testFont > minFont) {
      const testWidth = measureTextWidth(firstLineText, testFont);
      if (testWidth <= containerWidth) {
        fits = true;
        break;
      }
      testFont -= 0.1;
    }

    setWrapLevel(2);
    setFontSize(fits ? testFont : minFont);
  }, [measureTextWidth, containerRef, fullText, firstLineText, defaultFont, minFont]);

  useEffect(() => {
    if ((document as any).fonts?.ready) {
      (document as any).fonts.ready.then(checkWrap);
    } else {
      checkWrap();
    }

    let timer: any;
    const handleResize = () => {
      clearTimeout(timer);
      timer = setTimeout(checkWrap, 150);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [checkWrap]);

  return { wrapLevel, fontSize };
}
