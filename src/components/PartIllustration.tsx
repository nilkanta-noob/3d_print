import React from 'react';

// Isometric line-art "CAD renders" used as placeholders until real photos of printed parts exist.
// Faces and edges use currentColor (set text colour on the parent); holes and dimension lines use the accent.

export type PartVariant = 'bracket' | 'enclosure' | 'stepped' | 'standoffs' | 'planter' | 'organizer' | 'stand' | 'tower';

type Vec3 = [number, number, number];
type Point = [number, number];

interface Box { x: number; y: number; z: number; w: number; d: number; h: number }
interface Cylinder { cx: number; cy: number; z: number; r: number; h: number }
interface Hole { cx: number; cy: number; z: number; r: number } // circle on a horizontal face

interface PartModel {
  label: string;
  boxes: Box[]; // drawn in order: back to front, bottom to top
  cylinders?: Cylinder[];
  holes?: Hole[];
  details?: [Vec3, Vec3][];
  dimension: [Vec3, Vec3];
}

const COS30 = Math.cos(Math.PI / 6);
const ISO_RX = Math.SQRT2 * COS30; // an iso circle on a horizontal plane is an ellipse with these radius factors
const ISO_RY = Math.SQRT2 * 0.5;

// +x runs down-right, +y down-left, +z straight up
function iso([x, y, z]: Vec3): Point {
  return [(x - y) * COS30, (x + y) * 0.5 - z];
}

const PARTS: Record<PartVariant, PartModel> = {
  bracket: {
    label: 'L-shaped mounting bracket',
    boxes: [
      { x: 0, y: 0, z: 0, w: 80, d: 40, h: 8 },
      { x: 0, y: 0, z: 8, w: 10, d: 40, h: 46 },
    ],
    holes: [
      { cx: 40, cy: 20, z: 8, r: 5 },
      { cx: 64, cy: 20, z: 8, r: 5 },
    ],
    dimension: [[0, 52, 0], [80, 52, 0]],
  },
  enclosure: {
    label: 'Electronics enclosure with lid and vents',
    boxes: [
      { x: 0, y: 0, z: 0, w: 70, d: 50, h: 24 },
      { x: 0, y: 0, z: 24, w: 70, d: 50, h: 5 },
    ],
    holes: [{ cx: 14, cy: 38, z: 29, r: 3 }],
    details: [14, 21, 28, 35].map((y): [Vec3, Vec3] => [[70, y, 7], [70, y, 17]]),
    dimension: [[82, 0, 0], [82, 50, 0]],
  },
  stepped: {
    label: 'Stepped housing',
    boxes: [
      { x: 0, y: 0, z: 0, w: 72, d: 52, h: 12 },
      { x: 10, y: 10, z: 12, w: 52, d: 32, h: 12 },
      { x: 22, y: 18, z: 24, w: 28, d: 16, h: 10 },
    ],
    holes: [{ cx: 36, cy: 26, z: 34, r: 4 }],
    dimension: [[0, 64, 0], [72, 64, 0]],
  },
  standoffs: {
    label: 'Mounting plate with four standoffs',
    boxes: [{ x: 0, y: 0, z: 0, w: 84, d: 56, h: 5 }],
    cylinders: [
      { cx: 10, cy: 10, z: 5, r: 4, h: 16 },
      { cx: 74, cy: 10, z: 5, r: 4, h: 16 },
      { cx: 10, cy: 46, z: 5, r: 4, h: 16 },
      { cx: 74, cy: 46, z: 5, r: 4, h: 16 },
    ],
    holes: [10, 74].flatMap((cx) => [10, 46].map((cy) => ({ cx, cy, z: 21, r: 1.8 }))),
    dimension: [[0, 68, 0], [84, 68, 0]],
  },
  planter: {
    label: 'Planter on a saucer',
    boxes: [],
    cylinders: [
      { cx: 0, cy: 0, z: 0, r: 30, h: 5 },
      { cx: 0, cy: 0, z: 5, r: 25, h: 40 },
    ],
    holes: [{ cx: 0, cy: 0, z: 45, r: 21 }],
    dimension: [[-30, 42, 0], [30, 42, 0]],
  },
  organizer: {
    label: 'Desk organiser tray with compartments',
    boxes: [
      { x: 0, y: 0, z: 0, w: 80, d: 50, h: 4 },
      { x: 0, y: 0, z: 4, w: 80, d: 3, h: 20 },
      { x: 0, y: 3, z: 4, w: 3, d: 47, h: 20 },
      { x: 30, y: 3, z: 4, w: 2, d: 44, h: 15 },
      { x: 54, y: 3, z: 4, w: 2, d: 44, h: 15 },
      { x: 77, y: 3, z: 4, w: 3, d: 47, h: 20 },
      { x: 3, y: 47, z: 4, w: 74, d: 3, h: 20 },
    ],
    dimension: [[0, 62, 0], [80, 62, 0]],
  },
  stand: {
    label: 'Phone stand',
    boxes: [
      { x: 0, y: 0, z: 0, w: 64, d: 44, h: 6 },
      { x: 0, y: 0, z: 6, w: 8, d: 44, h: 46 },
      { x: 52, y: 0, z: 6, w: 6, d: 44, h: 8 },
    ],
    holes: [{ cx: 30, cy: 22, z: 6, r: 4 }],
    dimension: [[0, 56, 0], [64, 56, 0]],
  },
  tower: {
    label: 'Dice tower with tray',
    boxes: [
      { x: 0, y: 0, z: 0, w: 34, d: 34, h: 72 },
      { x: 34, y: 0, z: 0, w: 30, d: 34, h: 6 },
      { x: 64, y: 0, z: 0, w: 4, d: 34, h: 12 },
    ],
    holes: [{ cx: 17, cy: 17, z: 72, r: 8 }],
    details: [
      [[34, 8, 6], [34, 8, 24]],
      [[34, 8, 24], [34, 26, 24]],
      [[34, 26, 24], [34, 26, 6]],
    ],
    dimension: [[0, 46, 0], [68, 46, 0]],
  },
};

