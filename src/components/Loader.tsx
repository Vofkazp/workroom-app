import React from 'react';

const sizeObj = {
  mini: {size: 24, width: 3.8},
  small: {size: 40, width: 6.4},
  medium: {size: 56, width: 9},
  large: {size: 72, width: 11.5},
}

const speedObj = {
  verySlow: 1.4,
  slow: 1.2,
  average: 1,
  fast: 0.8,
  veryFast: 0.6
}

type Speed = keyof typeof speedObj;
type Size = keyof typeof sizeObj;

export default function Loader({size, speed}: {size: Size; speed: Speed}) {


  return (
      <>
        <style>
          {`
          @keyframes spinner {
            to { transform: rotate(1turn); }
          }
        `}
        </style>

        <div
            style={{
              position: 'absolute',
              top: `calc(50% - ${sizeObj[size].size / 2}px)`,
              left: `calc(50% - ${sizeObj[size].size / 2}px)`,
              width: sizeObj[size].size,
              height: sizeObj[size].size,
              borderRadius: "50%",
              background:
                  `radial-gradient(farthest-side,#3f8cff 94%,transparent) top/${sizeObj[size].width}px ${sizeObj[size].width}px no-repeat, conic-gradient(transparent 30%,#3f8cff)`,
              WebkitMask:
                  `radial-gradient(farthest-side,transparent calc(100% - ${sizeObj[size].width}px),black 0)`,
              animation: `spinner ${speedObj[speed]}s infinite linear`,
            }}
        />
      </>
  );
}