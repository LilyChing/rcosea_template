import { useRef, useEffect } from "react";

export function useSlidesScroll(exportRef) {
  const elRef = useRef();
  useEffect(() => {
    const el = elRef.current;
    if (el) {
        const onWheel = e => {
            if (e.deltaY == 0) return;
            if (exportRef) console.log(exportRef.current);
        console.log(el);
        console.log(el.scrollTop);
        e.preventDefault();
        el.scrollBy({
          top: e.deltaY,
          behavior: "smooth"
        });
      };
      el.addEventListener("wheel", onWheel);
      return () => el.removeEventListener("wheel", onWheel);
    }
  }, []);
  return elRef;
}