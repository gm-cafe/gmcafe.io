import { RefObject, useEffect } from 'react';

type CursorTrailProps = {
  parentRef: RefObject<HTMLDivElement>;
};

type Pos = {
  x: number;
  y: number;
  s: number;
};

const CursorTrail = ({ parentRef }: CursorTrailProps) => {
  const jiggle = 15;
  const minSize = 24;
  const maxSize = 48;
  const maxCount = 200;
  const stack: Pos[] = [];

  const spawn = (blob: Blob) => (e: MouseEvent) => {
    if (stack.length === maxCount) {
      return;
    }

    for (let i = 0; i < 10; i++) {
      let s = Math.round(minSize + Math.random() * (maxSize - minSize));
      let x = Math.min(
        e.pageX + Math.round((2 * Math.random() - 1) * jiggle),
        (parentRef?.current?.clientWidth || document.body.clientWidth) - s
      );
      let y = Math.min(
        e.pageY + Math.round((2 * Math.random() - 1) * jiggle),
        (parentRef?.current?.clientHeight || document.body.clientHeight) - s
      );

      if (!stack.find((pt) => Math.hypot(pt.x - x, pt.y - y) < Math.max(pt.s, s))) {
        let url = URL.createObjectURL(blob);
        let img = new Image();
        img.src = url;
        img.style.position = 'absolute';
        img.style.left = `${x}px`;
        img.style.top = `${y}px`;
        img.style.width = img.style.height = `${s}px`;
        img.style.pointerEvents = 'none';
        img.style.zIndex = '50';
        document.body.append(img);
        let pt = { x, y, s };
        stack.push(pt);

        setTimeout(() => {
          img.remove();
          URL.revokeObjectURL(url);
          let last = stack.pop();
          if (last && last != pt) {
            stack[stack.indexOf(pt)] = last;
          }
        }, 500);
        break;
      }
    }
  };

  useEffect(() => {
    fetch('/sparkle.png')
      .then((r) => r.blob())
      .then((blob) => {
        document.addEventListener('wheel', spawn(blob));
        document.addEventListener('mousemove', spawn(blob));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
};

export default CursorTrail;
