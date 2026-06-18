"use client";

import { motion, useReducedMotion } from "framer-motion";

type Point = readonly [number, number];

type Trace = {
  id: string;
  points: readonly Point[];
  duration: number;
  delay: number;
  hold: number;
  gap: number;
  width?: number;
  accent?: "blue" | "aqua";
};

const traces: readonly Trace[] = [
  {
    id: "core-edge-a",
    points: [
      [80, 154],
      [198, 154],
      [198, 104],
      [336, 104],
      [336, 150],
      [478, 150],
    ],
    duration: 4.2,
    delay: 0.2,
    hold: 3.2,
    gap: 5.8,
    width: 1.4,
    accent: "aqua",
  },
  {
    id: "core-edge-b",
    points: [
      [1120, 176],
      [986, 176],
      [986, 126],
      [844, 126],
      [844, 184],
      [688, 184],
    ],
    duration: 4.8,
    delay: 2.1,
    hold: 2.6,
    gap: 6.4,
    width: 1.2,
  },
  {
    id: "north-spine",
    points: [
      [420, 42],
      [420, 86],
      [522, 86],
      [522, 128],
      [630, 128],
      [630, 220],
    ],
    duration: 3.9,
    delay: 4.8,
    hold: 2.8,
    gap: 5.2,
    width: 1.2,
    accent: "aqua",
  },
  {
    id: "south-spine",
    points: [
      [756, 560],
      [756, 498],
      [656, 498],
      [656, 426],
      [548, 426],
      [548, 344],
    ],
    duration: 4.4,
    delay: 1.4,
    hold: 3,
    gap: 6,
    width: 1.3,
  },
  {
    id: "storage-path",
    points: [
      [64, 430],
      [188, 430],
      [188, 360],
      [314, 360],
      [314, 288],
      [482, 288],
    ],
    duration: 5.1,
    delay: 6.3,
    hold: 2.8,
    gap: 4.7,
    width: 1.1,
  },
  {
    id: "service-bus",
    points: [
      [1138, 412],
      [1034, 412],
      [1034, 352],
      [902, 352],
      [902, 286],
      [740, 286],
    ],
    duration: 4.7,
    delay: 8.2,
    hold: 2.4,
    gap: 5.6,
    width: 1.25,
    accent: "aqua",
  },
  {
    id: "identity-link",
    points: [
      [236, 548],
      [236, 500],
      [368, 500],
      [368, 452],
      [498, 452],
      [498, 388],
    ],
    duration: 3.7,
    delay: 3.5,
    hold: 2.9,
    gap: 7,
    width: 1,
  },
  {
    id: "analytics-link",
    points: [
      [970, 64],
      [970, 92],
      [886, 92],
      [886, 220],
      [778, 220],
      [778, 260],
    ],
    duration: 3.5,
    delay: 5.6,
    hold: 2.5,
    gap: 6.8,
    width: 1,
  },
  {
    id: "api-mesh-a",
    points: [
      [386, 236],
      [454, 236],
      [454, 196],
      [560, 196],
      [560, 260],
      [658, 260],
    ],
    duration: 3.2,
    delay: 9.4,
    hold: 2.6,
    gap: 5.1,
    width: 1.15,
    accent: "aqua",
  },
  {
    id: "api-mesh-b",
    points: [
      [820, 472],
      [752, 472],
      [752, 392],
      [680, 392],
      [680, 326],
      [598, 326],
    ],
    duration: 3.6,
    delay: 10.8,
    hold: 2.2,
    gap: 4.8,
    width: 1.15,
  },
];

const dormantPaths = [
  "M122 260 H256 V210 H368",
  "M830 534 H950 V486 H1076",
  "M520 52 H676 V94 H782",
  "M150 98 H250 V60 H360",
  "M908 248 H1018 V302 H1134",
  "M324 584 V536 H458 V488",
  "M706 74 V150 H758",
  "M103 362 H238 V314",
];

const particles = [
  { cx: 160, cy: 132, r: 1.4, delay: 0.4, duration: 9 },
  { cx: 292, cy: 474, r: 1.1, delay: 1.7, duration: 11 },
  { cx: 516, cy: 210, r: 1.3, delay: 2.8, duration: 10 },
  { cx: 702, cy: 116, r: 1, delay: 4.2, duration: 12 },
  { cx: 872, cy: 404, r: 1.5, delay: 0.9, duration: 10.5 },
  { cx: 1048, cy: 258, r: 1.2, delay: 3.6, duration: 9.5 },
];