const pts = (points: Point[]) => points.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ');

function boxFaces({ x, y, z, w, d, h }: Box) {
  return {
    top: [iso([x, y, z + h]), iso([x + w, y, z + h]), iso([x + w, y + d, z + h]), iso([x, y + d, z + h])],
    right: [iso([x + w, y, z]), iso([x + w, y + d, z]), iso([x + w, y + d, z + h]), iso([x + w, y, z + h])],
    left: [iso([x, y + d, z]), iso([x + w, y + d, z]), iso([x + w, y + d, z + h]), iso([x, y + d, z + h])],
  };
}

const STROKE = { stroke: 'currentColor', strokeWidth: 1.25, strokeLinejoin: 'round' as const, vectorEffect: 'non-scaling-stroke' as const };

export default function PartIllustration({ variant, className = '' }: { variant: PartVariant; className?: string }) {
  const part = PARTS[variant];
  // Painter's order: back to front, then bottom to top (e.g. a pot drawn after the saucer it sits on)
  const cylinders = [...(part.cylinders ?? [])].sort((a, b) => a.cx + a.cy - (b.cx + b.cy) || a.z - b.z);

  // Fit the viewBox to everything drawn
  const all: Point[] = [
    ...part.boxes.flatMap((b) => Object.values(boxFaces(b)).flat()),
    ...cylinders.flatMap((c) => {
      const [bx, by] = iso([c.cx, c.cy, c.z]);
      const [, ty] = iso([c.cx, c.cy, c.z + c.h]);
      return [[bx - c.r * ISO_RX, ty - c.r * ISO_RY], [bx + c.r * ISO_RX, by + c.r * ISO_RY]] as Point[];
    }),
    ...part.dimension.map(iso),
  ];
  const minX = Math.min(...all.map((p) => p[0])) - 8;
  const minY = Math.min(...all.map((p) => p[1])) - 8;
  const width = Math.max(...all.map((p) => p[0])) - minX + 8;
  const height = Math.max(...all.map((p) => p[1])) - minY + 8;

  const [d0, d1] = part.dimension.map(iso);

  return (
    <svg viewBox={`${minX} ${minY} ${width} ${height}`} className={className} role="img" aria-label={`Illustration: ${part.label}`} fill="none">
      {part.boxes.map((box, i) => {
        const faces = boxFaces(box);
        return (
          <g key={i}>
            <polygon points={pts(faces.left)} fill="currentColor" fillOpacity={0.04} {...STROKE} strokeOpacity={0.7} />
            <polygon points={pts(faces.right)} fill="currentColor" fillOpacity={0.09} {...STROKE} strokeOpacity={0.7} />
            <polygon points={pts(faces.top)} fill="currentColor" fillOpacity={0.16} {...STROKE} strokeOpacity={0.7} />
          </g>
        );
      })}

      {cylinders.map((c, i) => {
        const [bx, by] = iso([c.cx, c.cy, c.z]);
        const [, ty] = iso([c.cx, c.cy, c.z + c.h]);
        const rx = c.r * ISO_RX;
        const ry = c.r * ISO_RY;
        return (
          <g key={i}>
            <path d={`M ${bx - rx} ${ty} L ${bx - rx} ${by} A ${rx} ${ry} 0 0 0 ${bx + rx} ${by} L ${bx + rx} ${ty} Z`} fill="currentColor" fillOpacity={0.09} {...STROKE} strokeOpacity={0.7} />
            <ellipse cx={bx} cy={ty} rx={rx} ry={ry} fill="currentColor" fillOpacity={0.16} {...STROKE} strokeOpacity={0.7} />
          </g>
        );
      })}

      {part.details?.map(([from, to], i) => {
        const [x1, y1] = iso(from);
        const [x2, y2] = iso(to);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} {...STROKE} strokeOpacity={0.5} />;
      })}

      <g className="text-accent-primary">
        {part.holes?.map((hole, i) => {
          const [cx, cy] = iso([hole.cx, hole.cy, hole.z]);
          return <ellipse key={i} cx={cx} cy={cy} rx={hole.r * ISO_RX} ry={hole.r * ISO_RY} fill="currentColor" fillOpacity={0.15} {...STROKE} />;
        })}
        {/* Dimension line with end ticks, drawing-sheet style */}
        <line x1={d0[0]} y1={d0[1]} x2={d1[0]} y2={d1[1]} {...STROKE} strokeOpacity={0.8} />
        {[d0, d1].map(([x, y], i) => (
          <line key={i} x1={x} y1={y - 4} x2={x} y2={y + 4} {...STROKE} strokeOpacity={0.8} />
        ))}
      </g>
    </svg>
  );
}
