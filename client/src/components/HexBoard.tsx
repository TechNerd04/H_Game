import React from 'react';

interface HexCellData {
  id: string;
  q: number;
  r: number;
  ownerId: string | null;
  letter?: string;
}

interface HexBoardProps {
  board: Record<string, HexCellData>;
  players: any[];
  onCellClick?: (id: string) => void;
  interactive?: boolean;
  selectedCellId?: string | null;
  highlightedCells?: string[];
}

export default function HexBoard({ board, players, onCellClick, interactive = false, selectedCellId = null, highlightedCells = [] }: HexBoardProps) {
  const hexSize = 45;
  const sqrt3 = Math.sqrt(3);

  // Helper to get pixel coordinates from axial coordinates
  const getCenter = (q: number, r: number) => {
    const x = hexSize * sqrt3 * (q + r / 2);
    const y = hexSize * 1.5 * r;
    return { x, y };
  };

  const getHexPoints = (cx: number, cy: number) => {
    let points = [];
    for (let i = 0; i < 6; i++) {
      const angle_deg = 60 * i - 30;
      const angle_rad = Math.PI / 180 * angle_deg;
      points.push(`${cx + hexSize * Math.cos(angle_rad)},${cy + hexSize * Math.sin(angle_rad)}`);
    }
    return points.join(' ');
  };

  const getPlayerColor = (cellId: string, ownerId: string | null) => {
    if (cellId === selectedCellId) return 'gray';
    if (!ownerId) return 'var(--hex-neutral)';
    const player = players.find(p => p.socketId === ownerId);
    return player ? player.color : 'var(--hex-neutral)';
  };

  // Find bounding box to center SVG
  let minX = 0, maxX = 0, minY = 0, maxY = 0;
  Object.values(board).forEach(({ q, r }) => {
    const { x, y } = getCenter(q, r);
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  });

  const padding = hexSize * 2;
  const width = (maxX - minX) + padding * 2;
  const height = (maxY - minY) + padding * 2;
  const viewBox = `${minX - padding} ${minY - padding} ${width} ${height}`;

  return (
    <div className="hex-board-container">
      <svg viewBox={viewBox} style={{ width: '100%', height: '100%', maxHeight: '70vh' }}>
        {Object.values(board).map((cell) => {
          const { x, y } = getCenter(cell.q, cell.r);
          const isClaimed = cell.ownerId !== null;
          const isHighlighted = highlightedCells.includes(cell.id);
          return (
            <g key={cell.id} className={`hex-cell ${isClaimed ? 'claimed' : ''} ${isHighlighted ? 'tutorial-highlight' : ''}`}>
              <polygon
                points={getHexPoints(x, y)}
                fill={getPlayerColor(cell.id, cell.ownerId)}
                stroke="var(--hex-stroke)"
                strokeWidth="4"
                onClick={() => {
                  if (interactive && !isClaimed && onCellClick) onCellClick(cell.id);
                }}
                style={{
                  transition: 'all 0.3s ease'
                }}
              >
                {interactive && !isClaimed && <title>Select {cell.id}</title>}
              </polygon>
              {cell.letter && (
                <text
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="var(--text-main)"
                  fontSize={hexSize * 0.6}
                  fontWeight="900"
                  style={{ pointerEvents: 'none', opacity: 0.8 }}
                >
                  {cell.letter}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