function toPath(points: readonly Point[]) {
  return points
    .map(([x, y], index) => `${index === 0 ? "M" : "L"}${x} ${y}`)
    .join(" ");
}

function distance(a: Point, b: Point) {
  return Math.hypot(b[0] - a[0], b[1] - a[1]);
}

function keyTimes(points: readonly Point[]) {
  const segments = points
    .slice(1)
    .map((point, index) => distance(points[index], point));
  const total = segments.reduce((sum, length) => sum + length, 0);
  let elapsed = 0;

  return [
    0,
    ...segments.map((length) => {
      elapsed += length;
      return Number((elapsed / total).toFixed(3));
    }),
  ];
}

function endpoint(points: readonly Point[]) {
  return points[points.length - 1];
}

export default function PcbTraceBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 640"
        preserveAspectRatio="xMidYMid slice"
        role="presentation"
      >
        <defs>
          <filter id="traceGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="0 0 0 0 0.16 0 0 0 0 0.51 0 0 0 0 0.72 0 0 0 0.8 0"
            />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="nodeGlow" x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="traceBlue" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#18364A" />
            <stop offset="48%" stopColor="#2A82B7" />
            <stop offset="100%" stopColor="#5797B1" />
          </linearGradient>
          <linearGradient id="traceAqua" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#103145" />
            <stop offset="42%" stopColor="#5797B1" />
            <stop offset="100%" stopColor="#D7ECF5" />
          </linearGradient>
          <radialGradient id="pulseCore">
            <stop offset="0%" stopColor="#F5FBFF" />
            <stop offset="42%" stopColor="#5797B1" />
            <stop offset="100%" stopColor="#2A82B7" stopOpacity="0" />
          </radialGradient>
          <pattern
            id="pcbGrid"
            width="56"
            height="56"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M56 0H0V56"
              fill="none"
              stroke="#5797B1"
              strokeOpacity="0.11"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        <rect width="1200" height="640" fill="#06131D" />
        <rect width="1200" height="640" fill="url(#pcbGrid)" opacity="0.55" />
        <path
          d="M0 430C170 348 302 380 466 286C642 184 742 96 1200 118V640H0Z"
          fill="#103145"
          opacity="0.16"
        />
        <path
          d="M0 102C176 132 270 214 444 190C650 162 766 34 1200 44"
          fill="none"
          stroke="#5797B1"
          strokeOpacity="0.05"
          strokeWidth="90"
        />

        <g opacity="0.42">
          {dormantPaths.map((path) => (
            <path
              key={path}
              d={path}
              fill="none"
              stroke="#5797B1"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity="0.16"
              strokeWidth="1"
            />
          ))}
        </g>

        <g>
          {traces.map((trace) => {
            const [endX, endY] = endpoint(trace.points);
            const period = trace.duration + trace.hold + trace.gap;
            const times = keyTimes(trace.points);
            const xFrames = trace.points.map(([x]) => x);
            const yFrames = trace.points.map(([, y]) => y);
            const stroke =
              trace.accent === "aqua" ? "url(#traceAqua)" : "url(#traceBlue)";

            return (
              <g key={trace.id}>
                <motion.path
                  d={toPath(trace.points)}
                  pathLength={1}
                  fill="none"
                  stroke={stroke}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={trace.width ?? 1.1}
                  strokeDasharray="1"
                  filter="url(#traceGlow)"
                  initial={{ strokeDashoffset: reduceMotion ? 0 : 1, opacity: reduceMotion ? 0.24 : 0 }}
                  animate={{
                    strokeDashoffset: reduceMotion ? 0 : [1, 0, 0, 0],
                    opacity: reduceMotion ? 0.24 : [0, 1, 0.88, 0.26],
                  }}
                  transition={{
                    duration: period,
                    delay: trace.delay,
                    repeat: Infinity,
                    times: [
                      0,
                      trace.duration / period,
                      (trace.duration + trace.hold) / period,
                      1,
                    ],
                    ease: "linear",
                  }}
                />
                <motion.path
                  d={toPath(trace.points)}
                  pathLength={1}
                  fill="none"
                  stroke="#D7ECF5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={(trace.width ?? 1.1) + 2.8}
                  strokeDasharray="0.025 1"
                  filter="url(#traceGlow)"
                  initial={{ strokeDashoffset: reduceMotion ? 0 : 1, opacity: 0 }}
                  animate={{
                    strokeDashoffset: reduceMotion ? 0 : [1, 0, 0, 0],
                    opacity: reduceMotion ? 0 : [0, 0.95, 0, 0],
                  }}
                  transition={{
                    duration: period,
                    delay: trace.delay,
                    repeat: Infinity,
                    times: [
                      0,
                      trace.duration / period,
                      (trace.duration + 0.01) / period,
                      1,
                    ],
                    ease: "linear",
                  }}
                />
                {!reduceMotion && (
                  <motion.circle
                  r="7"
                  fill="url(#pulseCore)"
                  filter="url(#nodeGlow)"
                  initial={{
                    cx: trace.points[0][0],
                    cy: trace.points[0][1],
                    opacity: 0,
                    scale: 0.6,
                  }}
                  animate={{
                    cx: [...xFrames, endX, endX],
                    cy: [...yFrames, endY, endY],
                    opacity: [...xFrames.map(() => 1), 0, 0],
                    scale: [...xFrames.map(() => 1), 0.68, 0.68],
                  }}
                  transition={{
                    duration: period,
                    delay: trace.delay,
                    repeat: Infinity,
                    times: [
                      ...times.map((time) => time * (trace.duration / period)),
                      (trace.duration + 0.08) / period,
                      1,
                    ],
                    ease: "linear",
                  }}
                  />
                )}
                <motion.circle
                  cx={endX}
                  cy={endY}
                  r="4"
                  fill="#D7ECF5"
                  filter="url(#nodeGlow)"
                  initial={{ opacity: reduceMotion ? 0.3 : 0, scale: reduceMotion ? 0.9 : 0.4 }}
                  animate={{
                    opacity: reduceMotion ? 0.3 : [0, 0, 1, 0.82, 0],
                    scale: reduceMotion ? 0.9 : [0.4, 0.4, 1.28, 1, 0.72],
                  }}
                  transition={{
                    duration: period,
                    delay: trace.delay,
                    repeat: Infinity,
                    times: [
                      0,
                      trace.duration / period,
                      (trace.duration + 0.18) / period,
                      (trace.duration + trace.hold) / period,
                      1,
                    ],
                    ease: "easeOut",
                  }}
                />
                {!reduceMotion && (
                  <motion.circle
                  cx={endX}
                  cy={endY}
                  r="13"
                  fill="none"
                  stroke="#5797B1"
                  strokeWidth="1"
                  filter="url(#nodeGlow)"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{
                    opacity: [0, 0, 0.55, 0.12, 0],
                    scale: [0.5, 0.5, 1.15, 1.8, 1.8],
                  }}
                  transition={{
                    duration: period,
                    delay: trace.delay,
                    repeat: Infinity,
                    times: [
                      0,
                      trace.duration / period,
                      (trace.duration + 0.16) / period,
                      (trace.duration + 1.4) / period,
                      1,
                    ],
                    ease: "easeOut",
                  }}
                  />
                )}
              </g>
            );
          })}
        </g>

        <g opacity="0.72">
          {particles.map((particle) => (
            <motion.circle
              key={`${particle.cx}-${particle.cy}`}
              cx={particle.cx}
              cy={particle.cy}
              r={particle.r}
              fill="#D7ECF5"
              filter="url(#nodeGlow)"
              initial={{ opacity: reduceMotion ? 0.18 : 0 }}
              animate={{
                opacity: reduceMotion ? 0.18 : [0.08, 0.62, 0.18, 0.48, 0.08],
                y: reduceMotion ? 0 : [0, -14, -5, -18, 0],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </g>
      </svg>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_42%_36%,rgba(87,151,177,0.16),transparent_30%),linear-gradient(90deg,rgba(6,19,29,0.94),rgba(6,19,29,0.42)_46%,rgba(6,19,29,0.86)),linear-gradient(180deg,rgba(6,19,29,0.10),rgba(6,19,29,0.82)_88%)]" />
      <div className="absolute inset-0 noise opacity-60" />
    </div>
  );
}
