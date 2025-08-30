import React from 'react';
import { useBusinessPlan } from '../context/BusinessPlanContext';

const BusinessFlowDiagram = () => {
  const { state } = useBusinessPlan();

  // SVG dimensions and layout
  const svgWidth = 1200;
  const svgHeight = 400;
  const nodeWidth = 120;
  const nodeHeight = 60;

  // Calculate positions
  const positions = {
    atabridge: { x: 50, y: 170 },
    suppliers: state.suppliers.map((_, index) => ({
      x: 250 + (index * 150),
      y: 50 + ((index % 2) * 120)
    })),
    ertug: { x: 850, y: 120 },
    fiyuu: { x: 850, y: 220 },
    endUser: { x: 1050, y: 170 }
  };

  // Helper function to create arrow paths
  const createArrowPath = (start, end, isDashed = false) => {
    const midX = (start.x + end.x) / 2;
    return (
      <g key={`${start.x}-${start.y}-${end.x}-${end.y}`}>
        <path
          d={`M ${start.x + nodeWidth} ${start.y + nodeHeight/2} 
              Q ${midX} ${start.y + nodeHeight/2} ${end.x} ${end.y + nodeHeight/2}`}
          stroke={isDashed ? "#fb923c" : "#ea580c"}
          strokeWidth="2"
          fill="none"
          strokeDasharray={isDashed ? "5,5" : "none"}
          markerEnd="url(#arrowhead)"
        />
      </g>
    );
  };

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <svg width={svgWidth} height={svgHeight} className="border border-gray-200 rounded-lg bg-gradient-to-r from-orange-50 to-amber-50">
          {/* Define arrow marker */}
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#ea580c" />
            </marker>
          </defs>

          {/* AtaBridge Node */}
          <g>
            <rect
              x={positions.atabridge.x}
              y={positions.atabridge.y}
              width={nodeWidth}
              height={nodeHeight}
              rx="8"
              fill="#fb923c"
              stroke="#ea580c"
              strokeWidth="2"
            />
            <text
              x={positions.atabridge.x + nodeWidth/2}
              y={positions.atabridge.y + nodeHeight/2 - 5}
              textAnchor="middle"
              className="fill-white text-sm font-semibold"
            >
              AtaBridge
            </text>
            <text
              x={positions.atabridge.x + nodeWidth/2}
              y={positions.atabridge.y + nodeHeight/2 + 8}
              textAnchor="middle"
              className="fill-white text-xs"
            >
              Danışmanlık
            </text>
          </g>

          {/* Supplier Nodes */}
          {state.suppliers.map((supplier, index) => {
            const pos = positions.suppliers[index];
            if (!pos) return null;
            
            return (
              <g key={supplier.id}>
                <rect
                  x={pos.x}
                  y={pos.y}
                  width={nodeWidth}
                  height={nodeHeight}
                  rx="6"
                  fill="#f3f4f6"
                  stroke="#9ca3af"
                  strokeWidth="2"
                />
                <text
                  x={pos.x + nodeWidth/2}
                  y={pos.y + nodeHeight/2}
                  textAnchor="middle"
                  className="fill-gray-700 text-sm font-medium"
                >
                  {supplier.name}
                </text>
              </g>
            );
          })}

          {/* Ertug Node */}
          <g>
            <rect
              x={positions.ertug.x}
              y={positions.ertug.y}
              width={nodeWidth}
              height={nodeHeight}
              rx="8"
              fill="#10b981"
              stroke="#047857"
              strokeWidth="2"
            />
            <text
              x={positions.ertug.x + nodeWidth/2}
              y={positions.ertug.y + nodeHeight/2 - 5}
              textAnchor="middle"
              className="fill-white text-sm font-semibold"
            >
              Ertuğ
            </text>
            <text
              x={positions.ertug.x + nodeWidth/2}
              y={positions.ertug.y + nodeHeight/2 + 8}
              textAnchor="middle"
              className="fill-white text-xs"
            >
              Üretim
            </text>
          </g>

          {/* Fiyuu Node */}
          <g>
            <rect
              x={positions.fiyuu.x}
              y={positions.fiyuu.y}
              width={nodeWidth}
              height={nodeHeight}
              rx="8"
              fill="#3b82f6"
              stroke="#1d4ed8"
              strokeWidth="2"
            />
            <text
              x={positions.fiyuu.x + nodeWidth/2}
              y={positions.fiyuu.y + nodeHeight/2 - 5}
              textAnchor="middle"
              className="fill-white text-sm font-semibold"
            >
              Fiyuu
            </text>
            <text
              x={positions.fiyuu.x + nodeWidth/2}
              y={positions.fiyuu.y + nodeHeight/2 + 8}
              textAnchor="middle"
              className="fill-white text-xs"
            >
              Satış & Swap
            </text>
          </g>

          {/* End User Node */}
          <g>
            <rect
              x={positions.endUser.x}
              y={positions.endUser.y}
              width={nodeWidth}
              height={nodeHeight}
              rx="8"
              fill="#8b5cf6"
              stroke="#7c3aed"
              strokeWidth="2"
            />
            <text
              x={positions.endUser.x + nodeWidth/2}
              y={positions.endUser.y + nodeHeight/2 - 5}
              textAnchor="middle"
              className="fill-white text-sm font-semibold"
            >
              Kurye
            </text>
            <text
              x={positions.endUser.x + nodeWidth/2}
              y={positions.endUser.y + nodeHeight/2 + 8}
              textAnchor="middle"
              className="fill-white text-xs"
            >
              Son Kullanıcı
            </text>
          </g>

          {/* Arrows */}
          {/* AtaBridge to Suppliers (dashed - consultancy) */}
          {state.businessFlow.atabridgeConnections.map(supplierId => {
            const supplierIndex = state.suppliers.findIndex(s => s.id === supplierId);
            if (supplierIndex === -1) return null;
            const supplierPos = positions.suppliers[supplierIndex];
            if (!supplierPos) return null;
            
            return createArrowPath(
              { x: positions.atabridge.x, y: positions.atabridge.y },
              { x: supplierPos.x, y: supplierPos.y },
              true
            );
          })}

          {/* Suppliers to Ertug (solid - purchase) */}
          {state.businessFlow.supplierToErtug.map(supplierId => {
            const supplierIndex = state.suppliers.findIndex(s => s.id === supplierId);
            if (supplierIndex === -1) return null;
            const supplierPos = positions.suppliers[supplierIndex];
            if (!supplierPos) return null;
            
            return createArrowPath(
              { x: supplierPos.x, y: supplierPos.y },
              { x: positions.ertug.x, y: positions.ertug.y }
            );
          })}

          {/* Suppliers to Fiyuu (solid - purchase) */}
          {state.businessFlow.supplierToFiyuu.map(supplierId => {
            const supplierIndex = state.suppliers.findIndex(s => s.id === supplierId);
            if (supplierIndex === -1) return null;
            const supplierPos = positions.suppliers[supplierIndex];
            if (!supplierPos) return null;
            
            return createArrowPath(
              { x: supplierPos.x, y: supplierPos.y },
              { x: positions.fiyuu.x, y: positions.fiyuu.y }
            );
          })}

          {/* Ertug to Fiyuu */}
          {state.businessFlow.ertugToFiyuu && createArrowPath(
            { x: positions.ertug.x, y: positions.ertug.y },
            { x: positions.fiyuu.x, y: positions.fiyuu.y }
          )}

          {/* Fiyuu to End User */}
          {(state.businessFlow.fiyuuToEndUser.emoped || state.businessFlow.fiyuuToEndUser.battery) && 
            createArrowPath(
              { x: positions.fiyuu.x, y: positions.fiyuu.y },
              { x: positions.endUser.x, y: positions.endUser.y }
            )
          }

          {/* Labels for connections */}
          {state.businessFlow.ertugToFiyuu && (
            <text
              x={(positions.ertug.x + positions.fiyuu.x) / 2 + nodeWidth / 2}
              y={(positions.ertug.y + positions.fiyuu.y) / 2 + nodeHeight / 2 - 10}
              textAnchor="middle"
              className="fill-gray-600 text-xs font-medium"
            >
              E-moped
            </text>
          )}

          {(state.businessFlow.fiyuuToEndUser.emoped || state.businessFlow.fiyuuToEndUser.battery) && (
            <text
              x={(positions.fiyuu.x + positions.endUser.x) / 2 + nodeWidth / 2}
              y={(positions.fiyuu.y + positions.endUser.y) / 2 + nodeHeight / 2 - 10}
              textAnchor="middle"
              className="fill-gray-600 text-xs font-medium"
            >
              {state.businessFlow.fiyuuToEndUser.emoped && state.businessFlow.fiyuuToEndUser.battery 
                ? "E-moped + Batarya" 
                : state.businessFlow.fiyuuToEndUser.emoped 
                ? "E-moped" 
                : "Batarya"}
            </text>
          )}
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-center space-x-8">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-0.5 bg-orange-500" style={{ strokeDasharray: "5,5" }}></div>
          <span className="text-xs text-gray-600">Bağlantı / Danışmanlık</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-0.5 bg-orange-600"></div>
          <span className="text-xs text-gray-600">Satın Alma / Akış</span>
        </div>
      </div>
    </div>
  );
};

export default BusinessFlowDiagram;