'use client';
import {useSettings} from './Preferences';

// Flowchart node types
export type FlowchartNodeType = "start" | "end" | "input" | "output" | "process" | "decision";

export interface FlowchartNode {
  id: string;
  type: FlowchartNodeType;
  text: string;
  // Position relative (0-100 for x, 0-100 for y as percentage of canvas)
  x: number;
  y: number;
}

export interface FlowchartEdge {
  from: string;
  to: string;
  label?: string; // "نعم" / "لا" / etc
}

export interface FlowchartData {
  nodes: FlowchartNode[];
  edges: FlowchartEdge[];
}

const nodeConfig: Record<FlowchartNodeType, { color: string; bg: string; shape: "oval" | "rect" | "parallelogram" | "diamond" }> = {
  start: { color: "#34d399", bg: "rgba(52, 211, 153, 0.12)", shape: "oval" },
  end: { color: "#f43f5e", bg: "rgba(244, 63, 94, 0.12)", shape: "oval" },
  input: { color: "#22d3ee", bg: "rgba(34, 211, 238, 0.12)", shape: "parallelogram" },
  output: { color: "#22d3ee", bg: "rgba(34, 211, 238, 0.12)", shape: "parallelogram" },
  process: { color: "#a855f7", bg: "rgba(168, 85, 247, 0.12)", shape: "rect" },
  decision: { color: "#fbbf24", bg: "rgba(251, 191, 36, 0.12)", shape: "diamond" },
};

export function FlowchartRenderer({ data, accentColor = "#22d3ee" }: { data: FlowchartData; accentColor?: string }) {
  const {t:tx,locale}=useSettings();

  const width = 600;
  const height = Math.max(300, data.nodes.length * 80 + 40);

  // Helper to get node shape path
  const getNodePath = (node: FlowchartNode, w: number, h: number) => {
    const cx = (node.x / 100) * width;
    const cy = (node.y / 100) * height;
    const cfg = nodeConfig[node.type];

    switch (cfg.shape) {
      case "oval":
        return `M ${cx - w/2} ${cy - h/2 + 12} Q ${cx - w/2} ${cy - h/2} ${cx - w/2 + 12} ${cy - h/2} L ${cx + w/2 - 12} ${cy - h/2} Q ${cx + w/2} ${cy - h/2} ${cx + w/2} ${cy - h/2 + 12} L ${cx + w/2} ${cy + h/2 - 12} Q ${cx + w/2} ${cy + h/2} ${cx + w/2 - 12} ${cy + h/2} L ${cx - w/2 + 12} ${cy + h/2} Q ${cx - w/2} ${cy + h/2} ${cx - w/2} ${cy + h/2 - 12} Z`;
      case "rect":
        return `M ${cx - w/2} ${cy - h/2} L ${cx + w/2} ${cy - h/2} L ${cx + w/2} ${cy + h/2} L ${cx - w/2} ${cy + h/2} Z`;
      case "parallelogram":
        const skew = 15;
        return `M ${cx - w/2 + skew} ${cy - h/2} L ${cx + w/2} ${cy - h/2} L ${cx + w/2 - skew} ${cy + h/2} L ${cx - w/2} ${cy + h/2} Z`;
      case "diamond":
        return `M ${cx} ${cy - h/2} L ${cx + w/2} ${cy} L ${cx} ${cy + h/2} L ${cx - w/2} ${cy} Z`;
    }
  };

  // Get center of a node
  const getCenter = (node: FlowchartNode) => ({
    x: (node.x / 100) * width,
    y: (node.y / 100) * height,
  });

  // Get edge points (from bottom of source to top of target, or side for decision)
  const getEdgePath = (from: FlowchartNode, to: FlowchartNode) => {
    const fromCenter = getCenter(from);
    const toCenter = getCenter(to);
    const fromH = 50;
    const toH = 50;

    // If same column, draw straight line
    if (Math.abs(fromCenter.x - toCenter.x) < 30) {
      return `M ${fromCenter.x} ${fromCenter.y + fromH/2} L ${toCenter.x} ${toCenter.y - toH/2}`;
    }

    // If different columns, draw L-shaped path
    const midY = (fromCenter.y + toCenter.y) / 2;
    // Exit from side of decision node
    const exitX = from.type === "decision"
      ? (toCenter.x > fromCenter.x ? fromCenter.x + 70 : fromCenter.x - 70)
      : fromCenter.x;
    const exitY = from.type === "decision" ? fromCenter.y : fromCenter.y + fromH/2;

    return `M ${exitX} ${exitY} L ${exitX} ${midY} L ${toCenter.x} ${midY} L ${toCenter.x} ${toCenter.y - toH/2}`;
  };

  return (
    <div className="rounded-xl overflow-hidden" style={{ background: "rgba(5, 8, 22, 0.6)", border: `1px solid ${accentColor}20` }}>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" style={{ minHeight: "250px" }}>
        <defs>
          <marker id={`arrow-${accentColor.replace("#", "")}`} markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 Z" fill={accentColor} opacity="0.6" />
          </marker>
        </defs>

        {/* Edges */}
        {data.edges.map((edge, i) => {
          const fromNode = data.nodes.find(n => n.id === edge.from);
          const toNode = data.nodes.find(n => n.id === edge.to);
          if (!fromNode || !toNode) return null;
          const path = getEdgePath(fromNode, toNode);
          const fromCenter = getCenter(fromNode);
          const toCenter = getCenter(toNode);

          return (
            <g key={`edge-${i}`}>
              <path d={path} fill="none" stroke={accentColor} strokeWidth="2" opacity="0.5" markerEnd={`url(#arrow-${accentColor.replace("#", "")})`} />
              {edge.label && (
                <text
                  x={Math.abs(fromCenter.x - toCenter.x) < 30 ? fromCenter.x + 30 : (fromCenter.x + toCenter.x) / 2}
                  y={(fromCenter.y + toCenter.y) / 2 - 5}
                  fill={tx(edge.label === "نعم" || edge.label === "Yes" ? "#34d399" : "#f43f5e")}
                  fontSize="11"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {tx(edge.label || '')}
                </text>
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {data.nodes.map((node) => {
          const cfg = nodeConfig[node.type];
          const w = node.type === "decision" ? 140 : 160;
          const h = node.type === "decision" ? 60 : 44;
          const path = getNodePath(node, w, h);
          const center = getCenter(node);

          return (
            <g key={node.id}>
              <path d={path} fill={cfg.bg} stroke={cfg.color} strokeWidth="2" />
              {/* Foreign object for text wrapping */}
              <foreignObject x={center.x - w/2 + 5} y={center.y - h/2 + 2} width={w - 10} height={h - 4}>
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  height: "100%", textAlign: "center",
                  fontSize: "11px", fontWeight: "bold", color: cfg.color,
                  fontFamily: "var(--font-cairo), sans-serif",
                  lineHeight: "1.2", overflow: "hidden",
                }}>
                  {node.text}
                </div>
              </foreignObject>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-3 px-4 py-2 border-t" style={{ borderColor: `${accentColor}15` }}>
        {Object.entries(nodeConfig).filter(([key]) => key !== "input").map(([key, cfg]) => (
          <div key={key} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded" style={{ background: cfg.color }} />
            <span className="text-[10px] text-muted-foreground">
              {tx(key === "start" ? "بداية" : key === "end" ? "نهاية" : key === "output" ? "إدخال/إخراج" : key === "process" ? "عملية" : "قرار")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
