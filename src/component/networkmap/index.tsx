// ── Bangladesh Map SVG (simplified) ───────────────────────────────────────
import { FaMapMarkerAlt, FaLeaf } from "react-icons/fa";
import { MdElectricBolt } from "react-icons/md";
import styles from "./map.module.scss";
export default function BangladeshMap() {
  const nodes = [
    { x: 52, y: 38, city: "Dhaka", size: 14, active: true },
    { x: 35, y: 22, city: "Rajshahi", size: 10, active: true },
    { x: 68, y: 18, city: "Sylhet", size: 9, active: true },
    { x: 72, y: 55, city: "Chittagong", size: 12, active: true },
    { x: 28, y: 55, city: "Khulna", size: 10, active: true },
    { x: 48, y: 60, city: "Barisal", size: 8, active: true },
    { x: 43, y: 28, city: "Mymensingh", size: 8, active: true },
    { x: 20, y: 38, city: "Jessore", size: 7, active: true },
    { x: 60, y: 42, city: "Comilla", size: 9, active: true },
    { x: 55, y: 70, city: "Cox's Bazar", size: 7, active: true },
    { x: 38, y: 45, city: "Faridpur", size: 6, active: false },
    { x: 63, y: 30, city: "Brahmanbaria", size: 6, active: false },
  ];

  const connections = [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [0, 6],
    [0, 8],
    [1, 6],
    [2, 8],
    [3, 5],
    [4, 5],
    [8, 9],
  ];

  return (
    <div className={styles.mapWrapper}>
      <svg viewBox="0 0 100 85" className={styles.mapSvg}>
        {/* Bangladesh outline (simplified path) */}
        <path
          d="M22,10 L28,8 L38,7 L50,8 L60,10 L70,12 L78,18 L80,28 L78,38 L76,48 L72,55 L70,62 L66,70 L60,76 L54,80 L48,78 L42,76 L36,70 L30,65 L24,58 L18,50 L14,42 L12,32 L14,22 L18,14 Z"
          fill="rgba(11,107,58,0.08)"
          stroke="rgba(11,107,58,0.3)"
          strokeWidth="0.8"
        />

        {/* Connection lines */}
        {connections.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke={nodes[a].active && nodes[b].active ? "#0B6B3A" : "#ccc"}
            strokeWidth="0.4"
            strokeDasharray="2,1"
            opacity="0.5"
            className={styles.mapLine}
          />
        ))}

        {/* Energy pulse animations on active lines */}
        {connections
          .filter(([a, b]) => nodes[a].active && nodes[b].active)
          .slice(0, 5)
          .map(([a, b], i) => (
            <circle key={`pulse-${i}`} r="0.8" fill="#F9B233" opacity="0.8">
              <animateMotion
                dur={`${2 + i * 0.5}s`}
                repeatCount="indefinite"
                path={`M ${nodes[a].x},${nodes[a].y} L ${nodes[b].x},${nodes[b].y}`}
              />
            </circle>
          ))}

        {/* Node circles */}
        {nodes.map((n, i) => (
          <g key={i} className={styles.mapNode}>
            {n.active && (
              <circle
                cx={n.x}
                cy={n.y}
                r={n.size * 0.8}
                fill="#0B6B3A"
                opacity="0.12"
              >
                <animate
                  attributeName="r"
                  values={`${n.size * 0.6};${n.size * 1.2};${n.size * 0.6}`}
                  dur="2.5s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.12;0.04;0.12"
                  dur="2.5s"
                  repeatCount="indefinite"
                />
              </circle>
            )}
            <circle
              cx={n.x}
              cy={n.y}
              r={n.size * 0.45}
              fill={n.active ? "#0B6B3A" : "#aaa"}
              stroke="white"
              strokeWidth="0.8"
            />
            <text
              x={n.x}
              y={n.y + n.size * 0.45 + 3}
              textAnchor="middle"
              fontSize="3"
              fill="#333"
              fontWeight="600"
            >
              {n.city}
            </text>
          </g>
        ))}

        {/* Live badge on Dhaka */}
        <rect x="44" y="28" width="16" height="5" rx="2" fill="#F9B233" />
        <text
          x="52"
          y="31.8"
          textAnchor="middle"
          fontSize="2.8"
          fill="#333"
          fontWeight="700"
        >
          ● LIVE
        </text>
      </svg>

      {/* Floating info cards on map */}
      <div className={`${styles.mapBadge} ${styles["mapBadge--tl"]}`}>
        <MdElectricBolt /> <span>2.4 MW Live</span>
      </div>
      <div className={`${styles.mapBadge} ${styles["mapBadge--tr"]}`}>
        <FaMapMarkerAlt /> <span>847 Sites</span>
      </div>
      <div className={`${styles.mapBadge} ${styles["mapBadge--bl"]}`}>
        <FaLeaf /> <span>12t CO₂ Saved</span>
      </div>
    </div>
  );
}
