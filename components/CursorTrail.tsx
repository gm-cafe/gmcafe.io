import { RefObject, useEffect } from 'react';
import sparkle from '../public/sparkle.png';

type CursorTrailProps = {
  parentRef: RefObject<HTMLDivElement>;
};

type Pos = {
  x: number;
  y: number;
  s: number;
};

const CursorTrail = ({ parentRef }: CursorTrailProps) => {
  const jiggle = 50;
  const minSize = 8;
  const maxSize = 48;
  const maxCount = 200;
  const stack: Pos[] = [];

  const spawn = (e: MouseEvent) => {
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
        let img = new Image();
        img.src = sparkle.src;
        img.style.position = 'absolute';
        img.style.left = `${x}px`;
        img.style.top = `${y}px`;
        img.style.width = img.style.height = `${s}px`;
        img.style.pointerEvents = 'none';
        document.body.append(img);
        let pt = { x, y, s };
        stack.push(pt);

        setTimeout(() => {
          img.remove();
          URL.revokeObjectURL(sparkle.src);
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
    document.addEventListener('wheel', spawn);
    document.addEventListener('mousemove', spawn);

    return () => {
      document.removeEventListener('wheel', spawn);
      document.removeEventListener('mousemove', spawn);
    };
  });
  return null;
};

export default CursorTrail;
